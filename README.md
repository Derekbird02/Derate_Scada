public string getNonResetEventsNew(string controllerType, string model, string strfunctionParameters, NpgsqlConnection cnn)
{
    string strResult = string.Empty;

    if (_jsonData == null)
    {
        loadJson();
    }

    if (_jsonData == null ||
        controllerType.Equals("Argos", StringComparison.OrdinalIgnoreCase) ||
        controllerType.Equals("Windaccess", StringComparison.OrdinalIgnoreCase))
    {
        return getDefaultControllerCodes(controllerType);
    }

    try
    {
        if (_jsonData.TryGetValue("Reference", out var referenceObj) &&
            _jsonData.TryGetValue("Events", out var eventsObj) &&
            referenceObj != null && eventsObj != null)
        {
            var referenceData = JsonConvert.DeserializeObject<Dictionary<string, string>>(referenceObj.ToString() ?? "");
            var eventsData = JsonConvert.DeserializeObject<Dictionary<string, string>>(eventsObj.ToString() ?? "");

            if (referenceData != null && eventsData != null)
            {
                string key = $"{model}|{controllerType}";

                if (referenceData.TryGetValue(key, out string? newplat) &&
                    !string.IsNullOrEmpty(newplat) &&
                    eventsData.TryGetValue(newplat, out string? emcodes) &&
                    !string.IsNullOrEmpty(emcodes))
                {
                    var emcodeList = emcodes.Split(',').ToList();

                    if (_jsonData.TryGetValue("Ex", out var exceptionsObj) && exceptionsObj != null)
                    {
                        var exceptionsData = JsonConvert.DeserializeObject<Dictionary<string, string>>(exceptionsObj.ToString() ?? "");
                        if (exceptionsData != null && exceptionsData.TryGetValue(newplat, out string? exceptions) && !string.IsNullOrEmpty(exceptions))
                        {
                            var exceptionList = exceptions.Split(',');
                            emcodeList = emcodeList.Except(exceptionList).ToList();
                        }
                    }

                    strResult = string.Join(",", emcodeList);
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
        else
        {
            strResult = getDefaultControllerCodes(controllerType);
        }
    }
    catch (Exception)
    {
        strResult = getDefaultControllerCodes(controllerType);
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

private bool checkFrequencyAIO(string controllerType, string model, string emCode, int dayFreq, int weekFreq)
{
    // bool LogError(string errorReason, string assetid, string turbineName, string siteName, string errorCode, string desc, string note, int autoId){
    //    string strTempStep = string.Format("type:\"AWSMAIL\",email_subject: \"FREQUENCY AIO AUTOMATION ERROR\",\"email_to\":\"marc.freixa-segui@ge.com,derek.bird@ge.com\",\"email_priority\":\"HIGH\",\"email_bodytext\":\"{0}\"", errorReason) + string.Format(",email_assetid:\"{0}\",email_assetname:\"{1}\",email_sitename:\"{2}\",email_eventcode:\"{3}\",email_automation:\"{4}\",email_note:\"{5}\"", assetid, turbineName, siteName, errorCode, desc, note);
    //    InsertAutomationTaskAWS(autoId, "AWSMAIL", strTempStep, DateTime.UtcNow);
    //    return false;
    // }
    // return LogError("No Reference In JSON", a.assetid, a.turbine.name, a.site.name, a.automation.code, a.automation.description, a.note.Replace("\"", ""), a.automation.id);

    if (_jsonData == null)
    {
        loadJson();
    }

    if (_jsonData == null)
    {
        return false;
    }

    if (!_jsonData.TryGetValue("Reference", out var referenceObj))
    {
        return false;
    }

    if (!(referenceObj is JObject reference))
    {
        return false;
    }

    string key = $"{model}|{controllerType}";

    string platform = reference[key]?.ToString();

    if (string.IsNullOrEmpty(platform))
    {
        return false;
    }

    if (!_jsonData.TryGetValue("Frequency", out var freqObj))
    {
        return false;
    }

    if (!(freqObj is JObject frequency))
    {
        return false;
    }

    var emEntry = frequency[emCode] as JObject;
    if (emEntry == null)
    {
        return false;
    }

    var platformEntry = emEntry[platform] as JObject;
    if (platformEntry == null)
    {
        return false;
    }

    int oneDay = platformEntry.Value<int?>("one_day") ?? int.MaxValue;
    int oneWeek = platformEntry.Value<int?>("one_week") ?? int.MaxValue;

    return dayFreq >= oneDay || weekFreq >= oneWeek;
}

private bool checkFrequencyJsonExistsAIO(string controllerType, string model, string emCode)
{
    if (_jsonData == null)
    {
        loadJson();
    }

    if (_jsonData == null) return false;

    if (!_jsonData.TryGetValue("Reference", out var referenceObj) || referenceObj is not JObject reference)
        return false;

    string key = $"{model}|{controllerType}";
    string? platform = reference[key]?.ToString();
    if (string.IsNullOrEmpty(platform)) return false;

    if (!_jsonData.TryGetValue("Frequency", out var freqObj) || freqObj is not JObject frequency)
        return false;

    var emEntry = frequency[emCode] as JObject;
    if (emEntry == null) return false;

    var platformEntry = emEntry[platform] as JObject;
    if (platformEntry == null) return false;

    string? sequence = platformEntry.Value<string?>("sequence");
    return !string.IsNullOrEmpty(sequence);
}

private (string? sequence, string? note)? getFrequencySequenceDataAIO(string control, string model, string emCode)
{
    if (_jsonData == null)
    {
        loadJson();
    }

    if (_jsonData == null) return null;

    if (!_jsonData.TryGetValue("Reference", out var referenceObj)) return null;
    if (referenceObj is not JObject reference) return null;

    string key = $"{model}|{control}";
    string? platform = reference[key]?.ToString();
    if (string.IsNullOrEmpty(platform)) return null;

    if (!_jsonData.TryGetValue("Frequency", out var freqObj)) return null;
    if (freqObj is not JObject frequency) return null;

    var emEntry = frequency[emCode] as JObject;
    if (emEntry == null) return null;

    var platformEntry = emEntry[platform] as JObject;
    if (platformEntry == null) return null;

    string? sequence = platformEntry.Value<string?>("sequence");
    string? note = platformEntry.Value<string?>("note");

    return (sequence, note);
}
