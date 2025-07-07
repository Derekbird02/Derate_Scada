private string? GetFormattedFunctionParameters(string control, string model, string emCode)
{
    var data = getFrequencySequenceDataAIO(control, model, emCode);
    if (data == null) return null;

    var (sequence, note) = data.Value;

    // Escape values and construct the functionParameters-style JSON fragment
    var sequencePart = sequence != null ? $"sequence:\\\"{sequence}\\\"" : null;
    var notePart = note != null ? $"noteInput:\\\"{note}\\\"" : null;

    // Combine parts (with comma if both are present)
    string combined = string.Join(", ", new[] { sequencePart, notePart }.Where(x => x != null));

    return combined;
}
