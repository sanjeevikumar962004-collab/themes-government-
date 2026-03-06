const fs = require('fs');
let html = fs.readFileSync('index2.html', 'utf8');

// 1. Target the Hero Section
// Current hero wrapper starts with <div class="hero-content-wrapper"> and ends around the background image div.
// We will replace the entire <section class="hero-section"> block.

const newHero = `
<section class="hero-split section-with-background">
    <div class="hero-split-content">
        <h1 class="hero-section-title">Serving citizens with clarity, speed, and accountability.</h1>
        <p class="hero-section-paragraph">Behind every service lies a commitment to the public good. We help citizens and businesses access essential government services with transparency and ease.</p>
        <div class="main-button-wrapper">
            <a href="/contact" class="main-button w-inline-block">
                <div class="link-block">
                    <div class="color-text hover">Submit Request</div>
                    <div class="color-text hover-2">Submit Request</div>
                </div>
                <div class="arrow-up-right w-embed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </a>
            <a href="/about" class="second-button w-inline-block" style="border-color: #7a0016; margin-left:15px;">
                <div class="link-block">
                    <div class="color-text hover" style="color:#7a0016;">Who We Are</div>
                    <div class="color-text hover-2" style="color:#7a0016;">Who We Are</div>
                </div>
            </a>
        </div>
    </div>
    <div class="hero-split-image-wrapper">
        <img src="images/3.webp" alt="Government Service Operations" class="hero-split-image">
    </div>
</section>
`;

const oldHeroStart = html.indexOf('<section class="hero-section">');
if (oldHeroStart !== -1) {
    const oldHeroEnd = html.indexOf('</section>', oldHeroStart) + 10;
    html = html.substring(0, oldHeroStart) + newHero + html.substring(oldHeroEnd);
    console.log("Replaced Hero section in index2.html");
}

// 2. Target the Services Section
// Current services wrapper starts with <div class="service-section-wrapper">
const newServices = `
<section class="service-page-section">
    <div class="zig-zag-container">
        <div style="text-align:center; margin-bottom: 60px;">
            <div class="award-badge-wrapper" style="margin: 0 auto 20px;">
                <div class="badge-text" style="color:#7a0016;">Core Services</div>
            </div>
            <h2 class="service-section-title" style="width:100%; font-size: 3rem;">Essential government services for every citizen</h2>
        </div>
        
        <div class="zig-zag-row">
            <div class="zig-zag-content">
                <h3 class="service-title" style="margin-bottom: 20px;">Permit & License Applications</h3>
                <p class="service-description" style="font-size:1.1rem; line-height: 1.6; margin-bottom: 30px;">Streamlined processing for all zoning, building, and commercial licenses required within the city limits. Our dedicated permit center ensures applications are reviewed promptly and transparently.</p>
                <a href="/service" class="main-button w-inline-block" style="padding: 10px 20px;">
                    <div class="link-block"><div class="color-text hover">Apply Now</div><div class="color-text hover-2">Apply Now</div></div>
                </a>
            </div>
            <div class="zig-zag-image-wrapper">
                <img src="images/6.webp" alt="License application" class="zig-zag-image">
            </div>
        </div>

        <div class="zig-zag-row">
            <div class="zig-zag-content">
                <h3 class="service-title" style="margin-bottom: 20px;">Document Certification & Verification</h3>
                <p class="service-description" style="font-size:1.1rem; line-height: 1.6; margin-bottom: 30px;">Official authentication, apostille services, and sworn translations for civic documents to be recognized locally and internationally, ensuring absolute legal validity.</p>
                <a href="/service" class="main-button w-inline-block" style="padding: 10px 20px;">
                    <div class="link-block"><div class="color-text hover">Certify Document</div><div class="color-text hover-2">Certify Document</div></div>
                </a>
            </div>
            <div class="zig-zag-image-wrapper">
                <img src="images/21.webp" alt="Document verification" class="zig-zag-image">
            </div>
        </div>

        <div class="zig-zag-row">
            <div class="zig-zag-content">
                <h3 class="service-title" style="margin-bottom: 20px;">Public Records & Registry</h3>
                <p class="service-description" style="font-size:1.1rem; line-height: 1.6; margin-bottom: 30px;">Access civic archives, vital records, property deeds, and legislative history through our secure public registry. Submit your request easily through the portal.</p>
                <a href="/service" class="main-button w-inline-block" style="padding: 10px 20px;">
                    <div class="link-block"><div class="color-text hover">Search Records</div><div class="color-text hover-2">Search Records</div></div>
                </a>
            </div>
            <div class="zig-zag-image-wrapper">
                <img src="images/20.webp" alt="Registry building" class="zig-zag-image">
            </div>
        </div>
    </div>
</section>
`;

const oldServicesStart = html.indexOf('<div class="service-section-wrapper">');
if (oldServicesStart !== -1) {
    // Find where the service section wrapper ends or the preceding section ends
    // To be safe, look for `<section class="step-by-step-section">` to slice it out
    const oldServicesEnd = html.indexOf('<section class="step-by-step-section">');
    // We also need to remove the wrapper that encloses the old services section.
    // Let's just do a rough replace by capturing up to the step-by-step-section.

    // Actually, let's find the exact starting index of the `<div class="service-section-wrapper">`
    const preciseStart = html.lastIndexOf('<div', oldServicesStart); // Start of wrapper block
    html = html.substring(0, oldServicesStart) + newServices + html.substring(oldServicesEnd);
    console.log("Replaced Services section in index2.html");
}

fs.writeFileSync('index2.html', html, 'utf8');
console.log("Transformation to index2.html completed.");
