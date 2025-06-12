public class Frame
{
    public string model { get; set; }
    public string type { get; set; }
    public string code { get; set; }
}

public class SequenceExecutorNote
{
    public string sequence { get; set; }
    public string one_day { get; set; }
    public string one_week { get; set; }
}

public class YourClass
{
    private JObject _jsonData;

    private void loadJson()
    {
        string jsonText = File.ReadAllText("path_to_your_json.json");
        _jsonData = JObject.Parse(jsonText);
    }

    public SequenceExecutorNote getNotes(Frame a)
    {
        if (_jsonData == null)
        {
            loadJson();
        }

        if (_jsonData == null)
        {
            return null; // ABORT
        }

        string key = $"{a.model}|{a.type}";
        var platform = _jsonData["Ref"]?[key]?.ToString();

        if (string.IsNullOrEmpty(platform))
        {
            return null;
        }

        var fre = _jsonData["Fre"]?[a.code]?[platform];
        if (fre == null)
        {
            return null;
        }

        return new SequenceExecutorNote
        {
            sequence = fre["sequence"]?.ToString(),
            one_day = fre["one_day"]?.ToString(),
            one_week = fre["one_week"]?.ToString()
        };
    }
}
