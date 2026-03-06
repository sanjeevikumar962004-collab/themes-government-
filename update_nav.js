const fs = require('fs');
const files = ['index.html', 'index2.html', 'about.html', 'services.html', 'contact.html'];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let html = fs.readFileSync(f, 'utf8');

        // Replace current/active Home link
        html = html.replace(
            /<a href="\/?" aria-current="page" class="nav-link w-nav-link w--current">Home<\/a>/g,
            '<a href="index.html" class="nav-link w-nav-link">Home 1</a><a href="index2.html" class="nav-link w-nav-link">Home 2</a>'
        );

        // Replace inactive Home links
        html = html.replace(
            /<a href="\/?" class="nav-link w-nav-link">Home<\/a>/gi,
            '<a href="index.html" class="nav-link w-nav-link">Home 1</a><a href="index2.html" class="nav-link w-nav-link">Home 2</a>'
        );

        // Webflow sometimes uses "/home"
        html = html.replace(
            /<a href="\/home" class="nav-link w-nav-link">Home<\/a>/gi,
            '<a href="index.html" class="nav-link w-nav-link">Home 1</a><a href="index2.html" class="nav-link w-nav-link">Home 2</a>'
        );

        fs.writeFileSync(f, html, 'utf8');
        console.log('Updated nav in ' + f);
    }
});
