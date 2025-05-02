const display = document.querySelector('.display');
const displayedDigits = document.createElement('div');
displayedDigits.classList.add('digits');
display.appendChild(displayedDigits);

let operator = '';
let num1 = "0";
let num2 = null;

updateDisplayedDigits();

const keypad = document.querySelector('.keypad');
const buttonsChars = ['C', '⌫'
    , 'add', 7, 8, 9
    , 'subtract', 4, 5, 6
    , 'multiply', 1, 2, 3
    , 'divide', 0, 'dot', 'equal']
    
for (let button of buttonsChars) {
    const newButton = document.createElement('button');
    newButton.classList.add('button', button);
    newButton.textContent = button;
    keypad.appendChild(newButton);
    
    switch (button) {
        case "add":
            newButton.textContent = '+';
            break;
        case "subtract":
            newButton.textContent = '-';
            break;
        case "multiply":
            newButton.textContent = '*';
            break;
        case "divide":
            newButton.textContent = '/';
            break;
        case "dot":
            newButton.textContent = '.';
            break;
        case "equal":
            newButton.textContent = '=';
            break;
}
}

const buttonsArr = Array.from(document.querySelectorAll('.button'));
const buttonsFromOneToNine = buttonsArr
                                .filter(button => Number.isInteger(
                                    Number.parseInt(button.textContent)) && 
                                    Number.parseInt(button.textContent) !=  0);
const buttonZero = buttonsArr.find(button => button.textContent == '0');
const buttonsOperators = buttonsArr.filter(button => button.textContent == '+' 
                                                  || button.textContent == '-' 
                                                  || button.textContent == '*' 
                                                  || button.textContent == '/')
const buttonEqual = buttonsArr.find(button => button.textContent == '=');
const buttonDot = buttonsArr.find(button => button.textContent == '.');
const buttonC = buttonsArr.find(button => button.textContent == 'C');
const buttonBackspace = buttonsArr.find(button => button.textContent == '⌫');

buttonsFromOneToNine.forEach(button => button.addEventListener('click', event => {
    pressAButtonFromOneToNine(event);
    return;
}))

buttonZero.addEventListener('click', pressButtonZero);

buttonsOperators.forEach(button => button.addEventListener('click', event => {
    selectOperator(event);
    return;  
}))

buttonEqual.addEventListener('click', getResult);

buttonC.addEventListener('click', clearMemory);

buttonDot.addEventListener('click', addDecimalDot);

buttonBackspace.addEventListener('click', deleteLastDigit);

document.addEventListener('keyup', event => {
    switch (event.key) {
        case '9':
            pressAButtonFromOneToNine(event);
            break;
        case '8':
            pressAButtonFromOneToNine(event);
            break;
        case '7':
            pressAButtonFromOneToNine(event);
            break;
        case '6':
            pressAButtonFromOneToNine(event);
            break;
        case '5':
            pressAButtonFromOneToNine(event);
            break;
        case '4':
            pressAButtonFromOneToNine(event);
            break;
        case '3':
            pressAButtonFromOneToNine(event);
            break;
        case '2':
            pressAButtonFromOneToNine(event);
            break;
        case '1':
            pressAButtonFromOneToNine(event);
            break;
        case '0':
            pressButtonZero();
            break;
        case '+':
            selectOperator(event);
            break;
        case '-':
            selectOperator(event);
            break;
        case '*':
            selectOperator(event);
            break;
        case '/':
            selectOperator(event);
            break;
        case 'Enter':
            getResult()
            break;
        case '.':
            addDecimalDot();
            break;
        case 'c':
            clearMemory();
            break;
        case 'Backspace':
            deleteLastDigit();
            break;
    }
    return;
})

