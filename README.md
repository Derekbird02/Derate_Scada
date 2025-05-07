private bool checkFreqnecy(string model, string controller, string emCode, int dayFreq, int weekFreq)
{
    if (_jsonData == null)
        return false;

    string key = $"{model}|{controller}";
    string platform = _jsonData["Reference"]?[key]?.ToString();

    if (string.IsNullOrEmpty(platform))
        return false;

    var freq = _jsonData["Frequency"]?[emCode]?[platform];
    if (freq == null)
        return false;

    int oneDay = freq.Value<int?>("one_day") ?? int.MaxValue;
    int oneWeek = freq.Value<int?>("one_week") ?? int.MaxValue;

    return dayFreq >= oneDay || weekFreq >= oneWeek;
}
