const fs = require('fs');
const files = ['index.html', 'about.html', 'services.html', 'contact.html'];

const newFooter = `
    <footer class="modern-footer">
        <div class="footer-grid">
            <div class="footer-brand">
                <img src="whitelogo.webp" alt="Stackly Logo" class="footer-logo">
                <p>Empowering citizens through transparent and efficient public services.</p>
            </div>
            <div class="footer-links">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
            <div class="footer-contact">
                <h4>Contact Us</h4>
                <p>Email: support@stackly.gov</p>
                <p>Phone: 1-800-CIVIC-GOV</p>
                <p>Hours: Mon-Fri, 8 AM - 5 PM</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 Stackly Government Portal. All rights reserved.</p>
            <div class="legal-links">
                <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
            </div>
        </div>
    </footer>
`;

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // Find the old footer section and replace it
    // The old footer starts with <section class="footer"> and ends with </section>
    // before the scripts. We use regex to match it.

    // We want to match from <section class="footer"> up to the FIRST </section> that matches its scope,
    // but since regex can be finicky with nested tags, we'll slice strings manually for safety.

    const startIndex = html.indexOf('<section class="footer">');
    if (startIndex !== -1) {
        // Find the closure of the footer section. It's safe to look for the next </section> 
        // since the footer is usually the last section inside the body.
        let endIndex = html.indexOf('</section>', startIndex) + 10;

        let part1 = html.substring(0, startIndex);
        let part2 = html.substring(endIndex);

        fs.writeFileSync(file, part1 + newFooter + part2, 'utf8');
        console.log('Replaced footer in ' + file);
    } else {
        console.log('Old footer not found in ' + file);
    }
});
