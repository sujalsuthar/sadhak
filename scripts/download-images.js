const https = require('https');
const fs = require('fs');
const path = require('path');

const deities = [
  'shiva',
  'vishnu',
  'brahma',
  'parvati',
  'durga',
  'ganesha',
  'krishna',
  'ram',
  'hanuman',
  'saraswati',
  'lakshmi',
  'dattatreya',
  'ayyappa',
  'kartikeya',
  'venkateswara',
  'kali',
  'jagannath',
  'shani',
  'surya',
  'chandra',
  'kuber',
  'yama'
];

// Create images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Download placeholder images
deities.forEach(deity => {
  const url = `https://placehold.co/400x600/orange/white?text=${deity.toUpperCase()}`;
  const filePath = path.join(imagesDir, `${deity}.jpg`);

  https.get(url, (response) => {
    const file = fs.createWriteStream(filePath);
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${deity}.jpg`);
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${deity}.jpg:`, err.message);
  });
}); 