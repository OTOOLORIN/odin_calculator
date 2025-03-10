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

/*solve an expression with 'equation button' based on current 
 and save result as first operand for reusage: alse update display */
function equate(operation) {
  operationResult = operation(firstOperand, secondOperand);
  let resultFormatted = Number(operationResult).toLocaleString();
  firstOperand = operationResult.toString();
  secondOperand = '';
  currentOperator = '';
 firstOperandDisplay.textContent = firstOperand;
  secondOperandDisplay.textContent = secondOperand;
  resultDisplay.value = resultFormatted;
  operatorBox.textContent = currentOperator;
}

// reset the entire screen, defaulting back to only Zero on display
function reset() {
  operationResult = '';
  firstOperand = '0';
  secondOperand = '';
  currentOperator = '';
  nextOperator = '';
  firstOperandDisplay.textContent = firstOperand;
  secondOperandDisplay.textContent = secondOperand;
  operatorBox.textContent = '';
  resultDisplay.value = '';
}


/* A criteria to decide if an operation in possible based
on opernds provides */
function isNumsValid(first, second) {
  if (first === '-0.' || first === '0.' || 
     second === '-0.'  || second === '0.' || 
     first == ''
  ) return false;

 return true;
}

/* If on operand reaches 15 digits, stop receiving input
  if the operand is floating point and decimal numbers are
  10 in total, stop receiving input
*/
function numberLimit(num) {
  if (num.length >= 15 && ((!num.includes('.')) && (!num.includes('-')))) return true;
  if (num.length >= 17 && num.includes('-') && num.includes('.')) return true;
  if (num.length >= 16 && (num.includes('.') || num.includes('-'))) return true
  if (num.includes('.')) {
    const decimals = num.slice(num.indexOf('.')+1);
    if (decimals.length == 10) {
      return true;
    }
  } 
}

/* reduce font of the display when operands get
large to a certain level, increase the font again
as numbers get small to a certain level*/
function reduceFont(firstNumber, secondNumber=secondOperand, 
  operandDisplay=firstOperandDisplay,
  secondDisplay=secondOperandDisplay) {
let displayClasses = Array.from(operandDisplay.classList);
if ((firstNumber.length < 12 ) && (secondNumber.length < 12) && (displayClasses.includes('small-font'))) {
operandDisplay.classList.remove('small-font');
secondDisplay.classList.remove('small-font');
return;
}
if ((firstNumber.length >= 12) && (!displayClasses.includes('small-font'))) {
operandDisplay.classList.add('small-font');
secondDisplay.classList.add('small-font');
}

}

/* handle operation as each major arithmetic
operation button is pressed */
function operationsHandler(e, operator) {
  // DO NOT make any operations is operands are invalid
  if (!isNumsValid(firstOperand, secondOperand)) return;

  // when we have an operator already, calculate in place
  if (firstOperand && secondOperand) {
    nextOperator = operator;
    inPlace(e);
    return;
  }
  // add operator to the expression
  currentOperator = operator;
  operatorBox.textContent = e.target.textContent; 
}


/* handle decimal input: only allow one decimal input
  only add decimal point when there's room
*/
function decimalHandler() {
  if (!currentOperator) {
    if (firstOperand.includes('.')) return;
    if (firstOperand.length == 16 && (!firstOperand.includes('.'))) return;
    if (firstOperand.length !== 15) firstOperand += '.';
    firstOperandDisplay.textContent = firstOperand;
    return;
  }

  if (!secondOperand) {
    secondOperand = '0.'
    secondOperandDisplay.textContent = secondOperand;
    return;
  };
  if (secondOperand.includes('.')) return;
  secondOperand += '.';
  secondOperandDisplay.textContent = secondOperand;
}

/* Change the sign of a number:
   negate it when it is positive,
   denegate if when it is negative
*/
function negationHandler() {
  if (!currentOperator) {
    if (firstOperand.includes('-')) {
      firstOperand = firstOperand.slice(1);
    } else {
      firstOperand = '-' + firstOperand;
    }
    firstOperandDisplay.textContent = firstOperand;
    return;
  }
  if (secondOperand.includes('-')) {
    secondOperand = secondOperand.slice(1);
  } else {
    secondOperand = '-' + secondOperand;
  }
  secondOperandDisplay.textContent = secondOperand;
}

