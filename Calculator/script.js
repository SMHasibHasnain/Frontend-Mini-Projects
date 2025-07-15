const buttons = document.querySelectorAll("button");
const showCalc = document.querySelector(".calc");
const showHistory = document.querySelector("p");
const calcStack = [];
const btnNmbrs = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
let calcStr = "";
let stateFlag = false;


buttons.forEach( button => {
  const btnSound = new Audio("./audio/btn.mp3");
  btnSound.volume = 1.0;
  button.addEventListener("mousedown", () => {
    btnSound.play();
    button.classList.add("btn-clicked");
    getInput(button.value);
  });  
  button.addEventListener("mouseup", () => {
    button.classList.remove("btn-clicked");
  });  
  button.addEventListener("touchstart", () => {
    btnSound.play();
    button.classList.add("btn-clicked");
  });  
  button.addEventListener("touchend", () => {
    button.classList.remove("btn-clicked");
  });  
});



function getInput(value) {

  if (value == "%") {
    showCalc.value = showCalc.value.slice(0, -1);
  
    if (calcStr.length > 0) {
      calcStr = calcStr.slice(0, -1);
    } else if (calcStack.length > 0) {
      const last = calcStack.pop();
      if (!["+", "-", "*", "/"].includes(last)) {
        calcStr = last.toString().slice(0, -1); //
      }
    }
    return;
  }
  

  if (stateFlag == true && !["+", "-", "*", "/"].includes(value)) {
    refresh();
    calcStack.shift();
    console.log(calcStack);
  }

  stateFlag = false;

  if(value == "=") {
    calcStack.push(calcStr);
    console.log(calcStack);
    calcStr = "";
    const x = showCalc.value;
    showCalc.value = "";
    doCalculate();
    showHistory.innerText = x;
  } else if(value == "*" || value == "+" || value == "-" || value =="/"){
    if (calcStr != "") {
      calcStack.push(calcStr);
      calcStr = "";
    }
    calcStr = "";
    calcStack.push(value);
    showCalc.value += value;
  } else if(value == "C") {
    refresh();
    calcStack.splice(0, calcStack.length);
    showHistory.innerText = "";
  } else {
    showCalc.value += value;
    calcStr += value;
  }
}

function refresh() {
  calcStr = "";
  showCalc.value = "";
}

function doCalculate() {
  console.log(calcStack);

  let cal = 0;
  let calType = "";
  
  for(let i=0; i<calcStack.length; i++) {
    let element = calcStack[i];
    if(!isNaN(element) && !["+", "-", "*", "/"].includes(element)) {
      console.log("element" + element);
      if(calType == "+") {
        cal += Number(element);
      } else if(calType == "-") {
        cal -= Number(element);
      } else if(calType == "/") {
        cal /= Number(element);
      } else if(calType == "*") {
        cal *= Number(element);
      } else {
        cal = Number(element);
      }
    } else {
      calType = element;
    }
  }
  
  showCalc.value = cal.toPrecision(5);
  calcStack.splice(0, calcStack.length, cal);

  stateFlag = true;
}
