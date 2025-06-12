public SequenceExecutorNote getParametersNoteAIO(Automation a)
{
    if (_jsonData == null){
        loadJson();
    }

    if (_jsonData == null){
        //ABORT?
    }

    if (_jsonData.TryGetValue("Reference", out var referenceObj) &&
        _jsonData.TryGetValue("Frequency", out var frequencyObj) &&
        referenceObj != null && frequencyObj != null)
    {

        var referenceData = JsonConvert.DeserializeObject<Dictionary<string, string>>(referenceObj.ToString() ?? "");
        var frequencyData = JsonConvert.DeserializeObject<Dictionary<string, string>>(frequencyObj.ToString() ?? "");

        if (referenceData != null && frequencyData != null){
            string key = $"{a.turbine.model}|{a.turbine.controllerType}";//a.tcase.responsibleAlarm

        }
    }
    else
    {
        //ABORT?
    }

        SequenceExecutorNote obj = new SequenceExecutorNote();
    obj.parameters = new ParametersNote(a.assetid, a.caseid);

    //obj.sequenceName = values.sequence;

    //if (a.escalationmessage.Count > 0 && a.automation.triggertype == "ALLCASES")
    //    obj.parameters.noteInput = GetOptimal(a.escalationmessage, values.noteInput);
    //else
    //    obj.parameters.noteInput = values.noteInput;

    //if (a.note != null)
    //    if (a.note.Length > 0)
    //        obj.parameters.noteInput = obj.parameters.noteInput + ". Automation Tracking notes: " + a.note;

    return obj;
}
