private string getNonResetEventsNew(string controllerType, string platform, string strfunctionParameters, NpgsqlConnection cnn)
{
    string filePath = "C:\\ROC\\Apps\\ROC.Trigger\\platform_data.json";

    string strResult = string.Empty;

    if (!File.Exists(filePath))
    {
        strResult = getDefaultControllerCodes(controllerType);
    }
    else
    {
        try
        {
            if (controllerType.Equals("Argos", StringComparison.OrdinalIgnoreCase) ||
                controllerType.Equals("Windaccess", StringComparison.OrdinalIgnoreCase))
            {
                strResult = getDefaultControllerCodes(controllerType);
            }
            else
            {
                string jsonContent = File.ReadAllText(filePath);
                var eventDictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonContent);

                if (eventDictionary != null &&
                    eventDictionary.TryGetValue("Reference", out var referenceObj) && referenceObj != null &&
                    eventDictionary.TryGetValue("Events", out var eventsObj) && eventsObj != null)
                {
                    var referenceData = JsonConvert.DeserializeObject<Dictionary<string, string>>(referenceObj.ToString() ?? "");
                    var eventsData = JsonConvert.DeserializeObject<Dictionary<string, string>>(eventsObj.ToString() ?? "");

                    if (referenceData != null && eventsData != null)
                    {
                        string key = $"{platform}|{controllerType}";

                        if (referenceData.TryGetValue(key, out string? newplat) && !string.IsNullOrEmpty(newplat) &&
                            eventsData.TryGetValue(newplat, out string? emcodes) && !string.IsNullOrEmpty(emcodes))
                        {
                            strResult = emcodes;
                        }
                        else
                        {
                            //No Model Match
                            strResult = getDefaultControllerCodes(controllerType);
                        }
                    }
                    else
                    {
                        strResult = getDefaultControllerCodes(controllerType);
                    }
                }
                else
                {
                    strResult = getDefaultControllerCodes(controllerType);
                }
            }
        }
        catch (Exception ex)
        {
            strResult = getDefaultControllerCodes(controllerType);
        }
    }

    if (strfunctionParameters.Contains("SAFETY", StringComparison.OrdinalIgnoreCase))
    {
        if ((controllerType == "Mark VIe") || (controllerType == "Bachmann"))
            strResult = string.IsNullOrEmpty(strResult) ? "4,155,156,185,186,187,188,189,191,306,519,351,451" : $"{strResult},4,155,156,185,186,187,188,189,191,306,519,351,451";
    }

    return strResult;
}

private string getDefaultControllerCodes(string controllertype)
{
    return controllertype.Equals("Mark VIe", StringComparison.OrdinalIgnoreCase) ? "1010,118,1250,1251,1252,1253,1505,1511,1512,1518,1520,1954,1955,1956,1971,211,235,270,335,336,426,461,5702,5704,59,643,644,645,646,86,911,999,35,108" :
           controllertype.Equals("Bachmann", StringComparison.OrdinalIgnoreCase) ? "118,211,235,270,335,336,401,426,461,561,59,86,35,108" :
           controllertype.Equals("WindAccess", StringComparison.OrdinalIgnoreCase) ? "38,39,40,41,42,43,46,182,189,192,193,194,195,197,198,202,220,221,222,359,598,691,716,733,734,735,747,1748,1774,1960,2404,2848" :
           controllertype.Equals("Argos", StringComparison.OrdinalIgnoreCase) ? "1,24,44,46,73,75,86,148,232,234,455,471,472,473,498,502,592,613,614,615,738" :
           "Error";
}
