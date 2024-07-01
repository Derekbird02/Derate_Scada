def format_line(line):
    values = line.strip().split('\t')
    if len(values) == 6:
        formatted = '{sitename: "' + values[0] + '", siteid:"' + values[1] + '", assetid:"' + values[2] + '", feedernumber: "' + values[3] + '", feedername:"' + values[4] + '", unitnumber:"' + values[5] + '"},'
        return formatted
    else:
        raise ValueError("Each line must contain exactly 6 tab-separated values")

def read_and_format_file(input_filename, output_filename):
    with open(input_filename, 'r') as infile, open(output_filename, 'w') as outfile:
        for line in infile:
            formatted_line = format_line(line)
            outfile.write(formatted_line + '\n')

if __name__ == "__main__":
    input_filename = "input.txt"  # Replace with your input file name
    output_filename = "output.txt"  # Replace with your desired output file name
    read_and_format_file(input_filename, output_filename)
    print(f"Formatted data has been written to {output_filename}")
