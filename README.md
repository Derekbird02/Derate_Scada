#SingleInstance Force

names := ["63", "64", "65"]
platforms := ["2.0-2.4-107/116", "2.5-2.8-116/127", "Sierra", "Cypress"]

linkMap := {}
for _, name in names {
    linkMap[name] := {}
    for _, platform in platforms {
        linkMap[name][platform] := ""  ; default all to blank
    }
}

; Set some links
linkMap["63"]["Sierra"] := "Test1"
linkMap["64"]["Sierra"] := "Test2"
linkMap["64"]["Cypress"] := "Test3"
linkMap["65"]["2.5-2.8-116/127"] := "Test4"

; GUI
Gui, Add, Text,, Platform:
Gui, Add, DropDownList, vPlatformChoice w300, 2.0-2.4-107/116|2.5-2.8-116/127|Sierra|Cypress

Gui, Add, Text,, Select Names:
y := 90
Loop % names.Length() {
    idx := A_Index
    Gui, Add, Checkbox, vcb%idx% x20 y%y%, % names[idx]
    y += 30
}

Gui, Add, Button, x20 y250 w120 h30 gBuildLinks, Generate
Gui, Show,, Link Test
Return

BuildLinks:
Gui, Submit, NoHide
selectedPlatform := PlatformChoice
MsgBox, Selected Platform: %selectedPlatform%

output := ""

Loop % names.Length() {
    idx := A_Index
    name := names[idx]
    cbVar := "cb" . idx
    GuiControlGet, isChecked,, %cbVar%
    if (isChecked) {
        link := linkMap[name][selectedPlatform]
        MsgBox, Checked %name% - Link: %link%
        if (link != "") {
            output .= "[" . name . "] -> " . link . "`n"
        }
    }
}

if (output = "")
    output := "No events selected or no links found for selected platform."

MsgBox, %output%
Return

GuiClose:
ExitApp
