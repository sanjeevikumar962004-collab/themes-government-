const fs = require('fs');
const path = require('path');

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'error.html');

console.log("Processing files for global button override: ", htmlFiles);

let matchCount = 0;

// Since user wants "any buttons in whole website" to navigate to 404 page,
// we can inject a small script into the <head> or right before </body> of every page
// that overrides all button, input[type=submit], input[type=button] clicks to go to error.html.
// BUT we should avoid overriding the password eye icon toggle or navigation elements if possible.
// Wait, user explicitly asked: "the contact pages some section is missing and when we touch any buttons in whole website it should navigate to 404 page"
// Let's inject a script that targets `.button, .btn, button, input[type="submit"], input[type="button"], a[class*="button"]`.
// We already re-wrote hrefs for `a` tags, but JS override is safer for form submits and `<button>` tags.

const injectScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button:not(.toggle-password):not(.w-nav-button), input[type="submit"], input[type="button"]');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'error.html';
        });
    });
});
</script>
</body>`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');

    // Only inject if not already injected
    if (!content.includes('button:not(.toggle-password)')) {
        content = content.replace('</body>', injectScript);
        fs.writeFileSync(path.join(dir, file), content);
        matchCount++;
        console.log(`Injected script into ${file}`);
    }
});

console.log(`Total files updated with script: ${matchCount}`);
