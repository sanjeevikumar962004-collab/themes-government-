const fs = require('fs');
const path = require('path');

const base = __dirname; // government folder

// ====================================================================
// LOGO - use local white logo
// ====================================================================
const LOGO_SRC_LOCAL = 'whitelogo.webp';

// ====================================================================
// IMAGE ASSIGNMENTS
// ====================================================================
// index.html images
const IDX = {
    hero: 'images/hero.webp',
    aboutCard: 'images/pexels-olia-danilevich-6325996.webp',
    // testimonial avatars
    avatar1: 'images/pexels-olia-danilevich-8145244.webp',
    avatar2: 'images/pexels-olia-danilevich-8145346.webp',
    avatar3: 'images/pexels-olia-danilevich-8145352.webp',
    testimonialBg: 'images/pexels-mart-production-7222980.webp',
    // step images
    step1: 'images/pexels-matreding-4468974.webp',
    step2: 'images/pexels-thirdman-7651932.webp',
    step3: 'images/pexels-n-voitkevich-6863330.webp',
    step4: 'images/pexels-vlada-karpovich-7433909.webp',
    // service cards
    svc1: 'images/pexels-antonio-prado-1050855-3880204.webp',
    svc2: 'images/pexels-cristian-rojas-10041261.webp',
    svc3: 'images/pexels-a-darmel-8133880.webp',
    svc4: 'images/pexels-werner-pfennig-6950037.webp',
    // FAQ
    faq: 'images/pexels-pramodtiwari-13316037.webp',
};

// about.html images
const ABT = {
    landscape: 'images/pexels-mart-production-7644014.webp',
    square: 'images/pexels-leandro-paes-leme-3903752-6610689.webp',
    vision: 'images/pexels-olia-danilevich-6325996.webp',
    mission: 'images/pexels-yankrukov-8866748.webp',
    achievement1: 'images/pexels-zak-mir-2158162344-35429950.webp',
    achievement2: 'images/pexels-matreding-4468974.webp',
    achievement3: 'images/pexels-n-voitkevich-6863330.webp',
    team1: 'images/pexels-olia-danilevich-8145244.webp',
    team2: 'images/pexels-olia-danilevich-8145258.webp',
    team3: 'images/pexels-olia-danilevich-8145261.webp',
    team4: 'images/pexels-olia-danilevich-8145346.webp',
    team5: 'images/pexels-olia-danilevich-8145352.webp',
    team6: 'images/pexels-olia-danilevich-8145359.webp',
};

// services.html images
const SVC = {
    svc1: 'images/pexels-antonio-prado-1050855-3880204.webp',
    svc2: 'images/pexels-cristian-rojas-10041261.webp',
    svc3: 'images/pexels-a-darmel-8133880.webp',
    svc4: 'images/pexels-werner-pfennig-6950037.webp',
    svc5: 'images/pexels-pramodtiwari-13316037.webp',
    svc6: 'images/pexels-thirdman-7651932.webp',
    testimonialBg: 'images/pexels-mart-production-7222980.webp',
    avatar1: 'images/pexels-olia-danilevich-8145244.webp',
    avatar2: 'images/pexels-olia-danilevich-8145346.webp',
    avatar3: 'images/pexels-olia-danilevich-8145352.webp',
};

// contact.html images
const CON = {
    contactImg: 'images/pexels-vlada-karpovich-7433909.webp',
};

// ====================================================================
// CDN patterns we want to replace → local src
// The CDN URLs we identify by their unique filename fragment
// ====================================================================

// Helper to replace ALL img src/srcset in an HTML that match a CDN pattern
// with a simple local src and remove srcset for local images
function replaceImg(html, cdnFragment, localSrc) {
    // Replace src="<CDN with cdnFragment>"
    html = html.replace(
        new RegExp(`(src=")https://[^"]*${escapeRE(cdnFragment)}[^"]*(")`, 'g'),
        `$1${localSrc}$2`
    );
    // Replace srcset="..." if it contains cdnFragment — remove the whole srcset attr
    html = html.replace(
        new RegExp(`\\s*srcset="[^"]*${escapeRE(cdnFragment)}[^"]*"`, 'g'),
        ''
    );
    // Also replace sizes="..." after an image that now has a local src - remove sizes too
    return html;
}

