const fs = require('fs');
const path = require('path');

const contactFile = path.join(__dirname, 'contact.html');
let content = fs.readFileSync(contactFile, 'utf8');

const missingSectionHTML = `
    <section data-w-id="0dc4eaf7-6ea4-302d-abbf-79e8f94a52c1" class="inner-banner-section">
        <div class="w-layout-blockcontainer inner-banner-container w-container">
            <div class="inner-banner-title-wrapper">
                <h1 class="inner-banner-title">Contact Us</h1>
            </div>
        </div>
    </section>
    <section class="contact-section">
        <div class="w-layout-blockcontainer contact-wrapper w-container">
            <div class="contact-content-wrapper">
                <div class="contact-info-wrapper">
                    <div class="contact-heading">Get in Touch</div>
                    <div class="contact-info">
                        <div class="contact-info-top">
                            <h2 class="contact-us">We're Here to Help</h2>
                            <p class="about-paragraph">Whether you have a question about government services, need assistance with an application, or want to provide feedback, our team is ready to assist you.</p>
                        </div>
                        <div class="contact-info-bottom">
                            <p><strong>Email:</strong> support@civicserve.gov</p>
                            <p><strong>Phone:</strong> 1-800-CIVIC-GOV</p>
                            <p><strong>Location:</strong> City Hall, 100 Civic Center, Downtown</p>
                            <p><strong>Hours:</strong> Mon-Fri, 8 AM - 5 PM</p>
                        </div>
                    </div>
                </div>
`;

// Insert it right before `<div class="form-wrapper _2">`
// We also need to search the exact spot. 
// contact.html currently has `    </div>\n                <div class="form-wrapper _2">` 
// around line 181.

const targetPoint = '<div class="form-wrapper _2">';

if (content.indexOf(targetPoint) !== -1) {
    // If the inner-banner-section is not there, we'll inject it.
    if (!content.includes('inner-banner-section')) {
        content = content.replace(targetPoint, missingSectionHTML + targetPoint);
        fs.writeFileSync(contactFile, content);
        console.log("Successfully restored missing contact section.");
    } else {
        console.log("Section might already exist. Check manually.");
    }
} else {
    console.log("Could not find insertion point.");
}
