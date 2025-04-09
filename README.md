array := {}

array["63"] := {}

array["63"]["2.0-2.4-107/116"] := ""
array["63"]["2.5-2.8-116/127"] := ""
array["63"]["Sierra"] := "Hyperlink"
array["63"]["Cypress"] := ""


tester := "63"
tested := "Sierra"
MsgBox % "Test 1 " . array["63"]["Sierra"] 
MsgBox % "Test 2 " . array[tester][tested] 


