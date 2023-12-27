const USER_SCORE_ID = "userscore";
const COMP_SCORE_ID = "compscore";
const MESSAGE_ID = "msg";
const ROUND_ID = "round";
const MAX_SCORE = 5; // Adjust as needed

let userScore = 0;
let compScore = 0;
let compChoice = "";
let round = 0;

const userScorePara = document.querySelector(`#${USER_SCORE_ID}`);
const compScorePara = document.querySelector(`#${COMP_SCORE_ID}`);
const messagePara = document.querySelector(`#${MESSAGE_ID}`);
const roundPara = document.querySelector(`#${ROUND_ID}`);
const choices = document.querySelectorAll(".choice");

const generateCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * 3);
    return options[randomIndex];
};

const updateScoreUI = () => {
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    roundPara.innerText = round;
};

const displayMessage = (message, backgroundColor) => {
    messagePara.innerText = message;
    messagePara.style.backgroundColor = backgroundColor;
};

const drawGame = () => {
    console.log("Game is a draw");
    displayMessage("Tie ho gya", "black");
};

const showWinner = (userWins, userChoice) => {
    round++;

    if (userWins) {
        userScore++;
        displayMessage(`Jeet gayee!! ${compChoice} ne Haraya ${userChoice} ko`, "Green");
    } else {
        compScore++;
        displayMessage(`Haar gaye!! ${userChoice} ne Haraya ${compChoice} ko`, "Red");
    }

    updateScoreUI();

    if (userScore === MAX_SCORE || compScore === MAX_SCORE) {
        endGame();
    }
};

const playGame = (userChoice) => {
    console.log("User choice =", userChoice);
    compChoice = generateCompChoice();
    console.log("Computer choice =", compChoice);

    if (userChoice === compChoice) {
        drawGame();
    } else {
        const userWins = (userChoice === "rock" && compChoice === "scissor") ||
                        (userChoice === "paper" && compChoice === "rock") ||
                        (userChoice === "scissor" && compChoice === "paper");

        showWinner(userWins, userChoice);
    }
};

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    round = 0;
    updateScoreUI();
    displayMessage("Game reset. Let's play again!", "white");
};

const endGame = () => {
    if (userScore === MAX_SCORE) {
        displayMessage("Congratulations! You won the game!", "blue");
    } else {
        displayMessage("Game over. You lost. Better luck next time!", "orange");
    }
};

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", resetGame);

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
