const fs = require('fs');
const path = require('path');

const dir = __dirname;
const mainFile = 'index.html';
const targetFiles = ['index2.html', 'about.html', 'services.html', 'contact.html', 'blog.html', 'dashboard.html'];

let mainContent = fs.readFileSync(path.join(dir, mainFile), 'utf8');

// Regex to capture the entire navbar element
// We know it starts with <div ... class="[something] navbarr w-nav"...>
// and ends with the first </section>, <main, or <header after it.

const navRegex = /<div[^>]*class="[^"]*navbarr w-nav[\s\S]*?<\/nav>[\s\S]*?<div class="menu-button w-nav-button">[\s\S]*?<\/div>\s*<\/div>\s*<a[^>]*class="second-button nav w-inline-block"[\s\S]*?<\/a>\s*<\/div>\s*<\/div>\s*<\/div>/i;

let match = mainContent.match(navRegex);
if (!match) {
    console.error("Could not find robust navbar regex match in index.html");
    process.exit(1);
}

let mainHeader = match[0];
console.log("Found main header. Length: " + mainHeader.length);

// Also fix the href for the "login" button in the template header itself just in case it's pointing to error.html or ./login.html
mainHeader = mainHeader.replace(/href="[^"]*error\.html"/gi, 'href="login.html"');
mainHeader = mainHeader.replace(/href="\.\/login\.html"/gi, 'href="login.html"');

fs.writeFileSync(path.join(dir, 'index.html'), mainContent.replace(navRegex, mainHeader));
console.log("Updated index.html self-reference.");

targetFiles.forEach(f => {
    let content = fs.readFileSync(path.join(dir, f), 'utf8');

    // We construct a regex to match whatever navbar is in the file
    // Some files might have `class="navbarr w-nav"` at the end, some at the start.
    const fileNavRegex = /<div[^>]*class="[^"]*navbarr w-nav[\s\S]*?<\/nav>[\s\S]*?<div class="menu-button w-nav-button">[\s\S]*?<\/div>\s*<\/div>\s*(?:<a[^>]*class="second-button nav w-inline-block"[\s\S]*?<\/a>)?\s*<\/div>\s*<\/div>\s*<\/div>/i;

    if (fileNavRegex.test(content)) {
        let newContent = content.replace(fileNavRegex, mainHeader);
        // Special case for index2.html? "make all the headers same" implies they will be identically the SAME.
        // We will just write it.
        fs.writeFileSync(path.join(dir, f), newContent);
        console.log("Replaced header in " + f);
    } else {
        console.error("Could not match header regex in " + f);
    }
});
