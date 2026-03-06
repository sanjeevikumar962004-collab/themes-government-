const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, 'images');

const jpgFiles = fs.readdirSync(imageDir).filter(f => f.match(/\.(jpg|jpeg)$/i));

async function convertFile(file) {
    const inputPath = path.join(imageDir, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(imageDir, baseName + '.webp');

    let quality = 70;
    let buf;
    do {
        buf = await sharp(inputPath)
            .resize({ width: 1200, withoutEnlargement: true })
            .webp({ quality })
            .toBuffer();
        if (buf.length > 90 * 1024 && quality > 10) {
            quality -= 10;
        } else {
            break;
        }
    } while (true);

    fs.writeFileSync(outputPath, buf);
    const kb = (buf.length / 1024).toFixed(1);
    console.log(`OK ${baseName}.webp -- ${kb} KB (q${quality})`);
}

(async () => {
    console.log(`Converting ${jpgFiles.length} images...`);
    for (const file of jpgFiles) {
        await convertFile(file);
    }
    console.log('All done!');
})();
