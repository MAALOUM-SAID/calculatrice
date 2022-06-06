let boxNumbers=document.getElementsByClassName('box-number');
let boxNumbersOp=document.getElementsByClassName('box-number-op');
let header=document.getElementsByClassName('header');
let equale=document.getElementsByClassName('box-equale');
let ac=document.querySelector('.box-ac');
let previeusNumber="";
let currentNumber="";
let operator="";
let result="";
let zeroDivisionError="Cannot Devide By Zero";
for (const boxNumber of boxNumbers) {
    boxNumber.addEventListener("click",(event)=>{
        currentNumber+=boxNumber.getAttribute("data-value");
        header[0].textContent=currentNumber;
        for (const op of boxNumbersOp) {
            op.onclick=function (event){
                previeusNumber=currentNumber;
                header[0].textContent="";
                currentNumber="";
                operator=op.getAttribute("data-value");
            }
        }
    });
}
// equal action 
// mouse click
equale[0].addEventListener("click",function (event) {
    calculate(previeusNumber,currentNumber,operator,header[0]);
});
// ac action
// mouse click
ac.addEventListener("click",function () {
    intialValues();
}); 
function intialValues() {
    previeusNumber="";
    currentNumber="";
    operator="";
    header[0].textContent="";
}
function initialPrevieusNumber(op) {
    switch (op) {
        case "*":
            previeusNumber="1";
            break;
        case "/":
        case "+":
        case "-":
            previeusNumber="0";
            break;
        }
    return previeusNumber;
}
function sum(currValue,prValue) {
    return parseFloat(currValue)+parseFloat(prValue);
}
function sub(currValue,prValue) {
    return parseFloat(currValue)-parseFloat(prValue);
}
function mul(currValue,prValue) {
    return parseFloat(currValue)*parseFloat(prValue);
}
function div(currValue,prValue,header) {
    if (currValue=="0") {
        header.textContent=zeroDivisionError;
        previeusNumber="";
        currentNumber="";
        return;
    }
    return parseFloat(currValue)/parseFloat(prValue);
}
function calculate(currValue,prValue,op,header) {
    switch (op) {
        case "+":
            header.textContent=sum(currValue,prValue);
            previeusNumber=sum(currValue,prValue);
            break;
        case "-":
            header.textContent=sub(currValue,prValue);
            previeusNumber=sub(currValue,prValue);
            break;
        case "*":
            header.textContent=mul(currValue,prValue);
            previeusNumber=mul(currValue,prValue);
            break;
        case "/":
            header.textContent=div(currValue,prValue,header);
            previeusNumber=div(currValue,prValue);
            break;
    }
}

// keyBoardActions 
document.addEventListener("keypress",function (event) {
    const nomTouch=event.key;
    if(!isNaN(parseInt(nomTouch)) || nomTouch==="."){ 
        currentNumber+=nomTouch;
        header[0].textContent=currentNumber;
    }else{
        switch (nomTouch) {
            case "=":
                calculate(previeusNumber,currentNumber,operator,header[0]);
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                previeusNumber=currentNumber;
                header[0].textContent="";
                currentNumber="";
                operator=nomTouch;
                break;
            default:
                event.preventDefault();
        }
    }
});
