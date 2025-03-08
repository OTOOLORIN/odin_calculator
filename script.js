// references to DOM elements
const firstOperandDisplay = document.querySelector('.first-operand');
const secondOperandDisplay = document.querySelector('.second-operand');
const operatorBox = document.querySelector('.operator');
const addBtn = document.querySelector('.add');
const subBtn = document.querySelector('.subtract');
const divBtn = document.querySelector('.divide');
const mulBtn = document.querySelector('.multiply');
const percentBtn = document.querySelector('.percent');
const resultDisplay = document.querySelector('.result');
const signBtn = document.querySelector('#negation');
const decimalBtn = document.querySelector('#dot');
const allBtns = document.querySelector('.buttons');
const clearBtn = document.querySelector('.clear');
const equalBtn = document.querySelector('#equal');
const deleteBtn = document.querySelector('#delete');

const numbers = [
  'one', 'two', 'three',
  'four', 'five', 'six',
  'seven', 'eight', 'nine',
  'zero'
]

let firstOperand = '0';
let secondOperand = '';
let currentOperator = '';
let nextOperator = '';
let operationResult = '';
let equateSign;

// initialize screen to display 0
firstOperandDisplay.textContent = firstOperand;

// all operation functions
function add(a, b) {
  a = Number(a);
  b = Number(b);

  result = (a+b).toFixed(2);
  return Number(result);;
}

function subtract(a, b) {
  a = Number(a);
  b = Number(b);

  result = (a-b).toFixed(2);
  return Number(result);
}

function multiply(a, b) {
  a = Number(a);
  b = Number(b);

  result = (a*b).toFixed(2);
  return Number(result);
}

function divide(a, b) {
  a = Number(a);
  b = Number(b);
  result = (a/b).toFixed(2);
  return Number(result);
}

// only the percentage of just one number
function percent(num) {
  num = Number(num);
  return num / 100;
}
/*
  Do not allow chaining operations, as a second operation
  is inputed by the user, perform a calculation in place based on
  the current operator.
*/
function calculateInPlace(operation, e) {
  operationResult = operation(firstOperand, secondOperand);
  let resultFormatted = Number(operationResult).toLocaleString();
  firstOperand = operationResult.toString();
  secondOperand = '';
  currentOperator = nextOperator;
  firstOperandDisplay.textContent = firstOperand;
  secondOperandDisplay.textContent = secondOperand;
  resultDisplay.value = resultFormatted;
  operatorBox.textContent = e.target.textContent;
}


// perform the calculationnnn in place, using the appropriate current operator
function inPlace(e) {
  switch (currentOperator) {
    case '+':
      calculateInPlace(add, e);
      break;
    case '-':
      calculateInPlace(subtract, e);
      break;
    case 'x':
      calculateInPlace(multiply, e);
      break;
    case '/':
      if (secondOperand === '0') {
        reset();
        alert(`You cannot divide a number by zero!`);
        return; 
      }
      calculateInPlace(divide, e);
      break;
  }
}