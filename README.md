=IF(ISNUMBER(B2), 
    TEXT(B2, "yyyy-mm-dd hh:mm:ss"), 
    TEXT(DATEVALUE(TRIM(LEFT(B2, FIND(",", B2) - 1))) + TIMEVALUE(TRIM(MID(B2, FIND(",", B2) + 1, LEN(B2)))), "yyyy-mm-dd hh:mm:ss")
)