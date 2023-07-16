const readline = require('readline');
const fs = require('fs');
const shapes = require('./lib/shapes');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function generateLogo() {
  const text = await promptUser('Please put in three characters: ');

  const textColor = await promptUser('Enter the text color (keyword or hexadecimal): ');

  console.log('Choose a shape:');
  for (let i = 0; i < shapes.shapes.length; i++) {
    console.log(`${i + 1}. ${shapes.shapes[i]}`);
  }
  const shapeIndex = parseInt(await promptUser(`Enter what shape you want, (1-${shapes.shapes.length}): `), 10);
  const shape = shapes.shapes[shapeIndex - 1];

  const shapeColor = await promptUser('Enter the shape color, Please!: ');

  const svgContent = `<svg width="300" height="200">
    <circle cx="150" cy="100" r="100" fill="${shapeColor}" />
    <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="48" fill="${textColor}">${text}</text>
  </svg>`;

  fs.writeFile('logo.svg', svgContent, (err) => {
    if (err) {
      console.error('Error creating logo.svg:', err);
    } else {
      console.log('Generated logo.svg');
    }
    rl.close();
  });
}

generateLogo();
