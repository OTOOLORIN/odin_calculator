// references to interactive calculator elements
const calcBtns = document.querySelector('.buttons');
const operationDisplay = document.querySelector('.operation');
const resultDisplay = operationDisplay.nextElementSibling;

// map all numeral buttons to their values
const numerals = {
    one: 1, two: 2,
    three: 3, four: 4,
    five: 5, six: 6,
    seven: 7, eight: 8,
    nine: 9, zero: 0,
    dot: '.', // decimal point
    negation: '-' // negation sign
}

// operands to store user inputs
let firstOperand = '';
let secondOperands = ''
let operationResult; // result of the operation