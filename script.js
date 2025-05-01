const display = document.querySelector('.display');
const displayedDigits = document.createElement('div');
displayedDigits.classList.add('digits');
display.appendChild(displayedDigits);
displayedDigits.textContent = "123000000000000000000000000000"

const keypad = document.querySelector('.keypad');
const buttonsChars = ['C', '⌫'
                      , 'addition', '7', '8', '9'
                      , 'subtraction', '4', '5', '6'
                      , 'multiplication', '1', '2', '3'
                      , 'division', '0', 'dot', 'equal']

for (let button of buttonsChars) {
    const newButton = document.createElement('button');
    newButton.classList.add('button', button);
    newButton.textContent = button;
    keypad.appendChild(newButton);

    switch (button) {
        case "addition":
            newButton.textContent = '+';
            break;
        case "subtraction":
            newButton.textContent = '-';
            break;
        case "multiplication":
            newButton.textContent = '*';
            break;
        case "division":
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


let number1 = 0;
let number2 = 0;
let operator = '';

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