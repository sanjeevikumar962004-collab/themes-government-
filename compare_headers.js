const fs = require('fs');
const path = require('path');

const dir = __dirname;
const mainFile = 'index.html';
const targetFiles = ['index2.html', 'about.html', 'services.html', 'contact.html', 'blog.html', 'dashboard.html'];

// Helper to extract header HTML
function getHeader(content) {
    const startIdx = content.indexOf('<div data-animation="default" class="navbarr w-nav"');
    if (startIdx === -1) return null;

    // Webflow navbars generally end before the hero section or main content
    // we can search for the closing tag of the navbar wrapper.
    // It's usually followed by <section... or <main...

    // A more robust way: use regex to grab the div block
    // We can just grab from start to </nav> ... </div> </div> </div> etc.
    // Better to match until </nav> ... </a> </div> </div> </div>
    // Let's use a simpler marker: it usually ends right before <section/main/header
    const endMarkers = ['<section', '<main', '<header', '<div class="hero'];
    let endIdx = -1;
    for (let marker of endMarkers) {
        let idx = content.indexOf(marker, startIdx);
        if (idx !== -1 && (endIdx === -1 || idx < endIdx)) {
            endIdx = idx;
        }
    }

    if (endIdx === -1) return null;
    return content.substring(startIdx, endIdx).trim();
}

const mainContent = fs.readFileSync(path.join(dir, mainFile), 'utf8');
const mainHeader = getHeader(mainContent);

if (!mainHeader) {
    console.error("Could not find main header in " + mainFile);
    process.exit(1);
}

fs.writeFileSync(path.join(dir, 'temp_header.html'), mainHeader);
console.log("Extracted main header.");

let diffCount = 0;
targetFiles.forEach(f => {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');
    let header = getHeader(content);

    if (header) {
        if (header.length !== mainHeader.length || header !== mainHeader) {
            console.log(f + " header differs.");
            diffCount++;
            // To be safe, we don't automatically replace yet until we verify.
            // content = content.replace(header, mainHeader + '\n    ');
            // fs.writeFileSync(path.join(dir, f), content);
            // console.log("Updated " + f);
        } else {
            console.log(f + " header is identical.");
        }
    } else {
        console.log("Could not find header in " + f);
    }
});

console.log("Total differences: " + diffCount);
