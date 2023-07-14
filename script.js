const calculatorDisplay =  document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0; // number zero not string remember
let operatorValue = '';
let awaitingNextValue = false;


function sendNumberValue(number){
   //replace current display value if first value is entered
   if(awaitingNextValue === true){
      calculatorDisplay.textContent = number;
      awaitingNextValue = false;
   }else {
     //if current display value is zero replace, if not add number
     const displayValue = calculatorDisplay.textContent;
     calculatorDisplay.textContent = displayValue ==='0' ? number : displayValue + number;
   }

}

function addDecimal(){
    //if operator pressed, dont add decimal
    if(awaitingNextValue) return;
    //if no decimal add one
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`
    }
}

//calculate first and second value based on operator
const calculate = { //an object
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (secondNumber) => secondNumber,

};


function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    //prevent multiple operators
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    }
    //assign first value if no value exist 
    if(!firstValue){
        firstValue = currentValue;
    }else{
        console.log(firstValue, operatorValue, currentValue);
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        console.log('calculation', calculation);
        firstValue = calculation;
    }
    //ready for next value, stor operator
    awaitingNextValue = true;
    operatorValue = operator; 
    //console.log('firstvalue', firstValue);
    //console.log('operator', operator);
}



// add event listeners for number, operators, decimal buttons
inputBtns.forEach((inputBtn =>{
     if (inputBtn.classList.contains("number") ){
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
     }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
     }
     else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click', () =>  addDecimal() );
     }
}));

//reset all values, display
function resetAll(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

//event listener
clearBtn.addEventListener('click', resetAll); 
