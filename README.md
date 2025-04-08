Gui, Add, GroupBox, x8 y24 w750 h150, Active Events

; Define dimensions
startX := 16        ; Starting X inside groupbox
startY := 40        ; Starting Y inside groupbox (below the title)
boxWidth := 750 - 16 - 8 ; Width inside groupbox (subtract padding)
numCheckboxes := 17
rows := 2           ; Number of rows you want
cols := Ceil(numCheckboxes / rows)
cbWidth := Floor(boxWidth / cols)
cbHeight := 24

; Loop to add checkboxes
Loop, %numCheckboxes%
{
    row := Floor((A_Index - 1) / cols)
    col := Mod((A_Index - 1), cols)
    x := startX + (col * cbWidth)
    y := startY + (row * cbHeight)
    Gui, Add, Checkbox, x%x% y%y% w%cbWidth%, Checkbox %A_Index%
}

Gui, Show, , Example GUI
Return

GuiClose:
ExitApp
