def actual_vibration_trip_block(df):
    """
    Block 1: Actual Vibration Trip
    - Focus on trip_offset_sec between -10 and 10
    - Checks:
        1. 'mainframe' generally increasing
        2. 'lateral' goes from 0 to 1 at some point
    """
    print("\n--- Running Block: Actual Vibration Trip ---")

    # Filter for block window
    df_block = df[df["trip_offset_sec"].between(-10, 10)].copy()

    if df_block.empty:
        print("No data in block window (-10 to 10 sec). Skipping block.")
        return

    # Get starting and ending values for mainframe
    mainframe_start = df_block["mainframe"].iloc[0]
    mainframe_end = df_block["mainframe"].iloc[-1]

    # Check if 'mainframe' is generally increasing
    mainframe_increasing = mainframe_end > mainframe_start

    # Check if 'lateral' goes from 0 to >=1 at some point
    lateral_start_zero = df_block["lateral"].iloc[0] == 0
    lateral_transition = df_block["lateral"].max() >= 1

    # Print results
    print(f"Mainframe start: {mainframe_start}, end: {mainframe_end}")
    print(f"Mainframe increasing: {mainframe_increasing}")
    print(f"Lateral 0 -> 1 transition: {lateral_start_zero and lateral_transition}")

    if mainframe_increasing and lateral_start_zero and lateral_transition:
        print("Block Result: Likely Actual Vibration Trip detected ✅")
    else:
        print("Block Result: Conditions not met ❌")
