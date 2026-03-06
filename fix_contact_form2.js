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
const newScript = "<script>\\n" +
    "document.addEventListener('DOMContentLoaded', function() {\\n" +
    "    const buttons = document.querySelectorAll('button:not(.toggle-password):not(.w-nav-button), input[type=\"button\"]');\\n" +
    "    buttons.forEach(btn => {\\n" +
    "        btn.addEventListener('click', function(e) {\\n" +
    "            e.preventDefault();\\n" +
    "            window.location.href = 'error.html';\\n" +
    "        });\\n" +
    "    });\\n" +
    "\\n" +
    "    const forms = document.querySelectorAll('form');\\n" +
    "    forms.forEach(form => {\\n" +
    "        form.addEventListener('submit', function(e) {\\n" +
    "            e.preventDefault(); // Prevent standard form submission\\n" +
    "            window.location.href = 'error.html'; // Navigate to error.html / 404 page\\n" +
    "        });\\n" +
    "    });\\n" +
    "});\\n" +
    "</script>";

html = html.replace(/<script>[\s\S]*?document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/, newScript);

fs.writeFileSync(file, html);
console.log("Contact page modified successfully");
