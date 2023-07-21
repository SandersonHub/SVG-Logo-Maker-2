// Node
const inquirer = require('inquirer');
// Filesystem
const fs = require('fs');
// Imported from the shapes directory
const shapes = require('./lib/shapes');

//displays the user with a quesiton
function promptUser(question) {
  //calls the array within the quesiton
  return inquirer.prompt([
    {
      //type, text input from the user
      type: 'input',
      //will info will be stored
      name: 'input',
      message: question,
    },
    //this is a callback to the function / where the info goes
  ]).then((answers) => answers.input);
}

function generateLogo() {
  let text, textColor, shapeIndex, shape, shapeColor;

  //prompts the user of the question below
  promptUser('Put in three characters of your choice: ')
  //then code will be executed
    .then((userInput) => {
      //user input
      text = userInput;
      //this will return what the user typed in
      return promptUser('Pick a text color: ');
    })
    .then((colorInput) => {
      textColor = colorInput;
      console.log('Choose a shape:');
      for (let i = 0; i < shapes.shapes.length; i++) {
        console.log(`${i + 1}. ${shapes.shapes[i]}`);
      }
      return promptUser(`Enter what shape you want, (1-${shapes.shapes.length}): `);
    })
    .then((shapeIndexInput) => {
      shapeIndex = parseInt(shapeIndexInput, 10);
      shape = shapes.shapes[shapeIndex - 1];
      return promptUser('Enter the shape color, Please!: ');
    })
    .then((shapeColorInput) => {
      shapeColor = shapeColorInput;
      //logs the message into the console.log if it worked
      console.log('Logo generation completed.');

      // SVG content for the HTML
      let svgContent;

      // Changed how shapes are input, will output an SVG.
      //Switch is used to check the the shapes and will go to a different code block if it doesn't meet
      //Case handles the shape. In this case it would be tringle, square or circle
      //break, will be "break" essentially into the next case.
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
          return;
      }

      // Convert the file to an SVG type file
      writeToFile('logo.svg', svgContent);
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
}
//writes the text to the filesystem
function writeToFile(filename, content) {
  fs.writeFile(filename, content, (err) => {
    //will check if an error was made
    if (err) {
      console.error(`Error creating ${filename}:`, err);
    } else {
      console.log(`Generated ${filename}`);
    }
  });
}
//generates the logo
generateLogo();
