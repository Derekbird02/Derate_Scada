private (string? oneDay, string? oneWeek)? getFrequencyData(string control, string model, string emCode)
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

    string? oneDay = platformEntry.Value<string?>("sequence");
    string? oneWeek = platformEntry.Value<string?>("note");

    return (oneDay, oneWeek);
}
