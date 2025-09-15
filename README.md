import sys
import os
import importlib
import pandas as pd

TRIPS_FOLDER = "TestTripFiles"
CHECKS_PACKAGE = "checks"

# --- Loader ---
def load_trip_files(trip_name: str):
    trip_path = os.path.join(TRIPS_FOLDER, trip_name)
    if not os.path.exists(trip_path):
        raise FileNotFoundError(f"Trip folder {trip_path} not found.")

    base = pd.read_parquet(os.path.join(trip_path, "base.snappy.parquet"))
    channels = pd.read_parquet(os.path.join(trip_path, "channels.snappy.parquet"))
    events = pd.read_parquet(os.path.join(trip_path, "events.snappy.parquet"))
    return base, channels, events

# --- Dispatcher ---
def run_trip_checks(base_df, channels_df, events_df):
    trip_status = str(base_df.iloc[0]["trip_event_status_message"])
    print(f"Trip Event Status: {trip_status}")

    module_name = f"{CHECKS_PACKAGE}.check_{trip_status}"
    try:
        check_module = importlib.import_module(module_name)
        check_module.run(base_df, channels_df, events_df)
    except ModuleNotFoundError:
        print(f"No automation implemented for status {trip_status}")

# --- Main ---
def main():
    if len(sys.argv) < 2:
        print("Usage: python main.py <TripFolderName>")
        sys.exit(1)

    trip_name = sys.argv[1]
    base_df, channels_df, events_df = load_trip_files(trip_name)
    run_trip_checks(base_df, channels_df, events_df)

if __name__ == "__main__":
    main()








def run(base_df, channels_df, events_df):
    print("Running automation for trip_event_status_message 267...")

    signals = ["ts", "Offset_North", "Offset_South", "Offset_West"]
    available_signals = [s for s in signals if s in channels_df.columns]

    if not available_signals:
        print("No matching signals found in channels file.")
        return

    df = channels_df[available_signals].copy()

    if "sample_rate_sec" in channels_df.columns:
        df = df[channels_df["sample_rate_sec"] == 0.01]

    print("Preview of filtered data:")
    print(df.head(10))

    # TODO: Add deeper analysis here
