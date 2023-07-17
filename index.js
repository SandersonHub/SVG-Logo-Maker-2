const readline = require('readline');
const fs = require('fs');
const shapes = require('./lib/shapes');

//readline, built in function with Node, accepts options
//https://nodejs.org/api/readline.html
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//prompts the user with a question / input field
function promptUser(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

//Asks the user for the three characters
async function generateLogo() {
  const text = await promptUser('Please put in three characters: ');

  //text color
  const textColor = await promptUser('Enter the text color (keyword or hexadecimal): ');
//displays the shape
  console.log('Choose a shape:');
  for (let i = 0; i < shapes.shapes.length; i++) {
    console.log(`${i + 1}. ${shapes.shapes[i]}`);
  }
  //What shape do you want?
  const shapeIndex = parseInt(await promptUser(`Enter what shape you want, (1-${shapes.shapes.length}): `), 10);
  const shape = shapes.shapes[shapeIndex - 1];

  //shape color
  const shapeColor = await promptUser('Enter the shape color, Please!: ');

  //SVG content for the HTML
  const svgContent = `<svg width="300" height="200">
    <circle cx="150" cy="100" r="100" fill="${shapeColor}" />
    <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="48" fill="${textColor}">${text}</text>
  </svg>`;

  //covets the file to a SVG type file
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
