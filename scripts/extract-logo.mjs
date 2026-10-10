import fs from 'fs';
const svg = fs.readFileSync('public/images/Amec Logo.svg', 'utf8');
const match = svg.match(/xlink:href="data:image\/png;base64,([^"]+)"/);
if (match) {
  fs.writeFileSync('public/images/amec-shield-logo.png', Buffer.from(match[1], 'base64'));
  console.log('Saved amec-shield-logo.png successfully!');
} else {
  console.log('No match found');
}
