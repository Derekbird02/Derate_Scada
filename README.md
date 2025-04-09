#SingleInstance Force

names := ["63", "64", "65"]
platforms := ["2.0-2.4-107/116", "2.5-2.8-116/127", "Sierra", "Cypress"]

; Initialize nested map
linkMap := {}
for _, name in names {
    linkMap[name] := {}
    for _, platform in platforms {
        linkMap[name][platform] := ""  ; Default all to blank
    }
}

; Assign some test values
linkMap["63"]["Sierra"] := "Test1"
linkMap["64"]["Sierra"] := "Test2"
linkMap["64"]["Cypress"] := "Test3"
linkMap["65"]["2.5-2.8-116/127"] := "Test4"

; GUI Setup
Gui, Add, Text,, Select Platform:
Gui, Add, DropDownList, vPlatformChoice w300, 2.0-2.4-107/116|2.5-2.8-116/127|Sierra|Cypress

Gui, Add, GroupBox, x8 y60 w380 h150, Select Names
xStart := 16
yStart := 80
cbW := 100
cbH := 20
cols := 3
Loop % names.Length() {
    idx := A_Index
    name := names[idx]
    row := Floor((idx - 1) / cols)
    col := Mod((idx - 1), cols)
    x := xStart + col * cbW
    y := yStart + row * cbH
    Gui, Add, Checkbox, x%x% y%y% vcb%idx%, %name%
}

Gui, Add, Button, x20 y250 w100 h30 gBuildLinks, Generate
Gui, Show,, Link Generator
Return

BuildLinks:
Gui, Submit, NoHide
output := ""
selectedPlatform := PlatformChoice

Loop % names.Length() {
    idx := A_Index
    name := names[idx]
    varName := "cb" . idx
    GuiControlGet, isChecked,, %varName%
    if (isChecked) {
        link := linkMap[name][selectedPlatform]
        if (link != "") {
            output .= "[" . name . "] Link: " . link . "`n"
        }
    }
}

if (output = "")
    output := "No events selected or no links found for selected platform."

MsgBox, 0, Links Found, %output%
Return

GuiClose:
ExitApp
