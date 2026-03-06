const fs = require('fs');

let html = fs.readFileSync('index2.html', 'utf8');

// 1. Swap data-wf-page ID
// About page ID: 690b302fb7e4c77c0c63b812
// Current index2 ID: 6902145cf044c5c880745f40
html = html.replace('data-wf-page="6902145cf044c5c880745f40"', 'data-wf-page="690b302fb7e4c77c0c63b812"');

// 2. Swap Webflow JS source
// About page JS: webflow.c2d1edc2.5d9313e588ef7999.js
// Current index2 JS: webflow.edcf51fe.0fc04099017efaf1.js
html = html.replace('webflow.edcf51fe.0fc04099017efaf1.js', 'webflow.c2d1edc2.5d9313e588ef7999.js');

// 3. Remove the custom GSAP script if it exists to avoid conflicts
const scriptStartMarker = '// Achievement section scroll animations (GSAP)';
const scriptEndMarker = '});\n</script>';

const startIndex = html.indexOf(scriptStartMarker);
if (startIndex !== -1) {
    // Find the script tag containing this
    const scriptTagStart = html.lastIndexOf('<script>', startIndex);
    const scriptTagEnd = html.indexOf('</script>', startIndex) + '</script>'.length;

    if (scriptTagStart !== -1 && scriptTagEnd !== -1) {
        html = html.substring(0, scriptTagStart) + html.substring(scriptTagEnd);
        console.log('Removed custom GSAP script to prevent conflicts with Webflow engine.');
    }
}

fs.writeFileSync('index2.html', html, 'utf8');
console.log('Successfully updated index2.html with About page ID and JS to restore animations.');
