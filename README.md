def run(base_df, channels_df, events_df):
    print("Running automation for trip_event_status_message 267...")

    # Signals of interest
    signals = ["ts", "Offset_North", "Offset_South", "Offset_West", "mainframe", "lateral"]
    available_signals = [s for s in signals if s in channels_df.columns]

    if not available_signals:
        print("No matching signals found in channels file.")
        return

    # Filter rows for analysis: sample_rate_sec=0.01 and trip_offset_sec between -30 and 30
    if "sample_rate_sec" in channels_df.columns and "trip_offset_sec" in channels_df.columns:
        df_filtered = channels_df[
            (channels_df["sample_rate_sec"] == 0.01) &
            (channels_df["trip_offset_sec"].between(-30, 30))
        ][available_signals + ["trip_offset_sec"]].copy()
    else:
        print("Required columns not found in channels file.")
        return

    print("Preview of filtered data:")
    print(df_filtered.head(10))

    # --- Block 1: Actual Vibration Trip ---
    actual_vibration_trip_block(df_filtered)


# ---------------- Block Definitions ----------------
def actual_vibration_trip_block(df):
    print("\n--- Running Block: Actual Vibration Trip ---")

    # Focus only on trip_offset_sec between -10 and 10
    df_block = df[df["trip_offset_sec"].between(-10, 10)].copy()

    if "mainframe" not in df_block.columns or "lateral" not in df_block.columns:
        print("Required signals for this block are missing.")
        return

    # Check if 'mainframe' is generally increasing
    mainframe_increasing = df_block["mainframe"].iloc[-1] > df_block["mainframe"].iloc[0]

    # Check if 'lateral' goes from 0 to 1 at some point
    lateral_transition = ((df_block["lateral"].iloc[0] == 0) and (df_block["lateral"].max() >= 1))

    print(f"Mainframe increasing: {mainframe_increasing}")
    print(f"Lateral 0 -> 1 transition: {lateral_transition}")

    if mainframe_increasing and lateral_transition:
        print("Block Result: Likely Actual Vibration Trip detected ✅")
    else:
        print("Block Result: Conditions not met ❌")
