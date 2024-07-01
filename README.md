def format_line(line):
    values = line.strip().split('\t')
    if len(values) == 6:
        formatted = '{sitename: "' + values[0] + '", siteid:"' + values[1] + '", assetid:"' + values[2] + '", feedernumber: "' + values[3] + '", feedername:"' + values[4] + '", unitnumber:"' + values[5] + '"},'
        return formatted
    else:
        raise ValueError("Each line must contain exactly 6 tab-separated values")

def read_and_format_file(filename):
    formatted_lines = []
    with open(filename, 'r') as file:
        for line in file:
            formatted_line = format_line(line)
            formatted_lines.append(formatted_line)
    return formatted_lines

if __name__ == "__main__":
    input_filename = "input.txt"  # Replace with your input file name
    formatted_data = read_and_format_file(input_filename)
    for entry in formatted_data:
        print(entry)
