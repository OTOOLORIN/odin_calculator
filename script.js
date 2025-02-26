// references to interactive calculator elements
const calcBtns = document.querySelector('.buttons');
const operationDisplay = document.querySelector('.operation');
const resultDisplay = operationDisplay.nextElementSibling;

// All digits, decimal point, and negation signs ID Values 
const idValues = [
    'one', 'two',
    'three', 'four',
    'five', 'six',
    'seven', 'eight',
    'nine', 'zero',
    'dot', // decimal point
    'negation' // negation sign
]

// operands to store user inputs
let firstOperand = '';
let secondOperands = ''
let operationResult; // result of the operation