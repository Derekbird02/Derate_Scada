import pandas as pd

class ParquetFile:
    def __init__(self, file_path: str):
        """Generic parquet reader."""
        self.df = pd.read_parquet(file_path)

    def preview(self, n: int = 20):
        """Preview the first n rows."""
        return self.df.head(n)

    def filter_equals(self, column: str, value):
        """Filter rows where column == value."""
        return self.df[self.df[column] == value]

    def filter_between(self, column: str, min_val, max_val):
        """Filter rows where column is between min_val and max_val."""
        return self.df[self.df[column].between(min_val, max_val)]



from parquet_file import ParquetFile

class TripFile(ParquetFile):
    def filter_by_trip_offset(self, min_val: int, max_val: int):
        """Special filter for trip_offset_sec or trip_offset_num."""
        return self.df[
            (self.df["trip_offset_sec"].between(min_val, max_val)) |
            (self.df["trip_offset_num"].between(min_val, max_val))
        ]

from events import TripFile
from parquet_file import ParquetFile

# Load generic parquet file
generic = ParquetFile("other_data.parquet")
print("Generic file preview:")
print(generic.preview(10))

# Load events file
trip = TripFile("events.snappy.parquet")
print("\nEvents file preview:")
print(trip.preview(20))

# Use generic filter
print("\nFilter generic file where status_message == 'OK':")
print(generic.filter_equals("status_message", "OK"))

# Use specialized filter
print("\nFilter trip file by trip offset between -100 and 100:")
print(trip.filter_by_trip_offset(-100, 100))




