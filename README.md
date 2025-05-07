private bool checkFreqnecy(string model, string controller, string emCode, int dayFreq, int weekFreq)
{
    if (_jsonData == null) return false;

    if (!_jsonData.TryGetValue("Reference", out var referenceObj)) return false;
    if (!(referenceObj is JObject reference)) return false;

    string key = $"{model}|{controller}";
    string platform = reference[key]?.ToString();
    if (string.IsNullOrEmpty(platform)) return false;

    if (!_jsonData.TryGetValue("Frequency", out var freqObj)) return false;
    if (!(freqObj is JObject frequency)) return false;

    var emEntry = frequency[emCode] as JObject;
    if (emEntry == null) return false;

    var platformEntry = emEntry[platform] as JObject;
    if (platformEntry == null) return false;

    int oneDay = platformEntry.Value<int?>("one_day") ?? int.MaxValue;
    int oneWeek = platformEntry.Value<int?>("one_week") ?? int.MaxValue;

    return dayFreq >= oneDay || weekFreq >= oneWeek;
}
