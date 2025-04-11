Gui, Add, GroupBox, x380 y184 w378 h171 cBlack, Reason

; Left column checkboxes
Gui, Add, CheckBox, x390 y204 w160, Option 1
Gui, Add, CheckBox, x390 y234 w160, Option 2
Gui, Add, CheckBox, x390 y264 w160, Option 3

; Right column checkboxes
Gui, Add, CheckBox, x570 y204 w160, Option 4
Gui, Add, CheckBox, x570 y234 w160, Option 5
Gui, Add, CheckBox, x570 y264 w160, Option 6

; Textbox at the bottom
Gui, Add, Edit, x390 y294 w358 h50,

Gui, Show,, Reason Form
return

GuiClose:
ExitApp
