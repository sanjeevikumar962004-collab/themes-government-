const fs = require('fs');

let html = fs.readFileSync('index2.html', 'utf8');

// Replace all badge-wrapper divs that use award-badge-wrapper class
// Add rounded rectangle style: border-radius, border, padding, background, display inline-flex, etc.

// Light badge on white/light backgrounds (crimson text + crimson border)
html = html.replace(
    /class="award-badge-wrapper" style="margin: 0 auto 20px; justify-content:center;"/g,
    'class="award-badge-wrapper" style="display:inline-flex; align-items:center; margin: 0 auto 20px; justify-content:center; background: rgba(139, 0, 26, 0.06); border: 1.5px solid rgba(139, 0, 26, 0.25); border-radius: 50px; padding: 6px 18px;"'
);

// Dark badge on dark backgrounds (white text/border) - "Our Impact" section
html = html.replace(
    /class="award-badge-wrapper" style="margin: 0 auto 20px; justify-content:center; background: rgba\(255,255,255,0\.1\); border: 1px solid rgba\(255,255,255,0\.2\);"/g,
    'class="award-badge-wrapper" style="display:inline-flex; align-items:center; margin: 0 auto 20px; justify-content:center; background: rgba(255,255,255,0.1); border: 1.5px solid rgba(255,255,255,0.3); border-radius: 50px; padding: 6px 18px;"'
);

// Hero badge (glassmorphism)
html = html.replace(
    /class="award-badge-wrapper" style="margin: 0 auto 30px; justify-content:center; background: rgba\(255,255,255,0\.15\); border: 1px solid rgba\(255,255,255,0\.3\); backdrop-filter: blur\(8px\);"/g,
    'class="award-badge-wrapper" style="display:inline-flex; align-items:center; margin: 0 auto 30px; justify-content:center; background: rgba(255,255,255,0.15); border: 1.5px solid rgba(255,255,255,0.4); border-radius: 50px; padding: 6px 20px; backdrop-filter: blur(8px);"'
);

// "How it Works" badge
html = html.replace(
    /class="award-badge-wrapper" style="margin-bottom: 20px;"/g,
    'class="award-badge-wrapper" style="display:inline-flex; align-items:center; margin-bottom: 20px; background: rgba(139, 0, 26, 0.06); border: 1.5px solid rgba(139, 0, 26, 0.25); border-radius: 50px; padding: 6px 18px;"'
);

fs.writeFileSync('index2.html', html, 'utf8');
console.log('Updated all badge-wrapper containers with rounded rectangle styling in index2.html');
