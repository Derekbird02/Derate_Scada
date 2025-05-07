private bool checkFreqnecy(string model, string controller, string emCode, int dayFreq, int weekFreq)
{
    string json = @"{
        ""Reference"": {
            ""ModelX|Ctrl01"": ""PlatformA"",
            ""ModelY|Ctrl02"": ""PlatformB""
        },
        ""Frequency"": {
            ""EM001"": {
                ""PlatformA"": {
                    ""one_day"": 10,
                    ""one_week"": 50
                }
            }
        }
    }";

    var jsonData = Newtonsoft.Json.Linq.JObject.Parse(json);

    string key = $"{model}|{controller}";
    string platform = jsonData["Reference"]?[key]?.ToString();

    if (platform == null) return false;

    var freqData = jsonData["Frequency"]?[emCode]?[platform];
    if (freqData == null) return false;

    int oneDay = freqData.Value<int>("one_day");
    int oneWeek = freqData.Value<int>("one_week");

    return dayFreq >= oneDay || weekFreq >= oneWeek;
}
