
const numDisplayObj = document.querySelector('#numDisplay');
const btnClear = document.querySelector('#btnClear');
const btnOps = document.querySelectorAll('.btnOp');
const btnSingleOps = document.querySelectorAll('.btnSingleOp');
const btnNums = document.querySelectorAll('.btnNum');
const btnEqual = document.querySelector('#btnEqual');
const btnDot = document.querySelector('#btnDot');

let display = '0';
let firstNum = 0;
let secondNum = 0;
let opMemory = '';
let returnMemory = 0;
let equalPressed = false;

for (let btnNum of btnNums) {
    btnNum.addEventListener('click', () => {
        if (equalPressed) {
            display = '0';
            equalPressed = false;
        }
        if (display === '0') {
            display = btnNum.innerText;
        } else {
            display += btnNum.innerText;
        }
        updateDisplay();
    })
}

for (let btnOp of btnOps) {
    btnOp.addEventListener('click', () => {
        if (opMemory === '') {
            firstNum = parseFloat(display);
        } else {
            calculate();
        }
        display = '0';
        opMemory = btnOp.id;
    })
}

for (let btnSingleOp of btnSingleOps) {
    btnSingleOp.addEventListener('click', () => {
        display = singleOp(parseFloat(display), btnSingleOp.id).toString();
        updateDisplay();
    })
}

btnClear.addEventListener('click', () => {
    display = '0';
    firstNum = 0;
    secondNum = 0;
    opMemory = '';
    updateDisplay();
})

btnEqual.addEventListener('click', () => {
    if (opMemory !== '') {
        calculate();
        opMemory = '';
    } else {
        console.log(firstNum);
        console.log(secondNum);
        console.log(opMemory);
    }
    equalPressed = true;

})

btnDot.addEventListener('click', () => {
    if (!display.match('/\d+\.\d*/g')) {
        display += '.';
    }
    updateDisplay();
})

function updateDisplay() {
    numDisplayObj.innerText = display;
}

function calculate() {
    secondNum = parseFloat(display);
    console.log(`${firstNum} ${opMemory} ${secondNum}`);
    switch (opMemory) {
        case 'add':
            returnMemory = firstNum + secondNum;
            break;
        case 'subtract':
            returnMemory = firstNum - secondNum;
            break;
        case 'multiply':
            returnMemory = firstNum * secondNum;
            break;
        case 'divide':
            returnMemory = firstNum / secondNum;
            break;
    }
    firstNum = returnMemory;
    display = returnMemory.toString();
    updateDisplay();
}

function singleOp(num, op) {
    switch (op) {
        case 'toggle':
            return num * -1;
        case 'sqrt':
            return Math.sqrt(num);
        case 'percent':
            return num * 100;
    }
}