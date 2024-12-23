import re
import glob

def px_to_rem(match):
    value = int(match.group(1))
    return f"{value / 16}rem"

file_paths = glob.glob('**/style.module.css', recursive=True)

for file_path in file_paths:
    with open(file_path, 'r') as f:
        content = f.read()

    modified_content = re.sub(r'(\d+)px', px_to_rem, content)

    with open(file_path, 'w') as f:
        f.write(modified_content)