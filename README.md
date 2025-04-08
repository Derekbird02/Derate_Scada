; Dimensions and padding
groupX := 8
groupY := 24
groupW := 750
groupH := 150
padding := 8

; Inner area of the groupbox
innerX := groupX + padding
innerY := groupY + 20        ; Account for groupbox label height
innerW := groupW - 2 * padding
innerH := groupH - 28        ; Subtract label and padding

totalCheckboxes := 17
idealCols := Ceil(Sqrt(totalCheckboxes))     ; Start with square layout
idealRows := Ceil(totalCheckboxes / idealCols)

cbWidth := Floor(innerW / idealCols)
cbHeight := Floor(innerH / idealRows)

Loop, %totalCheckboxes%
{
    row := Floor((A_Index - 1) / idealCols)
    col := Mod((A_Index - 1), idealCols)
    x := innerX + (col * cbWidth)
    y := innerY + (row * cbHeight)
    Gui, Add, Checkbox, x%x% y%y% w%cbWidth% h%cbHeight%, Checkbox %A_Index%
}
