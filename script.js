const display = document.querySelector('.display');
const displayedDigits = document.createElement('div');
displayedDigits.classList.add('digits');
display.appendChild(displayedDigits);
displayedDigits.textContent = "0";

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
                                                    if (displayedDigits.textContent == '0') {
                                                        displayedDigits.textContent = event.target.textContent
                                                    } else {
                                                    displayedDigits.textContent += event.target.textContent}
}))

buttonZero.addEventListener('click', event => {
    if (displayedDigits.textContent == '0') {
        return;
    } else { displayedDigits.textContent += event.target.textContent}
})

let operator = '';
let num1 = 0;
let num2 = 0;

buttonsOperators.forEach(button => button.addEventListener('click', event => {
    if (operator.length === 0) {
        operator = event.target.textContent;
        num1 = Number.parseInt(displayedDigits.textContent)};
        displayedDigits.textContent = "0";
    
}))

buttonEqual.addEventListener('click', () => {
    num2 = Number.parseInt(displayedDigits.textContent);
    displayedDigits.textContent = operate(num1, num2, operator);
    operator = '';
    num1 = displayedDigits.textContent;
    num2 = 0;
})

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
    return num1 / num2;
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

    return operation(num1, num2);

}