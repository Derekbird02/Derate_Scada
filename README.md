for idx, row in enumerate(tuples):
    ieccode = row[<index_of_ieccode>]
    quality = row[<index_of_quality>]
    connected_val = row[<index_of_connectedstate_value>]

    for name, val in [("ieccode", ieccode), ("quality", quality), ("connectedstate_value", connected_val)]:
        if val is not None and (not isinstance(val, (int, np.integer)) or val > 9 or val < -9):
            print(f"Row {idx}: {name} has unexpected value {val}")