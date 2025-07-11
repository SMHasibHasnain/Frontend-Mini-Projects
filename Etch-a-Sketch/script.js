let pencil = true;
const pencilTool = document.querySelector(".pencil-tool");
let eraser = false;
const eraserTool = document.querySelector(".eraser-tool");
let color= "black";
const manualColorInput = document.querySelector(".color");

let autoColor = false;
const autoColorButton = document.querySelector(".auto-color-button");

let mode = "normal";
const modeNormal = document.querySelector(".mode-normal");
const modeMagic = document.querySelector(".mode-magic");

const canvas = document.querySelector(".canvas");

let gridSize = 16;
let gridUnits;

makeGrid();

function makeGrid() {
    for (let i = 0; i < gridSize; i++) {
        for(let j = 0; j < gridSize; j++) {
            let pixel = document.createElement("div");
            canvas.append(pixel);
            pixel.style.height = `${100/gridSize}%`;
            pixel.style.width = `${100/gridSize}%`;
            pixel.classList.add("pixel");
        }
    }
    gridUnits = document.querySelectorAll(".pixel");
}

applyNormalMode();

function applyNormalMode() {
    for(let i=0; i<gridUnits.length; i++) {
        gridUnits[i].addEventListener("click", ()=>{
            if(pencil == true) {
                if(autoColor == true) {
                    color = takeRandomColor();
                }
                gridUnits[i].style.backgroundColor = color;
            } else if (eraser == true) {
                gridUnits[i].style.backgroundColor = "transparent";
            }
        });      
    }
}

function removeAllListeners(element) {
    const newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);
    return newElement;
}

function removeListeners() {
    for(let i=0; i<gridUnits.length; i++) {
        gridUnits[i] = removeAllListeners(gridUnits[i]);
    }
    gridUnits = document.querySelectorAll(".pixel");
}

function applyMagicMode() {
    for(let i=0; i<gridUnits.length; i++) {
        gridUnits[i].addEventListener("mouseover", ()=>{
            if(pencil == true) {
                if(autoColor == true) {
                    color = takeRandomColor();
                }
                gridUnits[i].style.backgroundColor = color;
            } else if (eraser == true) {
                gridUnits[i].style.backgroundColor = "transparent";
            }
        });      
    }
}

modeNormal.addEventListener("click", ()=>{
    if(mode == "magic") {
        mode = "normal";
        modeNormal.classList.add("selectedColor");
        modeMagic.classList.remove("selectedColor");
        removeListeners();
        applyNormalMode();
    }
});

modeMagic.addEventListener("click", ()=>{
    if(mode == "normal") {
        mode = "magic";
        modeMagic.classList.add("selectedColor");
        modeNormal.classList.remove("selectedColor");
        removeListeners();
        applyMagicMode();
    }
});


pencilTool.addEventListener("click", ()=> {
    pencilTool.classList.toggle("selectedColor");
    if(pencil == true) {
        pencil = false;
    } else {
        pencil = true;
        eraser = false;
        eraserTool.classList.remove("selectedColor");
    }
});

eraserTool.addEventListener("click", ()=> {
    eraserTool.classList.toggle("selectedColor");
    if(eraser == true) {
        eraser = false;
    } else {
        eraser = true;
        pencil = false;
        pencilTool.classList.remove("selectedColor");
    }
})

manualColorInput.addEventListener("input", ()=>{
    color = manualColorInput.value;
    autoColor = false;

});

autoColorButton.addEventListener("click", ()=> {
    autoColorButton.classList.toggle("selectedColor");
    if(autoColor == true) {
        autoColor = false;
        color = manualColorInput.value;
    } else {
        autoColor = true;
        manualColorInput.value = "default";
    }
});

function takeRandomColor() {
    const randomColors = ["blue", "red", "yellow", "orange"];
    let x = Math.floor(Math.random() * randomColors.length);
    return randomColors[x];
}

pencilTool.classList.toggle("selectedColor");
modeNormal.classList.add("selectedColor");