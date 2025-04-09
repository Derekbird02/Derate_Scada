; Initialize the array of names
names := ["63", "64", "65"]

; Initialize the outer linkMap
linkMap := {}

; Initialize each name in linkMap as an empty object
for _, name in names {
    linkMap[name] := {}
}

; Assign values to specific name + platform combinations
linkMap["63"]["2.0-2.4-107/116"] := ""
linkMap["63"]["2.5-2.8-116/127"] := ""
linkMap["63"]["Sierra"] := "Test1"
linkMap["63"]["Cypress"] := ""

linkMap["64"]["Sierra"] := "Test2"
linkMap["64"]["Cypress"] := "Test3"

linkMap["65"]["2.0-2.4-107/116"] := "LinkA"
linkMap["65"]["2.5-2.8-116/127"] := "LinkB"

; Example: how to retrieve a value
selectedName := "63"
selectedPlatform := "Sierra"

if (linkMap.HasKey(selectedName) && linkMap[selectedName].HasKey(selectedPlatform)) {
    link := linkMap[selectedName][selectedPlatform]
    MsgBox, Link for %selectedName% and platform %selectedPlatform% is: %link%
} else {
    MsgBox, No link found for %selectedName% and platform %selectedPlatform%
}
