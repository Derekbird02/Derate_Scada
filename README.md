Gui, Add, GroupBox, x380 y184 w378 h171 cBlack, Reason

; Radio buttons (all using gHandleInput)
Gui, Add, Radio, x390 y204 w160 vReason1 gHandleInput, Option 1
Gui, Add, Radio, x390 y234 w160 vReason2 gHandleInput, Option 2
Gui, Add, Radio, x390 y264 w160 vReason3 gHandleInput, Option 3
Gui, Add, Radio, x570 y204 w160 vReason4 gHandleInput, Option 4
Gui, Add, Radio, x570 y234 w160 vReason5 gHandleInput, Option 5
Gui, Add, Radio, x570 y264 w160 vReason6 gHandleInput, Option 6

; Edit box also using same handler
Gui, Add, Edit, x390 y294 w358 h50 vReasonText gHandleInput

Gui, Show,, Reason Form
return

HandleInput:
GuiControlGet, ReasonText
; Check if this was triggered by the Edit box
If (A_GuiControl = "ReasonText") {
    if (ReasonText != "") {
        ; Clear all radios
        GuiControl,, Reason1, 0
        GuiControl,, Reason2, 0
        GuiControl,, Reason3, 0
        GuiControl,, Reason4, 0
        GuiControl,, Reason5, 0
        GuiControl,, Reason6, 0
    }
} else {
    ; If a radio was clicked, clear the textbox
    GuiControl,, ReasonText,
}
return

GuiClose:
ExitApp
