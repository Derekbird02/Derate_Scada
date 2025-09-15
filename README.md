# Inside actual_vibration_trip_block
# Ensure trip_offset_sec is present
if "trip_offset_sec" not in df.columns:
    print("trip_offset_sec missing from block DataFrame. Cannot run block.")
    return

# Now safe to filter
df_block = df[df["trip_offset_sec"].between(-10, 10)].copy()
