const fs = require('fs');

let html = fs.readFileSync('client/index.html', 'utf8');

// The photo URL logic didn't replace globally, let's fix that.
let html1 = fs.readFileSync('attached_assets/index_1772472721866.html', 'utf8');
let imgMatch = html1.match(/<img[^>]*src="(data:image\/[^"]+)"/);
let base64Src = imgMatch ? imgMatch[1] : '';

if (base64Src) {
    html = html.replace(/YOUR_PHOTO_URL_HERE/g, base64Src);
}

// Remove the hero-visual from the first page entirely if it's still there
html = html.replace(/<div class="hero-visual[^>]*>[\s\S]*?<\/div>\s*<\/section>/, '</section>');
html = html.replace(/<div class="hero-visual[\s\S]*?<\/div>\s*<\/section>/, '</section>');
// Wait, hero-visual has multiple nested divs. Let's just use regex or DOM parser if possible, but earlier script did:
// html2 = html2.replace(/<div class="hero-visual[\s\S]*?<\/section>/, '</section>');
// Let's verify if hero-visual is present in client/index.html

fs.writeFileSync('client/index.html', html);
