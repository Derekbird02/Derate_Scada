; Define checkbox names
names := ["Wind Fault", "Grid Loss", "Overtemp", "Undervoltage", "Overvoltage", "Pitch Error", "Yaw Error", "Vibration", "Communication Lost", 
          "Sensor Failure", "Emergency Stop", "Converter Fault", "Gearbox Alarm", "Tower Vibration", "Blade Fault", "Cooling System", "Hydraulic Fault"]

; Define platforms
platforms := ["Mark", "Banik", "Loral"]

; Hardcoded link map: linkMap[name][platform] := "URL"
linkMap := {}
for _, name in names {
    linkMap[name] := {}
}

; Example hardcoded URLs (replace these with your actual links)
linkMap["Wind Fault"]["Mark"] := "https://mark.com/wind-fault"
linkMap["Wind Fault"]["Banik"] := "https://banik.net/wf"
linkMap["Wind Fault"]["Loral"] := "https://loral.org/wind"

linkMap["Grid Loss"]["Mark"] := "https://mark.com/grid-loss"
linkMap["Grid Loss"]["Banik"] := "https://banik.net/grid"
linkMap["Grid Loss"]["Loral"] := "https://loral.org/grid-loss"

; Add hardcoded links for other names...
; For demo, fallback default:
for _, name in names {
    for _, platform in platforms {
        if (!linkMap[name][platform]) {
            ; fallback or warning URL
            linkMap[name][platform] := "https://example.com/" . platform . "/" . StrReplace(name, " ", "_")
        }
    }
}

; GUI Setup
Gui, Add, GroupBox, x8 y24 w750 h150, Active Events

groupX := 8, groupY := 24, groupW := 750, groupH := 150, padding := 8
innerX := groupX + padding, innerY := groupY + 20
innerW := groupW - 2 * padding, innerH := groupH - 28

totalCheckboxes := names.Length()
idealCols := Ceil(Sqrt(totalCheckboxes))
idealRows := Ceil(totalCheckboxes / idealCols)
cbWidth := Floor(innerW / idealCols)
cbHeight := Floor(innerH / idealRows)

Loop, %totalCheckboxes%
{
    name := names[A_Index]
    varName := "cb" . A_Index
    row := Floor((A_Index - 1) / idealCols)
    col := Mod((A_Index - 1), idealCols)
    x := innerX + (col * cbWidth)
    y := innerY + (row * cbHeight)
    Gui, Add, Checkbox, x%x% y%y% w%cbWidth% h%cbHeight% v%varName%, %name%
}

Gui, Add, DropDownList, x20 y205 w315 vPlatformChoice, Mark|Banik|Loral
Gui, Add, Button, x350 y205 w100 gBuildLinks, Build Links
Gui, Add, Edit, x20 y240 w730 h100 vLinkOutput ReadOnly

Gui, Show, , Platform Event Links
Return

BuildLinks:
    Gui, Submit, NoHide
    selectedPlatform := PlatformChoice
    output := ""

    Loop, %names.Length()%
    {
        name := names[A_Index]
        varName := "cb" . A_Index
        GuiControlGet, isChecked,, %varName%
        if (isChecked) {
            link := linkMap[name][selectedPlatform]
            ; Only include if both name and link are not empty
            if (link != "" && name != "") {
                output .= "[" . name . "] Link: " . link . "`n"
            }
        }
    }

    ; Handle case when no checkbox is checked
    if (output = "") {
        output := "No events selected."
    }

    GuiControl,, LinkOutput, %output%
Return

GuiClose:
ExitApp
