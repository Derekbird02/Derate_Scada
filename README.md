using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Npgsql;

namespace DOC.Data
{
    public class DOCData
    {
        private Dictionary<string, object> _jsonData;
        private readonly string _filePath = "C:\\Apps\\data.json";

        public DOCData()
        {
            LoadJson(); // Optional: eager load
        }

        private void LoadJson()
        {
            if (!File.Exists(_filePath))
            {
                _jsonData = null;
                return;
            }

            string jsonContent = File.ReadAllText(_filePath);
            _jsonData = JsonConvert.DeserializeObject<Dictionary<string, object>>(jsonContent);
        }

        private string getDefaultControllerCodes(string controllerType)
        {
            // Your implementation here
            return "default-code"; // Placeholder
        }

        public string getEvent(string controllerType, string model, string strfunctionParameters, NpgsqlConnection cnn)
        {
            string strResult = string.Empty;

            if (_jsonData == null)
                LoadJson();

            if (_jsonData == null ||
                controllerType.Equals("Test1", StringComparison.OrdinalIgnoreCase) ||
                controllerType.Equals("Test2", StringComparison.OrdinalIgnoreCase))
            {
                return getDefaultControllerCodes(controllerType);
            }

            try
            {
                if (_jsonData.TryGetValue("Re", out var referenceObj) &&
                    _jsonData.TryGetValue("Ev", out var eventsObj) &&
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

            return strResult;
        }
    }
}
