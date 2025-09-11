import pandas as pd

class TripFile:
    def __init__(self, file_path: str):
        """Initialize and load the parquet file."""
        self.df = pd.read_parquet(file_path)

    def preview(self, n: int = 20):
        """Preview the first n rows."""
        return self.df.head(n)

    def filter_by_trip_offset(self, min_val: int, max_val: int):
        """Filter rows where trip_offset_sec or trip_offset_num are between min and max."""
        return self.df[
            (self.df["trip_offset_sec"].between(min_val, max_val)) |
            (self.df["trip_offset_num"].between(min_val, max_val))
        ]

    def filter_by_event_class(self, event_class: str):
        """Filter rows for a specific event_class."""
        return self.df[self.df["event_class"] == event_class]

    def filter_by_event_name(self, event_name: str):
        """Filter rows for a specific event_name."""
        return self.df[self.df["event_name"] == event_name]
