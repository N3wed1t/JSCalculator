let firstNumber;
let secondNumber;
let operator;
let historyDis;
let operatorPress = false;
let equalPress = false;
function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a , b){
    return b ? a / b : Infinity;
}

function operate(firstNumber, operator, secondNumber) {
    switch (operator){
        case '+':
            return add(~~firstNumber, ~~secondNumber);
        case '-':
            return subtract(~~firstNumber, ~~secondNumber);
        case 'x':
            return multiply(~~firstNumber, ~~secondNumber);
        case '/':
            return divide(~~firstNumber, ~~secondNumber);
        default:
            return undefined;
    }
}

const result = document.querySelector('.result');
const history = document.querySelector('.history');
const buttons = document.querySelectorAll('.button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.className === 'button operator'){
            switch(button.textContent){
            case 'Del':
                if(operatorPress){
                    history.textContent = '';
                    operatorPress = false;
                }
                else{
                    if(result.textContent != 0)
                        result.textContent = result.textContent.slice(0, -1);
                    if(result.textContent.length === 0)
                        result.textContent = 0;           
                }
                break;
            case 'Clr':
                result.textContent = 0;
                history.textContent = '';
                break;
            case '+':
                firstNumber = result.textContent;
                operator = '+';
                history.textContent = `${firstNumber} + `
                operatorPress = true;
                break;
            case '=':
                secondNumber = result.textContent;
                history.textContent = `${firstNumber} ${operator} ${secondNumber}` ;
                result.textContent = operate(firstNumber, operator, secondNumber);
                // operatorPress = true;
                equalPress = true;
                break;
            }
        }else{
            if(result.textContent === '0' || operatorPress || equalPress){
                result.textContent = button.textContent;
                if(equalPress && !operatorPress){
                    history.textContent = '';
                    equalPress = false;
                }
                operatorPress = false;
            }else{
                result.textContent += button.textContent;
            }
        }
        
    })
});

// make all operator work