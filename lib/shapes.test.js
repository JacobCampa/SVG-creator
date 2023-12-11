const Shapes = require('./shapes');

// Test for Shapes function
describe('Shapes', () => {
    test('creates a circle SVG element', () => {
        const result = Shapes('circle', 'red');
        expect(result).toBe('<circle cx="150" cy="110" r="80" fill="red" />');
    });

    test('creates a square SVG element', () => {
        const result = Shapes('square', 'blue');
        expect(result).toBe('<rect x="50" y="25" width="200" height="200" fill="blue" />');
    });

    test('creates a triangle SVG element', () => {
        const result = Shapes('triangle', 'green');
        expect(result).toBe('<polygon points="0 200, 300 200, 150 0, 0" fill="green" />');
    });

    test('throws an error for an invalid shape', () => {
        expect(() => Shapes('invalid', 'yellow')).toThrowError('Invalid shape: invalid');
    });
});