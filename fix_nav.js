const fs = require('fs');

const files = ['index.html', 'index2.html', 'about.html', 'services.html', 'contact.html', 'blog.html', 'dashboard.html'];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let html = fs.readFileSync(f, 'utf8');

        // Note: We need to strip out the problematic div
        // <div class="w-icon-dropdown-toggle" style="display:inline-block; font-family: 'Webflow Icons'; margin-left:5px;"></div>

        const brokenIconRegex = /<div class="w-icon-dropdown-toggle" style="display:inline-block; font-family: 'Webflow Icons'; margin-left:5px;"><\/div>\s*/g;

        if (brokenIconRegex.test(html)) {
            html = html.replace(brokenIconRegex, "");
            fs.writeFileSync(f, html, 'utf8');
            console.log('Successfully removed broken "i/f" icon from ' + f);
        } else {
            console.log('No broken icon found in (or already cleaned) ' + f);
        }
    }
});
