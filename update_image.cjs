const fs = require('fs');

let html1 = fs.readFileSync('attached_assets/index_1772472721866.html', 'utf8');
let match = html1.match(/src="(data:image\/[^"]+)"/);

if (match) {
    let base64Image = match[1];
    let clientHtml = fs.readFileSync('client/index.html', 'utf8');
    
    // Replace YOUR_PHOTO_URL_HERE with the base64 image
    clientHtml = clientHtml.replace(/YOUR_PHOTO_URL_HERE/g, base64Image);
    
    fs.writeFileSync('client/index.html', clientHtml);
    console.log('Image successfully replaced!');
} else {
    console.log('Image not found in html1');
}
