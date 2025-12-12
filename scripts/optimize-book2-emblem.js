import sharp from 'sharp';

async function optimizeEmblem() {
  const inputPath = 'public/images/sketchbook/book2/emblemSketch2.png';

  try {
    // Full size WebP
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile('public/images/sketchbook/book2/emblemSketch2.webp');
    console.log('✓ Created emblemSketch2.webp');

    // Thumbnail WebP (400px)
    await sharp(inputPath)
      .resize(400, 400, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .webp({ quality: 80 })
      .toFile('public/images/sketchbook/book2/emblemSketch2-thumb.webp');
    console.log('✓ Created emblemSketch2-thumb.webp');

    // Medium WebP (800px)
    await sharp(inputPath)
      .resize(800, 800, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .webp({ quality: 85 })
      .toFile('public/images/sketchbook/book2/emblemSketch2-medium.webp');
    console.log('✓ Created emblemSketch2-medium.webp');

    console.log('\n✓ Book 2 emblem optimization complete!');
  } catch (error) {
    console.error('Error optimizing emblem:', error.message);
    process.exit(1);
  }
}

optimizeEmblem();
