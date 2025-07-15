const buttons = document.querySelectorAll("button");
const showCalc = document.querySelector(".calc");
const showHistory = document.querySelector("p");
const calcStack = [];
let calcStr = "";
let y;


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
  if(value == "=") {
    calcStack.push(calcStr);
    calcStr = "";
    const x = showCalc.value;
    showCalc.value = "";
    doCalculate();
    showHistory.innerText = x;
  } else if(value == "*" || value == "+" || value == "-" || value =="/" || value=="%"){
    calcStack.push(calcStr);
    calcStr = "";
    calcStack.push(value);
    showCalc.value += value;
  } else if(value == "C") {
    calcStack.splice(0, calcStack.length);
    calcStr = "";
    showCalc.value = "";
    showHistory.innerText = "";
  } else {
    showCalc.value += value;
    calcStr += value;
  }
}

function doCalculate() {

  console.log(calcStack);

  let cal = 0;
  let calType = "";
  
  calcStack.forEach(element => {
    if(element >= 0 || element <=9) {
      if(calType == "+") {
        cal += Number(element);
      } else if(calType == "-") {
        cal -= Number(element);
      } else if(calType == "/") {
        cal /= Number(element);
      } else if(calType == "*") {
        cal *= Number(element);
      } else if(calType == "%") {
        cal = Number(element) % cal;
      } else {
        cal = Number(element);
      }
    } else {
      calType = element;
    }
  });

  showCalc.value = cal;
  console.log(showCalc.value);
}
