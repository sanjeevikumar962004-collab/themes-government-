const fs = require('fs');
const files = ['index.html', 'about.html', 'services.html', 'contact.html'];

files.forEach(file => {
    let html = fs.readFileSync(file, 'utf8');
    // Replace the Webflow CDN CSS link with a local link
    html = html.replace(
        /<link\s+href="https:\/\/cdn\.prod\.website-files\.com\/[^"]+\.css"\s+rel="stylesheet"\s+type="text\/css"[^>]*>/i,
        '<link href="style.css" rel="stylesheet" type="text/css" />'
    );
    fs.writeFileSync(file, html, 'utf8');
    console.log('Fixed CSS link in ' + file);
});
