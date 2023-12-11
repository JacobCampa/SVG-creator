function createCircle() {
    return '<circle cx="150" cy="110" r="80" />';
}

function createSquare() {
    return '<rect x="50" y="25" width="200" height="200" />';
}

function createTriangle() {
    return '<polygon points="0 200, 300 200, 150 0, 0" />';
}

module.exports = { createCircle, createSquare, createTriangle };