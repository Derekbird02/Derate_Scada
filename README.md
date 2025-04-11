Gui, Add, GroupBox, x380 y184 w378 h171 cBlack, Reason

; Coordinates relative to GroupBox's origin
groupX := 390
groupY := 204

; Column 1 checkboxes
Gui, Add, CheckBox, x%groupX% y%groupY% w160, Option 1
Gui, Add, CheckBox, x%groupX% y%groupY%+30 w160, Option 2
Gui, Add, CheckBox, x%groupX% y%groupY%+60 w160, Option 3

; Column 2 checkboxes
Gui, Add, CheckBox, x%groupX%+180 y%groupY% w160, Option 4
Gui, Add, CheckBox, x%groupX%+180 y%groupY%+30 w160, Option 5
Gui, Add, CheckBox, x%groupX%+180 y%groupY%+60 w160, Option 6

; Textbox spanning the width near the bottom
Gui, Add, Edit, x%groupX% y%groupY%+100 w358 h50 vReasonInput,

Gui, Show,, Reason Form
return

GuiClose:
ExitApp