function escapeRE(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Strip sizes attr from local images (they're not needed)
function stripSizesNearLocal(html) {
    // After local images, remove dangling sizes= attributes
    return html.replace(/(src="images\/[^"]+"\s*)sizes="[^"]*"/g, '$1');
}

// Replace all logo CDN src with local white logo (in nav and footer)
function replaceLogos(html) {
    // Nav logo and footer logo use the same CDN pattern
    html = html.replace(
        /src="https:\/\/cdn\.prod\.website-files\.com\/[^"]*%5BH1%5D[^"]*"/g,
        `src="${LOGO_SRC_LOCAL}"`
    );
    // Remove srcset for logo
    html = html.replace(
        /\s*srcset="https:\/\/cdn\.prod\.website-files\.com\/[^"]*%5BH1%5D[^"]*"/g,
        ''
    );
    return html;
}

// ====================================================================
// Update index.html
// ====================================================================
function updateIndex() {
    let html = fs.readFileSync(path.join(base, 'index.html'), 'utf8');

    // Logo
    html = replaceLogos(html);

    // Hero background image - unique fragment: 89d57fac or 6953a021
    html = replaceImg(html, '89d57fac', IDX.hero);
    html = replaceImg(html, '6953a021', IDX.hero);

    // About section card image - fragment: edqwdq or 69351341
    html = replaceImg(html, 'edqwdq', IDX.aboutCard);
    html = replaceImg(html, '69351341', IDX.aboutCard);

    // Service images
    // svc1: wQC fragment
    html = replaceImg(html, 'wQC', IDX.svc1);
    html = replaceImg(html, '6908df4c', IDX.svc1);
    // svc2: CVQWFQ fragment
    html = replaceImg(html, 'CVQWFQ', IDX.svc2);
    html = replaceImg(html, '6908df57', IDX.svc2);
    // svc3: QFQWF fragment
    html = replaceImg(html, 'QFQWF', IDX.svc3);
    html = replaceImg(html, '6908df62', IDX.svc3);
    // svc4: qcf fragment
    html = replaceImg(html, '_qcf', IDX.svc4);
    html = replaceImg(html, '6908df6a', IDX.svc4);

    // Testimonial background: 941680cc
    html = replaceImg(html, '941680cc', IDX.testimonialBg);
    html = replaceImg(html, '6913186d', IDX.testimonialBg);

    // Testimonial avatars
    // avatar1: fa52e390
    html = replaceImg(html, 'fa52e390', IDX.avatar1);
    html = replaceImg(html, '693422c6', IDX.avatar1);
    // avatar2: 640836b3
    html = replaceImg(html, '640836b3', IDX.avatar2);
    html = replaceImg(html, '693422a9', IDX.avatar2);
    // avatar3: 55e72789
    html = replaceImg(html, '55e72789', IDX.avatar3);
    html = replaceImg(html, '693422df', IDX.avatar3);

    // Step images
    // step1: qfqwef
    html = replaceImg(html, 'qfqwef', IDX.step1);
    html = replaceImg(html, '6908e1b1841365', IDX.step1);
    // step2: f1f13f1
    html = replaceImg(html, 'f1f13f1', IDX.step2);
    html = replaceImg(html, '6908e1b1566acef', IDX.step2);
    // step3: f312q2f123qf
    html = replaceImg(html, 'f312q2f123qf', IDX.step3);
    html = replaceImg(html, '6908e1b12509665', IDX.step3);
    // step4: 2w33f23qf
    html = replaceImg(html, '2w33f23qf', IDX.step4);
    html = replaceImg(html, '6908e1b1945fb0', IDX.step4);

    // FAQ image: fqfqf
    html = replaceImg(html, 'fqfqf', IDX.faq);
    html = replaceImg(html, '6908e24f', IDX.faq);

    // Also replace the arrow SVG icon (these stay as CDN, skip)
    // Remove all dangling srcset / sizes attrs on local images
    html = stripSizesNearLocal(html);

    fs.writeFileSync(path.join(base, 'index.html'), html, 'utf8');
    console.log('index.html updated');
}

// ====================================================================
// Update about.html
// ====================================================================
function updateAbout() {
    let html = fs.readFileSync(path.join(base, 'about.html'), 'utf8');

    html = replaceLogos(html);

    // About landscape: grgergeg
    html = replaceImg(html, 'grgergeg', ABT.landscape);
    html = replaceImg(html, '693515c3', ABT.landscape);

    // About square: gegege
    html = replaceImg(html, '_gegege', ABT.square);
    html = replaceImg(html, '693515cf', ABT.square);

    // Vision: gergeg3
    html = replaceImg(html, 'gergeg3', ABT.vision);
    html = replaceImg(html, '69351670', ABT.vision);

    // Mission: gergrg
    html = replaceImg(html, '_gergrg', ABT.mission);
    html = replaceImg(html, '69351656', ABT.mission);

    // Achievement 1: btedhbethe
    html = replaceImg(html, 'btedhbethe', ABT.achievement1);
    html = replaceImg(html, '69351701', ABT.achievement1);

    // Achievement 2: erygerhe
    html = replaceImg(html, 'erygerhe', ABT.achievement2);
    html = replaceImg(html, '69351710', ABT.achievement2);

    // Achievement 3: egheghe
    html = replaceImg(html, 'egheghe', ABT.achievement3);
    html = replaceImg(html, '6935171e', ABT.achievement3);

    // Team members (by unique CDN fragment)
    // team1: envato-labs-ai-2a06383b
    html = replaceImg(html, '2a06383b', ABT.team1);
    html = replaceImg(html, '6929a7f2', ABT.team1);
    // team2: 4aadc6fe
    html = replaceImg(html, '4aadc6fe', ABT.team2);
    html = replaceImg(html, '6929b7f21d0', ABT.team2);
    // team3: bb75ed8c
    html = replaceImg(html, 'bb75ed8c', ABT.team3);
    html = replaceImg(html, '6929b7f219cf', ABT.team3);
    // team4: 076e6bb9
    html = replaceImg(html, '076e6bb9', ABT.team4);
    html = replaceImg(html, '6929b7f219cf98d8f9aff904', ABT.team4);
    // team5: 72fed5cf
    html = replaceImg(html, '72fed5cf', ABT.team5);
    html = replaceImg(html, '6929b7f2d96', ABT.team5);
    // team6: 1bf42d12
    html = replaceImg(html, '1bf42d12', ABT.team6);
    html = replaceImg(html, '6929b7f2a03', ABT.team6);

    html = stripSizesNearLocal(html);

    fs.writeFileSync(path.join(base, 'about.html'), html, 'utf8');
    console.log('about.html updated');
}

// ====================================================================
// Update services.html
// ====================================================================
function updateServices() {
    let html = fs.readFileSync(path.join(base, 'services.html'), 'utf8');

    html = replaceLogos(html);

    // Service card 1 (Permit): wQC
    html = replaceImg(html, 'wQC', SVC.svc1);
    // Service card 2 (Doc Cert): CVQWFQ
    html = replaceImg(html, 'CVQWFQ', SVC.svc2);
    // Service card 3 (Public Records): QFQWF
    html = replaceImg(html, 'QFQWF', SVC.svc3);
    // Service card 4 (Civic Support): _qcf
    html = replaceImg(html, '_qcf', SVC.svc4);
    // Service card 5 (Business & Reg): cfwqc
    html = replaceImg(html, 'cfwqc', SVC.svc5);
    html = replaceImg(html, '6908df85', SVC.svc5);
    // Service card 6 (International): xqqsqd
    html = replaceImg(html, 'xqqsqd', SVC.svc6);
    html = replaceImg(html, '6908e042', SVC.svc6);

    // Testimonial background
    html = replaceImg(html, '941680cc', SVC.testimonialBg);
    html = replaceImg(html, '6913186d', SVC.testimonialBg);

    // Avatars
    html = replaceImg(html, 'fa52e390', SVC.avatar1);
    html = replaceImg(html, '693422c6', SVC.avatar1);
    html = replaceImg(html, '640836b3', SVC.avatar2);
    html = replaceImg(html, '693422a9', SVC.avatar2);
    html = replaceImg(html, '55e72789', SVC.avatar3);
    html = replaceImg(html, '693422df', SVC.avatar3);

    html = stripSizesNearLocal(html);

    fs.writeFileSync(path.join(base, 'services.html'), html, 'utf8');
    console.log('services.html updated');
}

// ====================================================================
// Update contact.html
// ====================================================================
function updateContact() {
    let html = fs.readFileSync(path.join(base, 'contact.html'), 'utf8');

    html = replaceLogos(html);

    // Contact section image: bfsgbswrg
    html = replaceImg(html, 'bfsgbswrg', CON.contactImg);
    html = replaceImg(html, '69351977', CON.contactImg);

    html = stripSizesNearLocal(html);

    fs.writeFileSync(path.join(base, 'contact.html'), html, 'utf8');
    console.log('contact.html updated');
}

// Run all updates
updateIndex();
updateAbout();
updateServices();
updateContact();
console.log('\nAll HTML files updated successfully!');
