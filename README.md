private (string? sequence, string? note)? getFrequencySequenceDataAIO(string control, string model, string emCode)
{
    var platform = GetNewPlatformAIO(model, control);
    if (platform == null) return null;

    var platformEntry = GetPlatformFreqAIO(emCode, platform);
    if (platformEntry == null) return null;

    return (
        platformEntry.Value<string?>("sequence"),
        platformEntry.Value<string?>("note")
    );
}
