class Shapes {
    constructor(shapeType, shapecolor) {
        this.shapeType = shapeType;
        this.shapecolor = shapecolor;
    }

    createSvgElement() {
        switch (this.shapeType) {
            case 'circle':
                return `<circle cx="150" cy="110" r="80" fill="${this.shapecolor}" />`;
            case 'square':
                return `<rect x="50" y="25" width="200" height="200" fill="${this.shapecolor}" />`;
            case 'triangle':
                return `<polygon points="0 200, 300 200, 150 0, 0" fill="${this.shapecolor}" />`;
            default:
                throw new Error(`Invalid shape: ${this.shapeType}`);
        }
    }
}

module.exports = Shapes;