/* the percentage operation 
  is done on the operand immediately
  the button is clicked.
*/
function percentHandler() {
  if ((firstOperand) && (!secondOperand)) {
    firstOperand = percent(firstOperand).toString();
    firstOperandDisplay.textContent = firstOperand;
  }

  if (secondOperand) {
    secondOperand = percent(secondOperand).toString();
    secondOperandDisplay.textContent = secondOperand;
  }
}

// solve an expression as regards to the current operator
function equateHandler() {
  // this button only activates then we have a complate expression
  if(firstOperand && secondOperand) {
    equateSign = '=';
    switch (currentOperator) {
      case '+':
        equate(add);
        break;
      case '-':
        equate(subtract);
        break;
      case 'x':
        equate(multiply);
        break;
      case '/':
        equate(divide);
        break;
    }
  }
}

// undo a last action with the delete button
function deleteHandler() {
  if (secondOperand) {
    secondOperand = secondOperand.substring(0, secondOperand.length-1);
    secondOperandDisplay.textContent = secondOperand;
    return;
  }
  if (currentOperator) {
    currentOperator = '';
    operatorBox.textContent = currentOperator;
    return;
  }

  if ((firstOperand)) {
    // reset display to zero when there's only one digit
    if (firstOperand.length == 1) {
      firstOperand = '0';
      firstOperandDisplay.textContent = firstOperand;
      return;
    }
    firstOperand = firstOperand.substring(0, firstOperand.length-1);
    firstOperandDisplay.textContent = firstOperand;
  }
}

// handle all digits input
function digitsHandler(btn, btnText) {
  // first operand comes efore an operator
  if (!currentOperator) {
    if(numberLimit(firstOperand)) return; // do not accept numbers that are too large/small
    /* erase old result as a digit is pressed and replace with the digit inputed,
     indicates the user does not want to reuse the value */
    if (equateSign) {
      firstOperand = btnText;
      equateSign = '';
      firstOperandDisplay.textContent = firstOperand;
      resultDisplay.value = '';
      return;
    }
    if ((btnText == '0' && firstOperand == '0')) return;
    if (firstOperand == '-0' && btn == 'zero') return;

    if (firstOperand == '0' && btnText !== '0') {
      firstOperand = btnText;
    } else if (firstOperand == '-0' && btn !== 'zero') firstOperand = '-' + btnText;
     else firstOperand += btnText;
  }

  // second operand becomes existence when there's an operator
  if (currentOperator) {
    if(numberLimit(secondOperand)) return;
    if ((btnText == '0' && secondOperand == '0')) return;

    if (secondOperand == '-0' && btn == 'zero') return;
    if (secondOperand == '-0' && btn !== 'zero') {secondOperand = '-' +btnText;}
    else if (btnText !== '0' && secondOperand == '0') {
      secondOperand = btnText;
      secondOperandDisplay.textContent = secondOperand;
      return secondOperand;
    }
    else secondOperand += btnText;
  }
  secondOperandDisplay.textContent = secondOperand;
  firstOperandDisplay.textContent = firstOperand;
}

// listen for major operations click
addBtn.addEventListener('click', (e) => {
  operationsHandler(e, '+');
}
)
subBtn.addEventListener('click', (e) => {
  operationsHandler(e, '-');
})
mulBtn.addEventListener('click', (e) => {
  operationsHandler(e, 'x');
})
divBtn.addEventListener('click', (e) => {
  operationsHandler(e, '/');
})

// listen for other operations
decimalBtn.addEventListener('click', decimalHandler);
signBtn.addEventListener('click', negationHandler);
percentBtn.addEventListener('click', percentHandler);
equalBtn.addEventListener ('click', equateHandler);
deleteBtn.addEventListener('click', deleteHandler);
clearBtn.addEventListener('click', () => reset());

// all digits listener
allBtns.addEventListener('click', (e) => {
  reduceFont(firstOperand);
  reduceFont(secondOperand,firstOperand, secondOperandDisplay, firstOperandDisplay);
  const btn = e.target.id;
  const btnText = e.target.textContent;
  if (numbers.includes(btn)) {
    digitsHandler(btn, btnText);
  }
})