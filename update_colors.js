const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const filesToUpdate = ['style.css', 'index.html', 'about.html', 'services.html', 'contact.html'];

filesToUpdate.forEach(file => {
    const filePath = path.join(baseDir, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace #383845 (dark charcoal) with #7a0016 (deep burgundy)
    content = content.replace(/#383845/gi, '#7a0016');
    // Replace rgb(56, 56, 69) and stripped variants
    content = content.replace(/rgb\(\s*56\s*,\s*56\s*,\s*69\s*\)/gi, 'rgb(122, 0, 22)');
    content = content.replace(/rgba\(\s*56\s*,\s*56\s*,\s*69\s*,/gi, 'rgba(122, 0, 22,');

    // Replace #3898ec (light blue) with #e2e8f0 (silver/slate)
    content = content.replace(/#3898ec/gi, '#e2e8f0');
    // Replace rgb(56, 152, 236)
    content = content.replace(/rgb\(\s*56\s*,\s*152\s*,\s*236\s*\)/gi, 'rgb(226, 232, 240)');
    content = content.replace(/rgba\(\s*56\s*,\s*152\s*,\s*236\s*,/gi, 'rgba(226, 232, 240,');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated colors in ${file}`);
});
