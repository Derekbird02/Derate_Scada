=IF(ISNUMBER(B2), 
    TEXT(B2, "yyyy-mm-dd hh:mm:ss"), 
    TEXT(
        DATE(
            IF(MID(B2,7,2) < 30, "20" & MID(B2,7,2), "19" & MID(B2,7,2)), 
            LEFT(B2,2), 
            MID(B2,4,2)
        ) + TIMEVALUE(TRIM(MID(B2, FIND(",", B2) + 1, LEN(B2)))), 
    "yyyy-mm-dd hh:mm:ss")
)