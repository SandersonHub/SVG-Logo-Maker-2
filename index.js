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

  //text color
  const textColor = await promptUser('Enter the text color (keyword or hexadecimal): ');

  console.log('Choose a shape:');
  for (let i = 0; i < shapes.shapes.length; i++) {
    console.log(`${i + 1}. ${shapes.shapes[i]}`);
  }
  //What shape do you want?
  const shapeIndex = parseInt(await promptUser(`Enter what shape you want, (1-${shapes.shapes.length}): `), 10);
  const shape = shapes.shapes[shapeIndex - 1];

  //shape color
  const shapeColor = await promptUser('Enter the shape color, Please!: ');

  // SVG content for the HTML
  let svgContent;

//changed how shapes are inputed, will output an SVG.
  switch (shape) {
    case 'triangle':
      svgContent = `<svg width="300" height="200">
        <polygon points="150,20 275,280 25,280" fill="${shapeColor}" />
        <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="48" fill="${textColor}">${text}</text>
      </svg>`;
      break;
    case 'square':
      svgContent = `<svg width="300" height="200">
        <rect width="200" height="200" fill="${shapeColor}" />
        <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="48" fill="${textColor}">${text}</text>
      </svg>`;
      break;
    case 'circle':
      svgContent = `<svg width="300" height="200">
        <circle cx="150" cy="100" r="100" fill="${shapeColor}" />
        <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="48" fill="${textColor}">${text}</text>
      </svg>`;
      break;
    default:
      console.error('Invalid shape selected.');
      rl.close();
      return;
  }

  // convert the file to an SVG type file
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
