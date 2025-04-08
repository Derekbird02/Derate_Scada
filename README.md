; Define 17 unique names
names := ["Wind Fault", "Grid Loss", "Overtemp", "Undervoltage", "Overvoltage", "Pitch Error", "Yaw Error", "Vibration", "Communication Lost", 
          "Sensor Failure", "Emergency Stop", "Converter Fault", "Gearbox Alarm", "Tower Vibration", "Blade Fault", "Cooling System", "Hydraulic Fault"]

Gui, Add, GroupBox, x8 y24 w750 h150, Active Events

; GroupBox dimensions and padding
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
    row := Floor((A_Index - 1) / idealCols)
    col := Mod((A_Index - 1), idealCols)
    x := innerX + (col * cbWidth)
    y := innerY + (row * cbHeight)
    Gui, Add, Checkbox, x%x% y%y% w%cbWidth% h%cbHeight%, %name%
}

