import re

# Read the two files
with open('attached_assets/index_(2)_1772472721863.html', 'r', encoding='utf-8') as f:
    html2 = f.read()

with open('attached_assets/index_1772472721866.html', 'r', encoding='utf-8') as f:
    html1 = f.read()

# 1. Extract canvas animation script from html1
canvas_script_match = re.search(r'(\(function\(\)\s*\{\s*var canvas = document\.getElementById\(\'star-canvas\'\);.*?\}\)[\s\S]*?\(\);\s*\n\}\)\(\);)', html1, re.MULTILINE)
if canvas_script_match:
    canvas_script = canvas_script_match.group(1)
else:
    # Fallback to a standard starfield script if regex fails, but let's try to extract it accurately
    canvas_script_match = re.search(r'// ── CANVAS ANIMATION ──[\s\S]*?(?=(</script>))', html1, re.MULTILINE)
    if canvas_script_match:
        canvas_script = canvas_script_match.group(0)
    else:
        # Just grab the last IIFE
        match = re.findall(r'\(function\(\)\s*\{[\s\S]*?\}\)\(\);', html1)
        if match:
            canvas_script = match[-1]
        else:
            canvas_script = ""

# 2. Modify html2 CSS for #home
html2 = re.sub(
    r'#home\{display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:100px 6% 60px;gap:60px;background:var\(--ink\);\}',
    r'#home{display:flex;align-items:center;justify-content:center;padding:100px 6% 60px;background:var(--ink);text-align:center;}\n#star-canvas{position:absolute;inset:0;z-index:1;pointer-events:none;}',
    html2
)

# 3. Add canvas to #home and remove hero-visual
# Find <section id="home">
home_start = html2.find('<section id="home">')
if home_start != -1:
    home_end = html2.find('</section>', home_start)
    home_content = html2[home_start:home_end]
    
    # Remove hero-visual
    visual_start = home_content.find('<div class="hero-visual')
    if visual_start != -1:
        # Simple nested div removal
        depth = 0
        visual_end = -1
        for i in range(visual_start, len(home_content)):
            if home_content[i:i+4] == '<div':
                depth += 1
            elif home_content[i:i+5] == '</div':
                depth -= 1
                if depth == 0:
                    visual_end = i + 6
                    break
        if visual_end != -1:
            home_content = home_content[:visual_start] + home_content[visual_end:]
    
    # Add canvas
    home_content = home_content.replace('<section id="home">', '<section id="home">\n  <canvas id="star-canvas"></canvas>')
    
    html2 = html2[:home_start] + home_content + html2[home_end:]

# 4. Center the hero text since it's full width now
html2 = html2.replace('<div class="hero-text reveal">', '<div class="hero-text reveal" style="display:flex;flex-direction:column;align-items:center;text-align:center;max-width:800px;margin:0 auto;z-index:2;">')
html2 = html2.replace('max-width:460px;', 'max-width:600px;') # for hero-desc
html2 = html2.replace('justify-content:flex-start;', 'justify-content:center;')
html2 = html2.replace('class="hero-badges"', 'class="hero-badges" style="justify-content:center;"')
html2 = html2.replace('class="hero-cta"', 'class="hero-cta" style="justify-content:center;"')

# 5. Inject canvas script
if canvas_script:
    html2 = html2.replace('</script>\n</body>', '\n' + canvas_script + '\n</script>\n</body>')

# 6. Ensure no target="_blank" is causing issues with overlay. There are no "claude" references.
# The user mentioned clicking on anything opens a claude chat, which is bizarre. Maybe there's a base tag?
html2 = re.sub(r'<base[^>]*>', '', html2)

with open('client/index.html', 'w', encoding='utf-8') as f:
    f.write(html2)

print("Done")
