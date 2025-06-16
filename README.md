private bool HasValidFrequencyEntry(string control, string model, string emCode)
{
    if (_jsonData == null)
    {
        loadJson();
    }

    if (_jsonData == null) return false;

    if (!_jsonData.TryGetValue("Reference", out var referenceObj) || referenceObj is not JObject reference)
        return false;

    string key = $"{model}|{control}";
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
