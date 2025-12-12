import sharp from 'sharp';

async function checkDimensions() {
  const images = [
    'public/images/artomat/IMG_6224.jpeg',
    'public/images/artomat/IMG_6225.jpeg',
    'public/images/artomat/IMG_6235.jpeg'
  ];

  for (const img of images) {
    const metadata = await sharp(img).metadata();
    console.log(`${img}: ${metadata.width}x${metadata.height}`);
  }
}

checkDimensions();
