"""
Audit episode1.ts against the wiki HTML.
Prints the full mandatory dialogue flow so we can spot missing nodes.
"""
import re

WIKI = '/home/sarah/Episode 1_ Chrysalis - Script _ Life is Strange Wiki _ Fandom.html'

with open(WIKI, 'r', encoding='utf-8') as f:
    content = f.read()

pos = content.find('mw-parser-output')
article = content[pos:]
text = re.sub(r'<[^>]+>', '\n', article)
text = re.sub(r'&nbsp;', ' ', text)
text = re.sub(r'&amp;', '&', text)
text = re.sub(r'&#39;', "'", text)
text = re.sub(r'&quot;', '"', text)
text = re.sub(r'\n{3,}', '\n\n', text)
lines = [l.strip() for l in text.splitlines() if l.strip()]
output = '\n'.join(lines)

# Story runs from Jefferson's lecture to end of lighthouse ("Destiny?")
start = output.find('Alfred Hitchcock famously called film')
end = output.find('Destiny?') + len('Destiny?')
story_text = output[start:end]
story_lines = story_text.split('\n')

# Skip optional sections entirely
in_optional = False
for line in story_lines:
    # Wiki structural noise
    if line in ('[', ']', '[ ]', '-'):
        continue

    # Optional section start — skip until next non-optional header
    if re.match(r'^Optional ', line):
        in_optional = True
        continue

    # Section headers — always re-enable mandatory mode
    is_section = (
        re.match(r'^Conversation with ', line) or
        re.match(r"^Chloe's ", line) or
        re.match(r'^Jefferson', line) and "'s Lecture" in line or
        line in ('Corridor', 'Blackwell', "Chloe's Car", "Chloe's House", 'Lighthouse')
    )
    if is_section:
        in_optional = False
        print(f'\n=== {line} ===')
        continue

    if not in_optional and line:
        print(line)
