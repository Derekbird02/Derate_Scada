from parquet_file import ParquetFile

class TripFile(ParquetFile):
    def filter_by_trip_offset(self, column: str, min_val: int, max_val: int):
        """
        Filter rows by trip_offset column (trip_offset_sec or trip_offset_num).
        Example: filter_by_trip_offset("trip_offset_sec", -100, 100)
        """
        if column not in ["trip_offset_sec", "trip_offset_num"]:
            raise ValueError("Column must be 'trip_offset_sec' or 'trip_offset_num'")

        return self.df[self.df[column].between(min_val, max_val)]
