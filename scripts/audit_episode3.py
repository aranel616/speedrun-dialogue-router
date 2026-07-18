"""
Audit episode3.ts against the wiki wikitext source.
Prints the full mandatory dialogue flow (scene by scene) so we can spot
missing nodes and identify choice points.

Source: the Fandom "Episode 3: Chaos Theory - Script" page, saved as raw
MediaWiki wikitext (fetched via the REST v1 page endpoint, which bypasses the
Cloudflare challenge that blocks the rendered HTML). Update WIKI below to point
at your saved file.

What it strips:
  - Optional conversation blocks: a '<u>Optional Conversation with X</u>' header
    starts a skipped region that ends at the next <u>...</u> header or the next
    ===/==== section heading.
  - 'Optional: ...' italic stage directions.
  - Wiki template/file cruft ({{Tab}}, {{Scaleimage}}, [[File:...]], etc.).

What it keeps:
  - Section headings (=== X === / ==== X ====) as scene markers.
  - Non-optional <u>...</u> sub-conversation headers.
  - All spoken dialogue ('''Name:''' text) in order.
  - Stage directions, prefixed '(stage)' — kept because 'Max rewinds ...' lines
    mark where the rewind mechanic needs sequential bridge nodes.
  - tabber blocks rendered as [CHOICE] / [OPTION <label>] so player choice points
    (and flag-conditional variants) are visible.
"""
import re

WIKI = "/home/sarah/Episode 3_ Chaos Theory - Script _ Life is Strange Wiki _ Fandom.wikitext"

with open(WIKI, "r", encoding="utf-8") as f:
    raw = f.read()

# --- Normalize the two tabber encodings into one ---------------------------
# Nested choices use the {{#tag:tabber|  ...  {{!}}-{{!}}  ... }} parser
# function form; flatten it to the plain <tabber> ... |-| ... </tabber> form.
raw = raw.replace("{{#tag:tabber|", "<tabber>")
raw = raw.replace("{{!}}-{{!}}", "|-|")
# The matching close of a {{#tag:tabber| is a bare }} — turn a }} that is not
# part of another template into a tabber close. In this page the only bare }}
# left after the replacements above close tabber tags.
raw = re.sub(r"\}\}", "</tabber>", raw)

lines = raw.split("\n")

# --- Inline markup cleaners -------------------------------------------------
def clean_inline(s):
    s = re.sub(r'<h5[^>]*>.*?</h5>', '', s)      # hidden tab labels
    s = s.replace('<blockquote>', '').replace('</blockquote>', '')
    s = s.replace("&nbsp;", " ").replace("&amp;", "&")
    s = s.replace("&#39;", "'").replace("&quot;", '"')
    s = re.sub(r"\[\[[^\]|]*\|([^\]]*)\]\]", r"\1", s)  # [[link|text]] -> text
    s = re.sub(r"\[\[([^\]]*)\]\]", r"\1", s)            # [[text]] -> text
    s = re.sub(r"'''''(.+?)'''''", r"\1", s)            # bold-italic
    return s.strip()

def tab_label(s):
    # A tab option header looks like:  Label=<h5 ...>Label</h5>...
    m = re.match(r'\s*(.+?)=<h5', s)
    return m.group(1).strip() if m else None

out = []
skip_optional = False   # inside an Optional Conversation block
choice_depth = 0
started = False         # suppress template cruft before the first heading

HEADING = re.compile(r'^\s*(={3,})\s*(.*?)\s*\1\s*$')
# <u> header after stripping all bold ('' / ''') markers from the line
UHEADER = re.compile(r"^<u>(.*?)</u>$")
SPEAKER = re.compile(r"^\s*'''(.+?):'''\s*(.*)$")
STAGE = re.compile(r"^\s*''(.+?)''\s*$")

for raw_line in lines:
    line = raw_line.rstrip()
    if not line.strip():
        continue

    # Section heading -> ends any optional-skip region. In ep3, some conversation
    # headers (optional and mandatory) are promoted to ==== headings, so strip any
    # <u> markup and, if the heading itself is an Optional Conversation, treat it
    # as the start of a skipped block rather than a scene reset.
    hm = HEADING.match(line)
    if hm:
        started = True
        title = clean_inline(hm.group(2).replace("'''", "")).replace("<u>", "").replace("</u>", "").strip()
        if re.search(r'optional', title, re.I):
            skip_optional = True
            continue
        skip_optional = False
        out.append("")
        out.append("=" * 3 + " " + title + " " + "=" * 3)
        continue

    if not started:
        continue

    # <u> sub-conversation header (bold markers may sit inside or outside <u>)
    stripped = line.strip().replace("'''", "").replace("''", "").strip()
    um = UHEADER.match(stripped)
    if um:
        title = um.group(1).strip()
        if re.search(r'optional', title, re.I):
            skip_optional = True
            continue
        skip_optional = False
        out.append("-- " + title + " --")
        continue

    if skip_optional:
        continue

    # Optional stage direction
    sm = STAGE.match(line)
    if sm and re.match(r'\s*Optional\b', sm.group(1)):
        continue

    # Tabber (choice) open/close and option markers -------------------------
    work = line
    if '<tabber>' in work:
        # may contain the first option inline: <tabber>Label=<h5...>...
        n_open = work.count('<tabber>')
        for _ in range(n_open):
            choice_depth += 1
            out.append(("  " * choice_depth) + "[CHOICE]")
        work = work.replace('<tabber>', '')
        lbl = tab_label(work)
        if lbl is not None:
            out.append(("  " * choice_depth) + "[OPTION] " + lbl)
            work = re.sub(r'^\s*.+?=<h5[^>]*>.*?</h5>', '', work)
    if work.strip().startswith('|-|') or '|-|' in work:
        parts = work.split('|-|')
        # first part belongs to current option; rest start new options
        head, *rest = parts
        head = clean_inline(head)
        if head:
            out.append(("  " * max(choice_depth, 1)) + clean_inline(head))
        for r in rest:
            lbl = tab_label(r)
            if lbl is not None:
                out.append(("  " * max(choice_depth, 1)) + "[OPTION] " + lbl)
                r = re.sub(r'^\s*.+?=<h5[^>]*>.*?</h5>', '', r)
            r = clean_inline(r)
            if r:
                out.append(("  " * max(choice_depth, 1)) + r)
        work = ''
    if '</tabber>' in work:
        n_close = work.count('</tabber>')
        work = work.replace('</tabber>', '')
        for _ in range(n_close):
            if choice_depth > 0:
                out.append(("  " * choice_depth) + "[/CHOICE]")
                choice_depth -= 1
    if not work.strip():
        continue

    # Speaker line
    spm = SPEAKER.match(work)
    if spm:
        name = spm.group(1).strip()
        text = clean_inline(spm.group(2))
        indent = "  " * choice_depth if choice_depth else ""
        out.append(indent + name + ": " + text)
        continue

    # Remaining stage direction (kept, marked)
    sm2 = STAGE.match(work)
    if sm2:
        indent = "  " * choice_depth if choice_depth else ""
        out.append(indent + "(stage) " + clean_inline(sm2.group(1)))
        continue

    # Anything else: emit cleaned, unless it's leftover template noise
    cleaned = clean_inline(work)
    if cleaned and not cleaned.startswith("{{") and not cleaned.startswith("[[File:"):
        indent = "  " * choice_depth if choice_depth else ""
        out.append(indent + cleaned)

print("\n".join(out))
