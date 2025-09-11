import argparse
import os
from events import TripFile

def main():
    parser = argparse.ArgumentParser(description="Process trip event logs")
    parser.add_argument("trip_folder", help="Trip folder name (e.g., Trip-1, Trip-2, ...)")
    args = parser.parse_args()

    # Build full file path
    base_dir = "TestTripFiles"
    file_path = os.path.join(base_dir, args.trip_folder, "events.snappy.parquet")

    # Load trip file
    events = TripFile(file_path)

    # Preview first 20 rows
    print("\nEvents file preview:")
    print(events.preview(20))

    # Example specialized filter
    print("\nFilter trip file by trip offset between -100 and 100:")
    filtered = events.filter_by_trip_offset(-100, 100)
    print(filtered)

if __name__ == "__main__":
    main()
