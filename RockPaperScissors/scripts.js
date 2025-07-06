const container = document.querySelector(".container");
const innerContainer1 = document.querySelector(".inner-container-1");
const innerContainer2 = document.querySelector(".inner-container-2");
const innerContainer3 = document.querySelector(".inner-container-3");

const inputChoicePaper = document.querySelector("#input-paper");
const inputChoiceScissor = document.querySelector("#input-scisser");
const inputChoiceRock = document.querySelector("#input-rock");

const userGesture = document.querySelector(".user-gesture");
const robotGesture = document.querySelector(".robot-gesture");

const log = document.querySelector(".log");

const userScore = document.querySelector(".user-score");
const robotScore = document.querySelector(".robot-score");

let maxLife = 5;
let playerLife = maxLife;
let robotLife = maxLife;

let userChoiceCurr;

function enterGame() {
    innerContainer1.style.display = "none";
    innerContainer2.style.display = "flex";
    gameStart();
}

function gameStart() {

    userScore.innerText = playerLife; 
    robotScore.innerText = robotLife;
    log.innerText = "Choose one from the bottom and start!";

    inputChoicePaper.onclick = () => {
        userGesture.src = "./img/paper-user.png";
        playround("paper");
    };
    inputChoiceRock.onclick = () => {
        userGesture.src = "./img/rock-user.png";
        playround("rock");
    };
    inputChoiceScissor.onclick = () => {
        userGesture.src = "./img/scisser-user.png";
        playround("scissor");
    };
}

function playround(playerChoice) {
    let robotChoice = getRobotChoice();

    if(playerChoice == "rock" && robotChoice == "paper") {
        playerLife--;
        log.innerText = "Shit! Robot is laughing on you!";
    } else if(playerChoice == "rock" && robotChoice == "scissor") {
        robotLife--;
        log.innerText = "Yes! you made it!"
    } else if(playerChoice == "rock" && robotChoice == "rock") {
        log.innerText = "It's a draw. " + whoIsWinning();
    } else if(playerChoice == "paper" && robotChoice == "rock") {
        robotLife--;
        log.innerText = "Yes! you made it!"
    } else if(playerChoice == "paper" && robotChoice == "scissor") {
        playerLife--;
        log.innerText = "Shit! Robot is laughing on you!";
    } else if(playerChoice == "paper" && robotChoice == "paper") {
        log.innerText = "It's a draw. " + whoIsWinning();
    } else if(playerChoice == "scissor" && robotChoice == "paper") {
        robotLife--;
        log.innerText = "Yes! you made it!"
    } else if(playerChoice == "scissor" && robotChoice == "rock") {
        playerLife--;
        log.innerText = "Shit! Robot is laughing on you!";
    } else if(playerChoice == "scissor" && robotChoice == "scissor") {
        log.innerText = "It's a draw. " + whoIsWinning();
    }

    userScore.innerText = playerLife; 
    robotScore.innerText = robotLife;

    if(playerLife <= 0 || robotLife <= 0) {
        gameEnd();
    }
}

function getRobotChoice() {
    let choices = ["rock", "paper", "scissor"];
    let index = Math.floor(Math.random() * choices.length);
    let choice = choices[index];
    if(choice == "paper") {
        robotGesture.src = "./img/paper-robot.png";
    } else if(choice == "rock") {
        robotGesture.src = "./img/rock-robot.png";
    } else if(choice == "scissor") {
        robotGesture.src = "./img/scisser-robot.png";
    }
    return choice;
}


function gameEnd() {
    innerContainer2.style.display = "none";
    innerContainer3.style.display = "flex";
    let finishingHeading = document.querySelector(".finishing-heading");
    let finishingMsg = document.querySelector(".finishing-msg");
    
    if(playerLife>robotLife) {
        finishingHeading.innerText = "You Win! Congrates!";
        finishingMsg.innerText = "Please refresh/reload this page to play again!";
    } else {
        finishingHeading.innerText = "You Lose!";
        finishingHeading.style = "color: red";
        finishingMsg.innerText = "Please refresh/reload this page to play again!";
    }


}

function whoIsWinning() {
    if(playerLife>robotLife) {
        return "You're going to win!";
    } else if(robotLife>playerLife) {
        return "You're going to lose!";
    } else {
        return "Interesting fight!";
    }
}