// added requires needed for node modules
const inquirer = require('inquirer')
const jest = require('jest')
const { writeFile } = require('fs').promises;
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
const Shapes = require('./lib/shapes') // importing shapes.js file

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)

// questions array using inquirer to prompt user with specifics on their logo
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

// template used for response to generate to new svg file
const template = ({ letters, textcolor, shape, shapecolor }) => {
    // Create an instance of the Shapes class
    const shapeInstance = new Shapes(shape, shapecolor);
    // Call the createSvgElement method to get the SVG code
    const shapeSvg = shapeInstance.createSvgElement();
    return `
        <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            ${shapeSvg}
            <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textcolor}">${letters}</text>
        </svg>`;
};

function init() {
    return inquirer.prompt(questions)
        .then((response) => {
            // Create an instance of the Shapes class
            const shapeInstance = new Shapes(response.shape, response.shapecolor);
            // Call the createSvgElement method to get the SVG code
            const shapeSvg = shapeInstance.createSvgElement();
            return writeFile('logo.svg', template({ ...response, newShape: shapeSvg }));
        })
        .then(() => console.log('Generated logo.svg'))
        .catch((err) => console.error(err));
}



// calls function when you run the script in your terminal
init();
