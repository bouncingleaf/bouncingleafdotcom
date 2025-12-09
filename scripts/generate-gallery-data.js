#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public', 'images');

// Generate creatures series data
const creaturesData = [];
for (let i = 1; i <= 8; i++) {
  const seriesNum = i.toString().padStart(2, '0');
  const seriesDir = path.join(publicDir, 'creatures', `creatures${seriesNum}`);

  if (fs.existsSync(seriesDir)) {
    const files = fs.readdirSync(seriesDir);

    // Find emblem
    const emblem = files.find(f => f.toLowerCase().includes('emblem'));

    // Find image pairs (exclude emblem and names files)
    const mainImages = files
      .filter(f => f.endsWith('.jpeg') && !f.includes('names') && !f.toLowerCase().includes('emblem'))
      .sort();

    const pairs = mainImages.map(mainImage => {
      const baseName = mainImage.replace('.jpeg', '');
      const namesImage = `${baseName}names.jpeg`;
      const namesPath = path.join(seriesDir, namesImage);
      const hasNamesImage = fs.existsSync(namesPath);

      return {
        id: baseName,
        mainImage: `/images/creatures/creatures${seriesNum}/${mainImage}`,
        namesImage: hasNamesImage ? `/images/creatures/creatures${seriesNum}/${namesImage}` : null,
        isPaired: hasNamesImage
      };
    });

    creaturesData.push({
      id: `creatures${seriesNum}`,
      title: `Mysterious Creatures Series ${i}`,
      emblem: emblem ? `/images/creatures/creatures${seriesNum}/${emblem}` : null,
      pairs: pairs
    });
  }
}

// Generate artomat data
const artomatDir = path.join(publicDir, 'artomat');
const artomatImages = fs.existsSync(artomatDir)
  ? fs.readdirSync(artomatDir)
      .filter(f => f.endsWith('.jpeg'))
      .map(f => ({
        id: f.replace('.jpeg', ''),
        path: `/images/artomat/${f}`,
        title: f.replace('.jpeg', '').replace(/_/g, ' ')
      }))
  : [];

// Generate circles data
const circlesDir = path.join(publicDir, 'circles');
const circlesImages = fs.existsSync(circlesDir)
  ? fs.readdirSync(circlesDir)
      .filter(f => f.endsWith('.jpeg'))
      .sort()
      .map(f => ({
        id: f.replace('.jpeg', ''),
        path: `/images/circles/${f}`,
        title: f.replace('.jpeg', '').replace(/_/g, ' ')
      }))
  : [];

// Generate sketchbook data (organized by book)
const sketchbookDir = path.join(publicDir, 'sketchbook');
const sketchbookData = [];

if (fs.existsSync(sketchbookDir)) {
  const bookDirs = fs.readdirSync(sketchbookDir)
    .filter(f => {
      const fullPath = path.join(sketchbookDir, f);
      return fs.statSync(fullPath).isDirectory();
    })
    .sort();

  bookDirs.forEach(bookDir => {
    const bookPath = path.join(sketchbookDir, bookDir);
    const files = fs.readdirSync(bookPath);

    // Find emblem
    const emblem = files.find(f => f.toLowerCase().includes('emblem'));

    // Find all image files (both .jpeg and .jpg)
    const images = files
      .filter(f => (f.endsWith('.jpeg') || f.endsWith('.jpg')) && !f.toLowerCase().includes('emblem'))
      .sort()
      .map(f => ({
        id: f.replace(/\.(jpeg|jpg)$/, ''),
        path: `/images/sketchbook/${bookDir}/${f}`,
        title: f.replace(/\.(jpeg|jpg)$/, '').replace(/_/g, ' ')
      }));

    sketchbookData.push({
      id: bookDir,
      title: bookDir === 'book1'
        ? 'Casual References to Other Dimensions (2020-2021)'
        : bookDir === 'book2'
        ? 'Your Guide to Drawing the Line (2021)'
        : bookDir,
      emblem: emblem ? `/images/sketchbook/${bookDir}/${emblem}` : null,
      images: images
    });
  });
}

// Generate other images data
const otherImages = [];
['jmrGlasses.jpeg', 'leaf2.png'].forEach(filename => {
  const filePath = path.join(publicDir, filename);
  if (fs.existsSync(filePath)) {
    otherImages.push({
      id: filename.replace(/\.(jpeg|png)/, ''),
      path: `/images/${filename}`,
      title: filename.replace(/\.(jpeg|png)/, '').replace(/_/g, ' ')
    });
  }
});

// Create final gallery data structure
const galleryData = {
  creatures: creaturesData,
  artomat: artomatImages,
  circles: circlesImages,
  sketchbook: sketchbookData,
  other: otherImages
};

// Write to file
const outputPath = path.join(__dirname, '..', 'src', 'data', 'gallery.json');
fs.writeFileSync(outputPath, JSON.stringify(galleryData, null, 2));

console.log(`Generated gallery data with:`);
console.log(`  - ${creaturesData.length} creatures series`);
console.log(`  - ${artomatImages.length} artomat images`);
console.log(`  - ${circlesImages.length} circles images`);
console.log(`  - ${sketchbookData.length} sketchbook books`);
console.log(`  - ${otherImages.length} other images`);
