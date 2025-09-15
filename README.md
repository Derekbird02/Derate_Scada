def run(base_df, channels_df, events_df):
    """
    Main entry point for trip_event_status_message 267 automation.
    """
    print("Running automation for trip_event_status_message 267...")

    # Signals to use
    signals = ["ts", "Offset_North", "Offset_South", "Offset_West", "mainframe", "lateral"]
    available_signals = [s for s in signals if s in channels_df.columns]

    if not available_signals:
        print("No matching signals found in channels file.")
        return

    # Ensure required columns exist
    required_columns = ["sample_rate_sec", "trip_offset_sec"] + available_signals
    for col in required_columns:
        if col not in channels_df.columns:
            print(f"Required column '{col}' missing in channels file.")
            return

    # Filter for sample_rate_sec = 0.01 and trip_offset_sec between -30 and 30
    df_filtered = channels_df[
        (channels_df["sample_rate_sec"] == 0.01) &
        (channels_df["trip_offset_sec"].between(-30, 30))
    ][required_columns].copy()

    print("Preview of filtered data:")
    print(df_filtered.head(10))

    # --- Run Blocks ---
    actual_vibration_trip_block(df_filtered)


# ---------------- Block Definitions ----------------
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

    # Check if 'mainframe' is generally increasing
    mainframe_increasing = df_block["mainframe"].iloc[-1] > df_block["mainframe"].iloc[0]

    # Check if 'lateral' goes from 0 to >=1 at some point
    lateral_start_zero = df_block["lateral"].iloc[0] == 0
    lateral_transition = df_block["lateral"].max() >= 1

    print(f"Mainframe increasing: {mainframe_increasing}")
    print(f"Lateral 0 -> 1 transition: {lateral_start_zero and lateral_transition}")

    if mainframe_increasing and lateral_start_zero and lateral_transition:
        print("Block Result: Likely Actual Vibration Trip detected ✅")
    else:
        print("Block Result: Conditions not met ❌")
