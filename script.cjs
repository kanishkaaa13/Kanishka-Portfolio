const fs = require('fs');

try {
  let html2 = fs.readFileSync('attached_assets/index_(2)_1772472721863.html', 'utf8');
  let html1 = fs.readFileSync('attached_assets/index_1772472721866.html', 'utf8');

  // Extract base64 image from html1
  let imgMatch = html1.match(/<img[^>]*src="(data:image\/[^"]+)"/);
  let base64Src = imgMatch ? imgMatch[1] : 'YOUR_PHOTO_URL_HERE';

  // CSS changes
  html2 = html2.replace(
    '#home{display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:100px 6% 60px;gap:60px;background:var(--ink);}',
    '#home{display:flex;align-items:center;justify-content:center;padding:100px 6% 60px;background:var(--ink);position:relative;overflow:hidden;}\n#star-canvas{position:absolute;inset:0;z-index:1;pointer-events:none;}'
  );

  // Remove hero-visual from home
  html2 = html2.replace(/<div class="hero-visual[\s\S]*?<\/section>/, '</section>');

  // Add star-canvas
  html2 = html2.replace('<section id="home">', '<section id="home">\n  <canvas id="star-canvas"></canvas>');

  // Center hero text
  html2 = html2.replace('<div class="hero-text reveal">', '<div class="hero-text reveal" style="display:flex;flex-direction:column;align-items:center;text-align:center;max-width:800px;margin:0 auto;z-index:2;">');
  html2 = html2.replace('<div class="hero-badges">', '<div class="hero-badges" style="justify-content:center;">');
  html2 = html2.replace('<div class="hero-cta">', '<div class="hero-cta" style="justify-content:center;">');
  html2 = html2.replace('<p class="hero-desc">', '<p class="hero-desc" style="max-width: 600px;">');

  // Remove any base tags
  html2 = html2.replace(/<base[^>]*>/ig, '');

  // Remove any artifact specific links
  html2 = html2.replace(/href="[^"]*claude[^"]*"/ig, 'href="#"');

  // Read canvas script
  let scriptMatch = html1.match(/\(function\(\)\s*\{\s*var canvas = document\.getElementById\('star-canvas'\);[\s\S]*?\}\)\(\);/);
  if (scriptMatch) {
    html2 = html2.replace('</script>', scriptMatch[0] + '\n</script>');
  }

  // Replace photo src
  html2 = html2.replace('YOUR_PHOTO_URL_HERE', base64Src);
  
  fs.writeFileSync('client/index.html', html2);
  console.log('Successfully updated client/index.html');
} catch (e) {
  console.error(e);
}
