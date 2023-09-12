const inquirer = require('inquirer')
const jest = require('jest')
const { writeFile } = require('fs').promises;
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)

const questions = [
    {
        type: "maxlength-input",
        message: "Please input a 3 character abreviation for your logo:",
        maxLength: 3,
        name: "letters"
    },
    {
        type: "input",
        message: "Please choose a color for the text",
        name: "textcolor"
    },
    {
        type: "list",
        message: "Please choose your shape:",
        choices: ["circle", "square", "triangle"],
        name: "shape"
    },
    {
        type: "input",
        message: "Please choose a color for the shape:",
        name: "shapecolor"
    }
];

const template = ({ letters, textcolor, newShape, shapecolor }) =>
    `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

<${newShape} fill="${shapecolor}" />

<text x="150" y="125" font-size="60" text-anchor="middle" fill="${textcolor}">${letters}</text>

</svg>`


function init() {
    return inquirer.prompt(questions)
        .then((response) => {
            const shapeChoice = response.shape
            let newShape = ""
            switch (shapeChoice) {
                case "circle":
                    newShape = `circle cx="150" cy="110" r="80"`
                    break;
                case "square":
                    newShape = `rect x="50" y="25" width="200" height="200"`
                    break;
                case "triangle":
                    newShape = `polygon points="0 200, 300 200, 150 0, 0"`
                    break;
            }
            writeFile('logo.svg', template({ ...response, newShape }))
        })
        .then(() => console.log('Generated logo.svg'))
        .catch((err) => console.error(err));
}

init()










// GIVEN a command-line application that accepts user input
// WHEN I am prompted for text
// THEN I can enter up to three characters
// WHEN I am prompted for the text color
// THEN I can enter a color keyword (OR a hexadecimal number)
// WHEN I am prompted for a shape
// THEN I am presented with a list of shapes to choose from: circle, triangle, and square
// WHEN I am prompted for the shape's color
// THEN I can enter a color keyword (OR a hexadecimal number)
// WHEN I have entered input for all the prompts
// THEN an SVG file is created named `logo.svg`
// AND the output text "Generated logo.svg" is printed in the command line
// WHEN I open the `logo.svg` file in a browser
// THEN I am shown a 300x200 pixel image that matches the criteria I entered