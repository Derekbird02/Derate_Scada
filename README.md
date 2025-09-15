def run(base_df, channels_df, events_df):
    print("Running automation for trip_event_status_message 267...")

    # Signals to analyze
    signals = ["ts", "Offset_North", "Offset_South", "Offset_West"]
    available_signals = [s for s in signals if s in channels_df.columns]

    if not available_signals:
        print("No matching signals found in channels file.")
        return

    # Filter by sample_rate_sec and trip_offset_sec
    if "sample_rate_sec" in channels_df.columns and "trip_offset_sec" in channels_df.columns:
        df_filtered = channels_df[
            (channels_df["sample_rate_sec"] == 0.01) &
            (channels_df["trip_offset_sec"].between(-30, 30))
        ][available_signals].copy()
    else:
        print("Required columns not found in channels file.")
        return

    print("Preview of filtered data:")
    print(df_filtered.head(10))

    # TODO: Add deeper analysis here
