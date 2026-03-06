const fs = require('fs');
const path = require('path');

const files = ['index.html', 'index2.html', 'about.html', 'services.html', 'contact.html', 'blog.html', 'dashboard.html', 'login.html', 'signup.html', 'forgot.html', 'error.html'];

files.forEach(f => {
    const filePath = path.join(__dirname, f);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');

        // Target the nav-button inside the dropdown to give it the data-w-id.
        // It currently looks like: <div class="nav-button _2" style="display:inline-block;">Home ▾</div>
        const badNavBtn = /<div class="nav-button _2" style="display:inline-block;">Home ▾<\/div>/g;
        if (badNavBtn.test(html)) {
            html = html.replace(badNavBtn, '<div data-w-id="e47e6da5-a1bd-b084-8544-1a540861bb74" class="nav-button _2" style="display:inline-block;">Home ▾</div>');

            // The user also mentioned "the drop menu also be black when scrolled"
            // We ensure dropdown link colors are pure black #111 instead of #333
            html = html.replace(/color:#333;/g, 'color:#111;');

            fs.writeFileSync(filePath, html, 'utf8');
            console.log('Fixed Home dropdown scroll color in ' + f);
        } else {
            console.log('Could not find dropdown toggle to fix in ' + f);
        }
    }
});
