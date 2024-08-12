=IF(
    ISNUMBER(A1), 
    TEXT(A1, "yyyy-mm-dd hh:mm:ss"),
    TEXT(DATE("20"&MID(A1,7,2),MID(A1,1,2),MID(A1,4,2)) + TIME(MID(A1,10,2),MID(A1,13,2),MID(A1,16,2)), "yyyy-mm-dd hh:mm:ss")
)