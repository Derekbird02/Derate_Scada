=IF(ISNUMBER(B2), 
    TEXT(B2, "yyyy-mm-dd hh:mm:ss"), 
    TEXT(DATE(MID(B2,7,4), LEFT(B2,2), MID(B2,4,2)) + TIME(MID(B2,12,2), MID(B2,15,2), MID(B2,18,2)), "yyyy-mm-dd hh:mm:ss")
)