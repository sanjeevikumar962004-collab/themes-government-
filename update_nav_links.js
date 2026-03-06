const fs = require('fs');
const files = ['index.html', 'index2.html', 'about.html', 'services.html', 'contact.html'];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let html = fs.readFileSync(f, 'utf8');
        html = html.replace(/<a href="index\.html">Home<\/a>/gi, '<a href="index.html">Home 1</a></li><li><a href="index2.html">Home 2</a>');
        // Handle variations with classes if any exist later in the HTML
        html = html.replace(/<a href="index\.html" class="nav-link w-nav-link">Home<\/a>/gi, '<a href="index.html" class="nav-link w-nav-link">Home 1</a><a href="index2.html" class="nav-link w-nav-link">Home 2</a>');
        html = html.replace(/<a href="index\.html" aria-current="page" class="nav-link w-nav-link w--current">Home<\/a>/gi, '<a href="index.html" class="nav-link w-nav-link">Home 1</a><a href="index2.html" class="nav-link w-nav-link">Home 2</a>');

        fs.writeFileSync(f, html, 'utf8');
        console.log('Fixed nav in ' + f);
    }
});
