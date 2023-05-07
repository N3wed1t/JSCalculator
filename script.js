let firstNumber;
let secondNumber;
let operator;
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
            return Math.round(add(firstNumber - 0, secondNumber - 0) * 1000) / 1000;
        case '-':
            return Math.round(subtract(firstNumber - 0, secondNumber - 0) * 1000) / 1000;
        case 'x':
            return Math.round(multiply(firstNumber - 0, secondNumber - 0) * 1000) / 1000;
        case '/':
            return Math.round(divide(firstNumber - 0, secondNumber - 0) * 1000) / 1000;
        default:
            return undefined;
    }
}

function calculateNumber(option) {
    if(operatorPress){
        firstNumber = history.textContent.split(' ')[0]
        secondNumber = result.textContent;
        history.textContent = result.textContent === '0' ?  `${history.textContent.split(' ')[0]} ${option}`
            : `${operate(firstNumber, operator, secondNumber)} ${option}`;
        operator = option;
    }else{
        operator = option;
        history.textContent = `${result.textContent} ${option} `;
    }
    result.textContent = '0';
    operatorPress = true;
    equalPress = false;
}

const result = document.querySelector('.result');
const history = document.querySelector('.history');
const buttons = document.querySelectorAll('.button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.className === 'button operator'){
            switch(button.textContent){
            case 'Del':
                if(equalPress){
                    history.textContent = '';
                }
                else{
                    if(result.textContent != 0)
                        result.textContent = result.textContent.slice(0, -1);
                    if(result.textContent.length === 0)
                        result.textContent = 0;           
                }
                break;
            case 'C':
                result.textContent = 0;
                history.textContent = '';
                firstNumber = 0;
                secondNumber = 0;
                break;
            case 'CE':
                result.textContent = 0;
                if(equalPress){
                    history.textContent = '';
                    equalPress = false;
                }
                break;
            case '+':
                calculateNumber('+');
                break;
            case '-':
                calculateNumber('-');
                break;
            case 'x':
                calculateNumber('x');
                break;
            case '÷':
                calculateNumber('/');
                break;
            case '=':
                if(result.textContent === '0'|| equalPress) break;
                firstNumber = history.textContent.split(' ')[0]
                secondNumber = result.textContent;
                history.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
                result.textContent = operate(firstNumber, operator, secondNumber);
                operatorPress = false;
                equalPress = true;
                break;
            }
        }else{
            if(result.textContent === '0' || equalPress){
                if(button.textContent === '.'){
                    result.textContent = '0.';
                }else{
                    result.textContent = button.textContent;
                }
                if(equalPress){
                    history.textContent = '';
                    equalPress = false;
                }
            }else{
                if(!result.textContent.includes('.') || button.textContent !== '.'){
                    result.textContent += button.textContent;
                }
            }
        }
        
    })
});

// + หลังจากเท่ากับแล้ว history หาย