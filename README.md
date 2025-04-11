Gui, Add, GroupBox, x380 y184 w378 h171 cBlack, Reason

; Radio buttons
Gui, Add, Radio, x390 y204 w160 vReason1 gClearRadios, Option 1
Gui, Add, Radio, x390 y234 w160 vReason2 gClearRadios, Option 2
Gui, Add, Radio, x390 y264 w160 vReason3 gClearRadios, Option 3

Gui, Add, Radio, x570 y204 w160 vReason4 gClearRadios, Option 4
Gui, Add, Radio, x570 y234 w160 vReason5 gClearRadios, Option 5
Gui, Add, Radio, x570 y264 w160 vReason6 gClearRadios, Option 6

; Edit box with g label to trigger on change
Gui, Add, Edit, x390 y294 w358 h50 vReasonText gCheckText

Gui, Show,, Reason Form
return

CheckText:
GuiControlGet, ReasonText
if (ReasonText != "") {
    ; Uncheck all radios by setting them to 0
    GuiControl,, Reason1, 0
    GuiControl,, Reason2, 0
    GuiControl,, Reason3, 0
    GuiControl,, Reason4, 0
    GuiControl,, Reason5, 0
    GuiControl,, Reason6, 0
}
return

ClearRadios:
; Optional: Clear Edit box if a radio is selected
GuiControl,, ReasonText,
return

GuiClose:
ExitApp
