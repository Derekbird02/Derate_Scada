import os
import re
from docx import Document

def extract_time_values(text):
    # Regular expressions to find patterns like 'X time...24 hour' and 'X time...7 day'
    pattern_24_hour = re.compile(r'(\d+)\s*time.*?24\s*hour', re.IGNORECASE)
    pattern_7_day = re.compile(r'(\d+)\s*time.*?7\s*day', re.IGNORECASE)

    # Search for patterns in the text
    match_24_hour = pattern_24_hour.search(text)
    match_7_day = pattern_7_day.search(text)

    # Extract numbers if patterns are found
    num_24_hour = int(match_24_hour.group(1)) if match_24_hour else None
    num_7_day = int(match_7_day.group(1)) if match_7_day else None

    return num_24_hour, num_7_day

def process_docx_files(directory):
    results = []

    # Traverse the directory and its subdirectories
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.docx'):
                file_path = os.path.join(root, file)
                try:
                    # Open the .docx file and extract text
                    doc = Document(file_path)
                    full_text = ' '.join([para.text for para in doc.paragraphs])

                    # Extract time values from the text
                    num_24_hour, num_7_day = extract_time_values(full_text)

                    # Store results
                    results.append((file, num_24_hour, num_7_day))
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

    # Output results
    for filename, num_24_hour, num_7_day in results:
        print(f"File: {filename}")
        print(f"  24-hour period number: {num_24_hour if num_24_hour is not None else 'Not found'}")
        print(f"  7-day period number: {num_7_day if num_7_day is not None else 'Not found'}")
        print()

# Specify the directory to start the search
directory_path = '/path/to/your/directory'
process_docx_files(directory_path)