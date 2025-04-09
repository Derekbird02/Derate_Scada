BuildLinks:
Gui, Submit, NoHide
selectedPlatform := Trim(PlatformChoice)
output := "DEBUG INFO:`n"
output .= "Selected platform: [" selectedPlatform "]`n"

Loop % names.Length() {
    idx := A_Index
    name := Trim(names[idx])
    cbVar := "cb" . idx
    GuiControlGet, isChecked,, %cbVar%
    output .= "Checking event: " name " | Checked: " isChecked "`n"

    if (isChecked) {
        if (linkMap.HasKey(name)) {
            if (linkMap[name].HasKey(selectedPlatform)) {
                link := linkMap[name][selectedPlatform]
                output .= "Found link for [" name "][" selectedPlatform "]: " link "`n"
                if (link != "") {
                    output .= "[" . name . "] -> " . link . "`n"
                } else {
                    output .= "[" . name . "] has an empty link for platform [" selectedPlatform "]`n"
                }
            } else {
                output .= "Platform [" selectedPlatform "] not found in linkMap for name [" name "]`n"
            }
        } else {
            output .= "Name [" name "] not found in linkMap.`n"
        }
    }
}

GuiControl,, ResultBox, %output%
return
