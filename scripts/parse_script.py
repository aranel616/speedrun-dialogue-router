import re

with open('/home/sarah/Episode 1_ Chrysalis - Script _ Life is Strange Wiki _ Fandom.html', 'r', encoding='utf-8') as f:
    content = f.read()

pos = content.find('mw-parser-output')
article = content[pos:]

# Strip all tags
text = re.sub(r'<[^>]+>', '\n', article)
text = re.sub(r'&nbsp;', ' ', text)
text = re.sub(r'&amp;', '&', text)
text = re.sub(r'&#39;', "'", text)
text = re.sub(r'&quot;', '"', text)
text = re.sub(r'\n{3,}', '\n\n', text)
lines = [l.strip() for l in text.splitlines() if l.strip()]
output = '\n'.join(lines)
print(output[:8000])
