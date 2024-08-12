=IF(
    ISNUMBER(B2), 
    TEXT(B2, "yyyy-mm-dd hh:mm:ss"), 
    TEXT(
        DATE(
            IF(VALUE(MID(B2,7,2)) < 30, 2000 + VALUE(MID(B2,7,2)), 1900 + VALUE(MID(B2,7,2))), 
            LEFT(B2,2), 
            MID(B2,4,2)
        ) + TIMEVALUE(TRIM(MID(B2, FIND(",", B2) + 1, LEN(B2)))), 
    "yyyy-mm-dd hh:mm:ss")
)