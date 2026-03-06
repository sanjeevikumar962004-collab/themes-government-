const fs = require('fs');

// Extract the achievement section from about.html
let aboutHtml = fs.readFileSync('about.html', 'utf8');
const achieveStart = aboutHtml.indexOf('<section data-w-id="6939cc09-d48c-dd53-3d54-db2f4a65dcb7" class="achievement-section">');
const achieveEnd = aboutHtml.indexOf('</section>', achieveStart) + '</section>'.length;
const achievementSection = aboutHtml.substring(achieveStart, achieveEnd);

if (!achievementSection || achieveStart === -1) {
    console.log('Could not find achievement section in about.html');
    process.exit(1);
}

// Inject it into index2.html before the CTA section (before the red gradient section)
let index2Html = fs.readFileSync('index2.html', 'utf8');

// The CTA section starts with the red gradient background
const ctaMarker = '<section style="background: linear-gradient(135deg, #8b001a';

const insertIndex = index2Html.indexOf(ctaMarker);
if (insertIndex === -1) {
    console.log('Could not find CTA section in index2.html');
    process.exit(1);
}

const before = index2Html.substring(0, insertIndex);
const after = index2Html.substring(insertIndex);

index2Html = before + '\n' + achievementSection + '\n' + after;

fs.writeFileSync('index2.html', index2Html, 'utf8');
console.log('Successfully injected achievement section into index2.html before the CTA section.');
