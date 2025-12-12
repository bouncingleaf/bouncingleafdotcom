import sharp from 'sharp';

async function createFavicon() {
  try {
    // Create 32x32 PNG favicon
    await sharp('public/images/logo-sm.png')
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile('public/favicon.png');

    console.log('✓ Created favicon.png (32x32)');

    // Create 180x180 PNG for Apple touch icon
    await sharp('public/images/logo-sm.png')
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile('public/apple-touch-icon.png');

    console.log('✓ Created apple-touch-icon.png (180x180)');

    // Create 192x192 PNG for Android
    await sharp('public/images/logo-sm.png')
      .resize(192, 192, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile('public/android-chrome-192.png');

    console.log('✓ Created android-chrome-192.png (192x192)');

    console.log('\n✓ Favicon creation complete!');
  } catch (error) {
    console.error('Error creating favicon:', error.message);
    process.exit(1);
  }
}

createFavicon();
