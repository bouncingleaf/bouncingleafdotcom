import sharp from 'sharp';

async function optimizeLogo() {
  const inputPath = 'public/images/logo-sm.png';

  try {
    // Full size WebP
    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile('public/images/logo-sm.webp');
    console.log('✓ Created logo-sm.webp');

    // Thumbnail WebP (400px)
    await sharp(inputPath)
      .resize(400, 400, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .webp({ quality: 80 })
      .toFile('public/images/logo-sm-thumb.webp');
    console.log('✓ Created logo-sm-thumb.webp');

    // Medium WebP (800px)
    await sharp(inputPath)
      .resize(800, 800, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .webp({ quality: 85 })
      .toFile('public/images/logo-sm-medium.webp');
    console.log('✓ Created logo-sm-medium.webp');

    console.log('\n✓ Logo optimization complete!');
  } catch (error) {
    console.error('Error optimizing logo:', error.message);
    process.exit(1);
  }
}

optimizeLogo();
