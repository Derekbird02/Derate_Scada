from datetime import datetime, timedelta

def get_15_minute_block_range():
    now = datetime.now()

    # Floor to the nearest 15-minute mark
    minute_block = (now.minute // 15) * 15
    floored = now.replace(minute=minute_block, second=0, microsecond=0)

    end_date = floored
    start_date = floored - timedelta(minutes=15)

    # Convert to timestamps in milliseconds
    start_timestamp = round(start_date.timestamp() * 1000)
    end_timestamp = round(end_date.timestamp() * 1000)

    return start_timestamp, end_timestamp

# Example usage
start_ts, end_ts = get_15_minute_block_range()
print(f"Start: {start_ts}, End: {end_ts}")