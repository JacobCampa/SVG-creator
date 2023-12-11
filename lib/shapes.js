function createShape(shape, shapecolor) {
    switch (shape) {
        case "circle":
            return `<circle cx="150" cy="110" r="80" fill="${shapecolor}" />`;
        case "square":
            return `<rect x="50" y="25" width="200" height="200" fill="${shapecolor}" />`;
        case "triangle":
            return `<polygon points="0 200, 300 200, 150 0, 0" fill="${shapecolor}" />`;
        default:
            throw new Error(`Invalid shape: ${shape}`);
    }
}

module.exports = createShape;