from parquet_file import ParquetFile

class ChannelLogs(ParquetFile):
    def filter_quality_data(self):
        rows = (self.df["sample_rate_sec"] == 0.01) & (self.df["trip_offset_sec"] < 0.0)
        df = self.df[rows]
        return df.sort_values(by="trip_offset_num", ascending=True)
