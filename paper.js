//DOM variables
let userScore = 0;
let computerScore = 0;
const userScoreSpan = document.getElementById("user-score");
const computerScoreSpan = document.getElementById("computer-score");
const scoreBoardDiv = document.querySelector(".score-board");
const resultDiv = document.getElementById("result-sentence");
const rockDiv = document.getElementById("r");
const paperDiv = document.getElementById("p");
const scissorsDiv = document.getElementById("s");

//functions
function getComputerChoice() {
    const choices = ["r", "p", "s"];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertToWords(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    if (letter === "s") return "Scissors";
}

function win(userChoice, computerChoice) {
    userScore++;
    userScoreSpan.innerHTML = userScore;
    computerScoreSpan.innerHTML = computerScore;
    resultDiv.innerHTML = "Your " + convertToWords(userChoice) + " beats " + convertToWords(computerChoice) + ". You win! 👍";
}

function lose(userChoice, computerChoice) {
    computerScore++;
    userScoreSpan.innerHTML = userScore;
    computerScoreSpan.innerHTML = computerScore;
    resultDiv.innerHTML = "Your " + convertToWords(userChoice) + " loses to " + convertToWords(computerChoice) + ". You lost! 😰 ";
}

function draw(userChoice, computerChoice) {
    resultDiv.innerHTML = "Your " + convertToWords(userChoice) + " equals " + convertToWords(computerChoice) +". It's a draw!";
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice)
            break;
        case "sr":
        case "rp":
        case "ps":
            lose(userChoice, computerChoice)
            break;
        case "ss":
        case "rr":
        case "pp":
            draw(userChoice, computerChoice)
            break;    
    }
}

function main(){
    //event listener
    rockDiv.addEventListener("click", function() {
    game("r");
    })
    paperDiv.addEventListener("click", function() {  
    game("p");
    })
    scissorsDiv.addEventListener("click", function() {  
    game("s");
    })
}

main();



console.log('hello');