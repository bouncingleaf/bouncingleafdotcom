import { readdir } from 'fs/promises';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const CREATURES_DIR = './public/images/creatures';
const GALLERY_JSON = './src/data/gallery.json';

async function findCreaturesSeries() {
  const entries = await readdir(CREATURES_DIR, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && entry.name.match(/^creatures\d+$/))
    .map(entry => entry.name)
    .sort();
}

async function generateCreaturesEntry(seriesDir) {
  const seriesPath = join(CREATURES_DIR, seriesDir);
  const files = await readdir(seriesPath);

  // Extract series number (e.g., "creatures09" -> "09")
  const seriesNum = seriesDir.replace('creatures', '');
  const seriesNumInt = parseInt(seriesNum, 10);

  // Find emblem file
  const emblemFile = files.find(f => f.match(/^emblem/i));
  const emblem = emblemFile
    ? `/images/creatures/${seriesDir}/${emblemFile}`
    : null;

  // Find all paired images (XX-YY-ZZ.jpeg and XX-YY-ZZnames.jpeg)
  const mainImages = files
    .filter(f => f.match(/^\d+-\d+-\d+\.jpeg$/) && !f.includes('names'))
    .sort();

  const pairs = mainImages.map(mainFile => {
    const baseName = mainFile.replace('.jpeg', '');
    const namesFile = `${baseName}names.jpeg`;
    const id = baseName;

    return {
      id,
      mainImage: `/images/creatures/${seriesDir}/${mainFile}`,
      namesImage: files.includes(namesFile)
        ? `/images/creatures/${seriesDir}/${namesFile}`
        : null,
      isPaired: files.includes(namesFile)
    };
  });

  // Find any unpaired images (like "07class.jpeg", "07edges.jpeg")
  const unpairedImages = files
    .filter(f =>
      f.match(/^\d+[a-z]+\.jpeg$/i) &&
      !f.includes('names') &&
      !f.match(/^\d+-\d+-\d+/)
    )
    .sort();

  unpairedImages.forEach(file => {
    const id = file.replace('.jpeg', '');
    pairs.push({
      id,
      mainImage: `/images/creatures/${seriesDir}/${file}`,
      namesImage: null,
      isPaired: false
    });
  });

  return {
    id: seriesDir,
    title: `Mysterious Creatures Series ${seriesNumInt}`,
    emblem,
    pairs
  };
}

async function updateGalleryJson() {
  console.log('Scanning for creatures series...\n');

  // Read existing gallery data
  const galleryData = JSON.parse(readFileSync(GALLERY_JSON, 'utf8'));

  // Find all creatures series directories
  const allSeries = await findCreaturesSeries();
  console.log(`Found ${allSeries.length} creatures series directories:`, allSeries.join(', '));

  // Find existing series in gallery.json
  const existingSeries = new Set(galleryData.creatures.map(c => c.id));
  console.log(`\nExisting in gallery.json (${existingSeries.size}):`, Array.from(existingSeries).join(', '));

  // Find new series
  const newSeries = allSeries.filter(s => !existingSeries.has(s));

  if (newSeries.length === 0) {
    console.log('\n✓ No new creatures series to add. Gallery data is up to date!');
    return false;
  }

  console.log(`\n→ New series to add (${newSeries.length}):`, newSeries.join(', '));

  // Generate entries for new series
  console.log('\nGenerating data for new series...');
  for (const seriesDir of newSeries) {
    const entry = await generateCreaturesEntry(seriesDir);
    console.log(`  ✓ ${seriesDir}: ${entry.pairs.length} images, emblem: ${entry.emblem ? 'yes' : 'NO (will use placeholder)'}`);
    galleryData.creatures.push(entry);
  }

  // Sort creatures by ID to maintain order
  galleryData.creatures.sort((a, b) => a.id.localeCompare(b.id));

  // Write updated gallery.json
  writeFileSync(GALLERY_JSON, JSON.stringify(galleryData, null, 2) + '\n');
  console.log(`\n✓ Updated ${GALLERY_JSON} with ${newSeries.length} new series!`);

  return true;
}

// Run the script
updateGalleryJson()
  .then(updated => {
    if (updated) {
      console.log('\n→ Next step: Run `npm run optimize:images` to create WebP versions');
    }
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
