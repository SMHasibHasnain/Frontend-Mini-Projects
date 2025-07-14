const buttons = document.querySelectorAll("button");

buttons.forEach( button => {
  const btnSound = new Audio("./audio/btn.mp3");
  button.addEventListener("mousedown", () => {
    btnSound.play()
    button.classList.add("btn-clicked");
  });  
  button.addEventListener("mouseup", () => {
    button.classList.remove("btn-clicked");
  });  
  button.addEventListener("touchstart", () => {
    btnSound.play()
    button.classList.add("btn-clicked");
  });  
  button.addEventListener("touchend", () => {
    button.classList.remove("btn-clicked");
  });  
});

// for(let i=0; i<buttons.length; i++) {
  
//   buttons[i].addEventListener("click", () => btnSound.play());
// }