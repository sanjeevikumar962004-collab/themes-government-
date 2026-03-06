const fs = require('fs');

let html = fs.readFileSync('index2.html', 'utf8');

// Remove the inherited Webflow style block that hides elements using visibility:hidden
// This block was inherited from index.html's header and causes many text elements to be invisible
html = html.replace(/<style>\s*html\.w-mod-js:not\(\.w-mod-ix3\)\s*:is\([\s\S]*?visibility:\s*hidden\s*!important;\s*\}\s*<\/style>/g, '');

fs.writeFileSync('index2.html', html, 'utf8');
console.log('Removed visibility:hidden style block from index2.html');
