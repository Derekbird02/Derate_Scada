=IF(
    ISNUMBER(B2), 
    TEXT(B2, "yyyy-mm-dd hh:mm:ss"),
    TEXT(DATEVALUE(LEFT(B2,10)) + TIMEVALUE(MID(B2,12,8)), "yyyy-mm-dd hh:mm:ss")
)