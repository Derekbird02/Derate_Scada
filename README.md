#SingleInstance Force

; Define names and platforms
names := ["63", "64", "65"]
platforms := ["2.0-2.4-107/116", "2.5-2.8-116/127", "Sierra", "Cypress"]

; Initialize linkMap properly
linkMap := {}
for _, name in names {
    linkMap[name] := {}
    for _, platform in platforms {
        linkMap[name][platform] := ""  ; Default to blank
    }
}

; Set specific links
linkMap["63"]["Sierra"] := "Test1"
linkMap["64"]["Sierra"] := "Test2"
linkMap["64"]["Cypress"] := "Test3"
linkMap["65"]["2.5-2.8-116/127"] := "Test4"

; Build the GUI
Gui, Add, Text,, Select Platform:
Gui, Add, DropDownList, vPlatformChoice w250, % platforms[1] "|" platforms[2] "|" platforms[3] "|" platforms[4]

Gui, Add, Text,, Select Names:
yPos := 90
Loop % names.Length() {
    Gui, Add, Checkbox, vcb%A_Index% x20 y%yPos%, % names[A_Index]
    yPos += 30
}

Gui, Add, Button, x20 y250 w120 h30 gBuildLinks, Generate
Gui, Show,, Link Generator
Return

BuildLinks:
Gui, Submit, NoHide
selectedPlatform := PlatformChoice
output := ""

; Debug print
MsgBox, You selected platform: %selectedPlatform%

Loop % names.Length() {
    idx := A_Index
    name := names[idx]
    cbVar := "cb" . idx
    GuiControlGet, isChecked,, %cbVar%
    if (isChecked) {
        ; Debug: Show current lookup
        MsgBox, Checking: %name% + %selectedPlatform%
        link := linkMap[name][selectedPlatform]
        MsgBox, Link for [%name%][%selectedPlatform%] is: %link%
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