function pressAButtonFromOneToNine(event) {
    let buttonNumber = event.type == 'click' ? event.target.textContent : event.key;
    switch (getOperatorInstruction()) {
        case "Operator selected":
            if (num2 == null || num2 == "0") {
                num2 = buttonNumber;
            } else {
                num2 += buttonNumber;
            }
            break;
        // Taking advantage of the fall-through property of switch statements. 
        // We need to clearMemory if we don't want to iterate with the result of previous calculation.
        case "Result": 
            clearMemory();
        case "No operator selected":
            if  (num1 == "0" || num1 == 'ERR0R!') {
                num1 = buttonNumber;
            } else {
                num1 += buttonNumber;
            }
            break;

    }
    updateDisplayedDigits();
}

function pressButtonZero() {
    let buttonZero = "0";
    switch (getOperatorInstruction()) {
        case "Operator selected":
            if (num2 == null || num2 == 0) {
                num2 = buttonZero;
            } else {
                num2 += buttonZero;
            }
            break;
        case "Result": 
            clearMemory();
        case "No operator selected":
            if  (num1 == 0) {
                break;
            } else {
                num1 += buttonZero;
            }
            break;
    }
    updateDisplayedDigits();
}

function selectOperator(event) {
    let instruction = getOperatorInstruction();
    if (instruction == 'No operator selected' || instruction == 'Result') {
        operator = event.type == 'click' ? event.target.textContent : event.key;
        num1 = Number.parseFloat(displayedDigits.textContent)};
}

function getResult() {
    if (getOperatorInstruction() == "Operator selected" && num2 != null) {
        num2 = Number.parseFloat(displayedDigits.textContent);
        displayedDigits.textContent = operate(num1, num2, operator);
        operator = 'displayingResult';
        num1 = displayedDigits.textContent;
        num2 = null;

        return;
}}

function addDecimalDot() {
    let decimalDot = ".";
    switch (getOperatorInstruction()) {
        case "Operator selected":
            if (num2 == null || checkAlreadyFloat(num2)) {
                break;
            } else {
                num2 += decimalDot;
            }
            break;
        case "Result": 
            clearMemory();
            break; // We don't want to add a dot directly to the new num1, so we break the switch statement instead of letting fall-through
        case "No operator selected":
            if (checkAlreadyFloat(num1)) {
                break;
            } else {
                num1 += decimalDot;
            }
            break;
    }
    updateDisplayedDigits();
    return;
}

function deleteLastDigit() {
    switch (getOperatorInstruction()) {
        case "Operator selected":
            if (!num2) {
                break;
            } else if (num2.length == 1) {
                num2 = "0";
                break;
            } else {
                num2 = [...num2];
                num2.pop();
                num2 = num2.join('');
                break;
            }
        case "Result":
            clearMemory();
            break;
        case "No operator selected":
            if (num1.length == 1) {
                num1 = "0";
                break;
            } else {
                num1 = [...num1];
                num1.pop();
                num1 = num1.join('');
            }
    }
    updateDisplayedDigits();
    return;
}

function checkAlreadyFloat(num) {
    return num.toString().includes('.');
}

function clearMemory() {
    operator = '';
    num2 = null;
    num1 = "0";

    updateDisplayedDigits();

    return;
}

function getOperatorInstruction() {
    switch (operator.length) {
        case 0:
            return "No operator selected";
        case 1:
            return "Operator selected";
        case 16:
            return "Result";
    }
}

function updateDisplayedDigits() {
    
    displayedDigits.textContent = num2 === null ? num1 : num2;
    return;
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    result = num2 != 0 ? num1 / num2 : 'ERR0R!';
    return result;
}

function operate(num1, num2, operator) {
    
    let operation;
    switch (operator) {
        case '+':
            operation = add;
            break;
        case '-':
            operation = subtract;
            break;
        case '*':
            operation = multiply;
            break;
        case '/':
            operation = divide;
            break;
    }

    result = operation(num1, num2);
    
    switch (Number.isInteger(result) || result == 'ERR0R!'){
        case true:
            return result;
        case false:
            return result.toFixed(2);
    }

}