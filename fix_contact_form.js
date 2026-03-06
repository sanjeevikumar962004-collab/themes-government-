const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'contact.html');
let html = fs.readFileSync(file, 'utf8');

// Ensure unique IDs and required flags
let parts = html.split('<div class="text-field-wrapper">');

if (parts.length > 4) {
    parts[2] = parts[2].replace('for="name"', 'for="email"').replace('>Email<', '>Email<').replace('name="name"', 'name="email"').replace('data-name="Name"', 'data-name="Email"').replace('id="name"', 'id="email" required');
    parts[3] = parts[3].replace('for="name"', 'for="phone"').replace('>Phone Number<', '>Phone Number<').replace('name="name"', 'name="phone"').replace('data-name="Name"', 'data-name="Phone"').replace('id="name"', 'id="phone" required');
    parts[4] = parts[4].replace('for="name"', 'for="subject"').replace('>Subject<', '>Subject<').replace('name="name"', 'name="subject"').replace('data-name="Name"', 'data-name="Subject"').replace('id="name"', 'id="subject" required');

    html = parts.join('<div class="text-field-wrapper">');
    html = html.replace('id="name" />', 'id="name" required />');
    html = html.replace('<label for="name" class="field-label">Message</label>', '<label for="message" class="field-label">Message</label>');
    html = html.replace('id="field" name="field"', 'id="message" name="message" required');
}

// Modify the script at the bottom of the page
// We need the form to prevent default ONLY if it's valid, and then navigate to error.html.
// Currently it just catches all buttons. We need to detach this default behavior from the form submit button, 
// and instead attach an event listener to the form itself.

const oldScript = \`<script>
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button:not(.toggle-password):not(.w-nav-button), input[type="submit"], input[type="button"]');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'error.html';
        });
    });
});
</script>\`;

const newScript = \`<script>
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button:not(.toggle-password):not(.w-nav-button), input[type="button"]');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'error.html';
        });
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent standard form submission
            window.location.href = 'error.html'; // Navigate to error.html / 404 page
        });
    });
});
</script>\`;

if (html.includes(oldScript)) {
    html = html.replace(oldScript, newScript);
} else if (!html.includes('form.addEventListener(\\\'submit\\\'')) {
    // If exact script block isn't found, try to replace by parsing
    html = html.replace(/<script>[\s\S]*?document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/, newScript);
}

fs.writeFileSync(file, html);
console.log("Contact page modified successfully");
