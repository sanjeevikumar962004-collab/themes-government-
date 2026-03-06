const fs = require('fs');

const files = ['index.html', 'index2.html', 'about.html', 'services.html', 'contact.html', 'blog.html', 'dashboard.html'];

files.forEach(f => {
    if (fs.existsSync(f)) {
        let html = fs.readFileSync(f, 'utf8');

        // Note: The structure of "Home" block across pages looks roughly like:
        /*
            <a data-w-id="..." href="index.html" class="link-block w-inline-block">
                <div data-w-id="..." class="nav-button _2">Home</div>
                <div data-w-id="..." class="nav-button-dup">Home</div>
            </a>
        */

        // We will build a clean, custom dropdown structure matching Webflow principles and CSS.
        // It uses CSS hover for interaction.
        const dropdownHTML = `
            <div data-hover="true" data-delay="0" class="nav-dropdown w-dropdown" style="display:inline-block; position:relative; z-index:900;">
                <div class="nav-dropdown-toggle w-dropdown-toggle" style="padding: 10px 15px; cursor:pointer;">
                    <div class="nav-button _2" style="display:inline-block;">Home ▾</div>
                </div>
                <nav class="nav-dropdown-list w-dropdown-list" style="position: absolute; top:100%; left:0; min-width:160px; background:#fff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1); padding:8px 0; display:none;">
                    <a href="index.html" class="nav-dropdown-link w-dropdown-link" style="display:block; padding:10px 16px; color:#333; text-decoration:none; transition:background 0.2s;">Home 1</a>
                    <a href="index2.html" class="nav-dropdown-link w-dropdown-link" style="display:block; padding:10px 16px; color:#333; text-decoration:none; transition:background 0.2s;">Home 2</a>
                </nav>
            </div>
            <style>
                /* Dropdown hover behavior */
                .nav-dropdown:hover .nav-dropdown-list { display: block !important; }
                .nav-dropdown-link:hover { background-color: rgba(139, 0, 26, 0.06); color: #8b001a !important; }
                /* Adapt scrolled state text color */
                .navbarr.w-nav.nav-scrolled .nav-dropdown-toggle .nav-button { color: #111 !important; }
            </style>
        `;

        // We use a regex to capture the existing Home link-block accurately, accounting for aria-current differences.
        const homeLinkRegex = /<a[^>]*href="(\/|index\.html)"[^>]*>[\s\S]*?<div[^>]*class="nav-button _2"[^>]*>Home<\/div>[\s\S]*?<\/a>/i;

        if (homeLinkRegex.test(html)) {
            html = html.replace(homeLinkRegex, dropdownHTML);
            fs.writeFileSync(f, html, 'utf8');
            console.log('Successfully updated navigation dropdown in ' + f);
        } else {
            console.log('Could not find standard Home link in ' + f);
        }
    }
});
