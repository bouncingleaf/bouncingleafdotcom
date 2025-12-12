import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { existsSync } from 'fs';

const QUALITY_FULL = 85;
const QUALITY_THUMB = 80;
const THUMB_SIZE = 400;
const MEDIUM_SIZE = 800;

async function processDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.name.match(/\.(jpg|jpeg)$/i)) {
      await optimizeImage(fullPath);
    }
  }
}

async function optimizeImage(inputPath) {
  const dir = dirname(inputPath);
  const name = basename(inputPath, extname(inputPath));

  console.log(`Processing: ${inputPath}`);

  try {
    // Full size WebP
    const fullWebp = join(dir, `${name}.webp`);
    if (!existsSync(fullWebp)) {
      await sharp(inputPath)
        .webp({ quality: QUALITY_FULL, effort: 6 })
        .toFile(fullWebp);
      console.log(`  ✓ Created ${basename(fullWebp)}`);
    }

    // Thumbnail WebP
    const thumbWebp = join(dir, `${name}-thumb.webp`);
    if (!existsSync(thumbWebp)) {
      await sharp(inputPath)
        .resize(THUMB_SIZE, THUMB_SIZE, {
          fit: 'cover',
          position: 'centre'
        })
        .webp({ quality: QUALITY_THUMB })
        .toFile(thumbWebp);
      console.log(`  ✓ Created ${basename(thumbWebp)}`);
    }

    // Medium size WebP
    const mediumWebp = join(dir, `${name}-medium.webp`);
    if (!existsSync(mediumWebp)) {
      await sharp(inputPath)
        .resize(MEDIUM_SIZE, MEDIUM_SIZE, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: QUALITY_FULL })
        .toFile(mediumWebp);
      console.log(`  ✓ Created ${basename(mediumWebp)}`);
    }

  } catch (error) {
    console.error(`  ✗ Error processing ${inputPath}:`, error.message);
  }
}

// Run optimization
const imagesDir = './public/images';
console.log('Starting image optimization...\n');
processDirectory(imagesDir)
  .then(() => console.log('\n✓ Image optimization complete!'))
  .catch(err => console.error('Error:', err));
