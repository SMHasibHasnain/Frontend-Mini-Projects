let pencil = true;
const pencilTool = document.querySelector(".pencil-tool");
let eraser = false;
const eraserTool = document.querySelector(".eraser-tool");
let shedding = false;
const sheddingTool = document.querySelector(".shedding-tool");
let color= "black";
const manualColorInput = document.querySelector(".color");

let autoColor = false;
const autoColorButton = document.querySelector(".auto-color-button");

let mode = "normal";
const modeNormal = document.querySelector(".mode-normal");
const modeMagic = document.querySelector(".mode-magic");

const canvas = document.querySelector(".canvas");

let settings = false;
const settingsBtn = document.querySelector(".settings");

const subsettings = document.querySelector(".subsettings");

const gridRangeInput = document.querySelector("#range");

let showGrid = "on";
const showGridLinesOrNot = document.querySelector("#showGridLinesOrNot");

const colorSelection = document.querySelector(".color-selection");
const toolsNormal = document.querySelector(".tools-normal");
const modes = document.querySelector(".modes");
const modded = document.querySelectorAll(".modded");

const clear = document.querySelector(".clear");

let gridSize = 16;
let gridUnits;

makeGrid();

function modeReset() {
    if(pencil == false) {
        pencilTool.classList.toggle("selectedColor");
    }
    pencil = true;
    if(eraser == true) {
        eraserTool.classList.toggle("selectedColor");
    }
    eraser = false;
    if(shedding == true) {
        sheddingTool.classList.toggle("selectedColor");
    }
    shedding = false;
    color = "black";
    if(autoColor == true) {
        autoColorButton.classList.toggle("selectedColor");
    }
    autoColor = false;
    if(mode == "magic") {
        modeNormal.classList.toggle("selectedColor");
        modeMagic.classList.toggle("selectedColor");
    }
    mode = "normal";
    applyNormalMode();
}

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
                gridUnits[i].style.opacity = "1.0";
            }  else if (shedding == true) {
                if(gridUnits[i].style.opacity > 0.0 && gridUnits[i].style.opacity < 1.0) {
                    let x = Number(gridUnits[i].style.opacity);
                    gridUnits[i].style.opacity = x + 0.1;
                } else {
                    if(autoColor == true) {
                        color = takeRandomColor();
                    }
                    gridUnits[i].style.backgroundColor = color;
                    gridUnits[i].style.opacity = 0.2;
                }
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

function deleteNodes() {
    canvas.innerHTML = "";
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
                gridUnits[i].style.opacity = "1.0";
            } else if (shedding == true) {
                if(gridUnits[i].style.opacity > 0.0 && gridUnits[i].style.opacity < 1.0) {
                    let x = Number(gridUnits[i].style.opacity);
                    gridUnits[i].style.opacity = x + 0.1;
                } else {
                    if(autoColor == true) {
                        color = takeRandomColor();
                    }
                    gridUnits[i].style.backgroundColor = color;
                    gridUnits[i].style.opacity = 0.1;
                }
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
        shedding = false;
        eraserTool.classList.remove("selectedColor");
        sheddingTool.classList.remove("selectedColor");
    }
});

sheddingTool.addEventListener("click", ()=> {
    sheddingTool.classList.toggle("selectedColor");
    if(shedding == true) {
        shedding = false;
    } else {
        shedding = true;
        pencil = false;
        eraser = false;
        eraserTool.classList.remove("selectedColor");
        pencilTool.classList.remove("selectedColor");
    }
});



eraserTool.addEventListener("click", ()=> {
    eraserTool.classList.toggle("selectedColor");
    if(eraser == true) {
        eraser = false;
    } else {
        eraser = true;
        pencil = false;
        shedding = false;
        pencilTool.classList.remove("selectedColor");
        sheddingTool.classList.remove("selectedColor");
    }
})

manualColorInput.addEventListener("input", ()=>{
    color = manualColorInput.value;
    autoColor = false;
});

manualColorInput.addEventListener("click", ()=>{
    color = manualColorInput.value;
    autoColor = false;
    autoColorButton.classList.remove("selectedColor");
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
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    let rgb = `rgb(${r},${g},${b})`;
    return rgb;
}

settingsBtn.addEventListener("click", ()=> {
    settingsBtn.classList.toggle("selectedColor");
    openOrCloseSettings();
    if(settings == false) {
        settings = true;
    } else {
        settings = false;
    }
});

function openOrCloseSettings() {
    colorSelection.classList.toggle("selectedDisplay");
    toolsNormal.classList.toggle("selectedDisplay");
    modes.classList.toggle("selectedDisplay");
    subsettings.classList.toggle("selectedDisplay");
    for(let i=0; i<modded.length; i++) {
        modded[i].classList.toggle("selectedDisplay");
    }
    
}

gridRangeInput.addEventListener("input", ()=> {
    gridSize = parseInt(gridRangeInput.value);
    deleteNodes();
    makeGrid();
    modeReset();
})

showGridLinesOrNot.addEventListener("click", ()=> {
    let x = showGridLinesOrNot.value;
    if(showGrid == "off") {
        showGrid = "on";
    } else {
        showGrid = "off";
    }
    gridUnits.forEach(pixel => {
        pixel.style.border = (showGrid === "on") ? "1px solid black" : "none";
    });
})

autoModeSelect();

function autoModeSelect() {
    pencilTool.classList.toggle("selectedColor");
    modeNormal.classList.add("selectedColor");
}

clear.addEventListener("click", ()=> {
    clearCanvas();
})

function clearCanvas() {
    for(let i=0; i<gridUnits.length; i++) {
        gridUnits[i].style.backgroundColor = "transparent";
        gridUnits[i].style.opacity = "1.0";
    }
}