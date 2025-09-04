for idx, row in enumerate(tuples):
    for col_idx, val in enumerate(row):
        if isinstance(val, (int, np.integer)) and not -2147483648 <= int(val) <= 2147483647:
            print(f"Row {idx}, Column {col_idx}, Value {val} is out of range")
            print("Row data:", row)
            break