#SingleInstance, Force

names := ["63", "64", "65"]
platforms := ["Sierra", "Cypress", "2.0-2.4-107/116", "2.5-2.8-116/127"]

linkMap := {}

; Initialize linkMap with all platforms
for _, name in names {
    linkMap[name] := {}
    for _, platform in platforms {
        linkMap[name][platform] := ""  ; Default empty string
    }
}

; Set specific links
linkMap["63"]["Sierra"] := "Test1"
linkMap["64"]["Sierra"] := "Test2"
linkMap["64"]["Cypress"] := "Test3"
linkMap["65"]["2.5-2.8-116/127"] := "Test4"

Gui, Add, Text,, Select Events:
Loop % names.Length() {
    idx := A_Index
    Gui, Add, Checkbox, vcb%idx%, % "Event " names[idx]
}

platformOptions := ""
for _, p in platforms {
    platformOptions .= p "|"
}
StringTrimRight, platformOptions, platformOptions, 1

Gui, Add, Text,, Select Platform:
Gui, Add, DropDownList, vPlatformChoice w250, %platformOptions%

Gui, Add, Button, gBuildLinks, Build Links
Gui, Add, Edit, vResultBox w400 h150 ReadOnly

Gui, Show,, Link Builder
return

BuildLinks:
Gui, Submit, NoHide
selectedPlatform := Trim(PlatformChoice)
output := ""

Loop % names.Length() {
    idx := A_Index
    name := Trim(names[idx])
    cbVar := "cb" . idx
    GuiControlGet, isChecked,, %cbVar%
    if (isChecked) {
        link := linkMap[name][selectedPlatform]
        if (link != "") {
            output .= "[" . name . "] -> " . link . "`n"
        }
    }
}

if (output = "") {
    output := "No events selected or no links found for selected platform."
}
GuiControl,, ResultBox, %output%
return

GuiClose:
ExitApp
