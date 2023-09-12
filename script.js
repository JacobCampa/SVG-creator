// added requires needed for node modules
const inquirer = require('inquirer')
const jest = require('jest')
const { writeFile } = require('fs').promises;
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')

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
const template = ({ letters, textcolor, newShape, shapecolor }) =>
    `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">

<${newShape} fill="${shapecolor}" />

<text x="150" y="125" font-size="60" text-anchor="middle" fill="${textcolor}">${letters}</text>

</svg>`

// defining the function to start application. used a switch to control the outcome of the shapes produced based on their choice
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
            // writefile function to actually create the file
            writeFile('logo.svg', template({ ...response, newShape }))
        })
        // logging the success or error catch once done
        .then(() => console.log('Generated logo.svg'))
        .catch((err) => console.error(err));
}

// calls function when you run the script in your terminal
init()
