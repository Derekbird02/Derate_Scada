
names := ["63", "1502", "1503", "1504", "1505", "1506", "1507", "1508/1509/1510", "1511", "1512", "1513/1514", "1515", "1516", "1517", "1518", "1519", "1520", "1521"]

platforms := ["2.0-2.4-107/116", "2.5-2.8-116/127", "Sierra", "Cypress"]

linkMap := {}
for _, name in names {
    linkMap[name] := {}
}

linkMap["63"]["2.0-2.4-107/116"] := ""
linkMap["63"]["2.5-2.8-116/127"] := ""
linkMap["63"]["Sierra"] := "Test1"
linkMap["63"]["Cypress"] := ""

linkMap["1502"]["2.0-2.4-107/116"] := ""
linkMap["1502"]["2.5-2.8-116/127"] := ""
linkMap["1502"]["Sierra"] := ""
linkMap["1502"]["Cypress"] := ""

linkMap["1503"]["2.0-2.4-107/116"] := ""
linkMap["1503"]["2.5-2.8-116/127"] := ""
linkMap["1503"]["Sierra"] := ""
linkMap["1503"]["Cypress"] := ""

linkMap["1504"]["2.0-2.4-107/116"] := ""
linkMap["1504"]["2.5-2.8-116/127"] := ""
linkMap["1504"]["Sierra"] := ""
linkMap["1504"]["Cypress"] := ""

linkMap["1505"]["2.0-2.4-107/116"] := ""
linkMap["1505"]["2.5-2.8-116/127"] := ""
linkMap["1505"]["Sierra"] := "Test2"
linkMap["1505"]["Cypress"] := ""

linkMap["1506"]["2.0-2.4-107/116"] := ""
linkMap["1506"]["2.5-2.8-116/127"] := ""
linkMap["1506"]["Sierra"] := ""
linkMap["1506"]["Cypress"] := ""

linkMap["1507"]["2.0-2.4-107/116"] := ""
linkMap["1507"]["2.5-2.8-116/127"] := ""
linkMap["1507"]["Sierra"] := ""
linkMap["1507"]["Cypress"] := ""

linkMap["1508/1509/1510"]["2.0-2.4-107/116"] := ""
linkMap["1508/1509/1510"]["2.5-2.8-116/127"] := ""
linkMap["1508/1509/1510"]["Sierra"] := ""
linkMap["1508/1509/1510"]["Cypress"] := ""

linkMap["1511"]["2.0-2.4-107/116"] := ""
linkMap["1511"]["2.5-2.8-116/127"] := ""
linkMap["1511"]["Sierra"] := ""
linkMap["1511"]["Cypress"] := ""

linkMap["1512"]["2.0-2.4-107/116"] := ""
linkMap["1512"]["2.5-2.8-116/127"] := ""
linkMap["1512"]["Sierra"] := ""
linkMap["1512"]["Cypress"] := ""

linkMap["1513/1514"]["2.0-2.4-107/116"] := ""
linkMap["1513/1514"]["2.5-2.8-116/127"] := ""
linkMap["1513/1514"]["Sierra"] := ""
linkMap["1513/1514"]["Cypress"] := ""

linkMap["1515"]["2.0-2.4-107/116"] := ""
linkMap["1515"]["2.5-2.8-116/127"] := ""
linkMap["1515"]["Sierra"] := "Test3"
linkMap["1515"]["Cypress"] := ""

linkMap["1516"]["2.0-2.4-107/116"] := ""
linkMap["1516"]["2.5-2.8-116/127"] := ""
linkMap["1516"]["Sierra"] := ""
linkMap["1516"]["Cypress"] := ""

linkMap["1517"]["2.0-2.4-107/116"] := ""
linkMap["1517"]["2.5-2.8-116/127"] := ""
linkMap["1517"]["Sierra"] := ""
linkMap["1517"]["Cypress"] := ""

linkMap["1518"]["2.0-2.4-107/116"] := ""
linkMap["1518"]["2.5-2.8-116/127"] := ""
linkMap["1518"]["Sierra"] := ""
linkMap["1518"]["Cypress"] := ""

linkMap["1519"]["2.0-2.4-107/116"] := ""
linkMap["1519"]["2.5-2.8-116/127"] := ""
linkMap["1519"]["Sierra"] := ""
linkMap["1519"]["Cypress"] := ""

linkMap["1520"]["2.0-2.4-107/116"] := ""
linkMap["1520"]["2.5-2.8-116/127"] := ""
linkMap["1520"]["Sierra"] := ""
linkMap["1520"]["Cypress"] := ""

linkMap["1521"]["2.0-2.4-107/116"] := ""
linkMap["1521"]["2.5-2.8-116/127"] := ""
linkMap["1521"]["Sierra"] := ""
linkMap["1521"]["Cypress"] := ""


Gui, Add, GroupBox, cBlack x8 y24 w750 h150, Active Events
groupX := 8
groupY := 24
groupW := 750
groupH := 150
padding := 8

; Inner dimensions
innerX := groupX + padding
innerY := groupY + 20
innerW := groupW - 2 * padding
innerH := groupH - 28

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

Gui, Add, DropDownList, x20 y205 w315 h100 vPlatformChoice, 2.0-2.4-107/116|2.5-2.8-116/127|Sierra|Cypress

Gui, Add, Button, x16 y480 w80 h49 -Theme gBuildLinks, Generate

BuildLinks:
    Gui, Submit, NoHide
    selectedPlatform := PlatformChoice
    output := ""

    Loop, %totalCheckboxes%
    {
        name := names[A_Index]
        varName := "cb" . A_Index
        GuiControlGet, isChecked,, %varName%
        if (varName) {
            link := linkMap[name][selectedPlatform]
  
            if (link != "" && name != "") {
                output .= "[" . name . "] Link: " . link . "`n"
            }
        }
    }

    ; Handle case when no checkbox is checked
    if (output = "") {
        output := "No events selected."
    }

    MsgBox, 0, Safety ,%output%
Return
