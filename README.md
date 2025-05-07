private string getNonResetEventsNew(string controllerType, string model, string strfunctionParameters, NpgsqlConnection cnn)
{
    string filePath = "C:\\Apps\\data.json";

    string strResult = string.Empty;

    if (!File.Exists(filePath))
    {
        strResult = getDefaultControllerCodes(controllerType);
    }
    else
    {
        try
        {
            if (controllerType.Equals("Test1", StringComparison.OrdinalIgnoreCase) ||
                controllerType.Equals("Test2", StringComparison.OrdinalIgnoreCase))
            {
                strResult = getDefaultControllerCodes(controllerType);
            }
            else
            {
                string jsonContent = File.ReadAllText(filePath);
                var eventDictionary = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonContent);

                if (eventDictionary != null &&
                    eventDictionary.TryGetValue("Re", out var referenceObj) && referenceObj != null &&
                    eventDictionary.TryGetValue("Ev", out var eventsObj) && eventsObj != null)
                {
                    var referenceData = JsonConvert.DeserializeObject<Dictionary<string, string>>(referenceObj.ToString() ?? "");
                    var eventsData = JsonConvert.DeserializeObject<Dictionary<string, string>>(eventsObj.ToString() ?? "");

                    if (referenceData != null && eventsData != null)
                    {
                        string key = $"{model}|{controllerType}";

                        if (referenceData.TryGetValue(key, out string? newplat) && !string.IsNullOrEmpty(newplat) &&
                            eventsData.TryGetValue(newplat, out string? emcodes) && !string.IsNullOrEmpty(emcodes))
                        {
                            var emcodeList = emcodes.Split(',').ToList();

                            if (eventDictionary.TryGetValue("Ex", out var exceptionsObj) && exceptionsObj != null)
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
        }
        catch (Exception ex)
        {
            strResult = getDefaultControllerCodes(controllerType);
        }
    }

    return strResult;
}
