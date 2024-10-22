# Read the first file and create a dictionary mapping numbers to names
number_name_map = {}

with open('file1.txt', 'r') as file1:
    for line in file1:
        number, name, severity = line.strip().split('@')
        number_name_map[number] = name

# Read the second file and find corresponding names
with open('file2.txt', 'r') as file2:
    for number in file2:
        number = number.strip()  # Remove any extra spaces or newline
        if number in number_name_map:
            print(f'{number}: {number_name_map[number]}')
        else:
            print(f'{number}: Not found in file1')