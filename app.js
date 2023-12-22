let count = 0;
let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
const counterLimit = 10;

const value = document.querySelector("#value");
const btns = document.querySelectorAll(".btn");
const startBtn = document.querySelector(".start");
const multiplyForm = document.querySelector("#multiplyForm");
const multiplyInput = document.querySelector("#multiplyInput");
const resultDiv = document.querySelector("#result");
const historyTable = document.querySelector("#historyTable");

function calculateResult() {
    return count * parseInt(multiplyInput.value);
}

function updateCounter() {
    value.textContent = count;
    resultDiv.textContent = ""; // Clear result when count changes
}

function updateScore() {
    localStorage.setItem('score', score);
    document.querySelector("#score").textContent = `Score: ${score}`;
}

function updateHistory(result) {
    const equation = `${value.textContent} * ${multiplyInput.value}`;
    const row = historyTable.insertRow(1); // Insert at the top of the table
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2); // This is where the error is pointing
    cell1.textContent = equation;
    cell2.textContent = result;
    cell3.textContent = result === "Correct" ? "True" : "False";
}


btns.forEach(function (btn) {
    btn.addEventListener('click', function(e){
        const styles = e.currentTarget.classList;
        if (styles.contains("decrease")) {
            count = Math.max(count - 1, -counterLimit);
        } else if (styles.contains("increase")) {
            count = Math.min(count + 1, counterLimit);
        } 
        updateCounter();
    });
});

startBtn.addEventListener('click', function () {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    const currentCount = value.textContent;
    const popupRandomNum = document.createElement("div");
    popupRandomNum.textContent = `${randomNum} * ${currentCount} = ?`;
    popupRandomNum.style.position = "fixed";
    popupRandomNum.style.top = "50%";
    popupRandomNum.style.left = "50%";
    popupRandomNum.style.transform = "translate(-50%, -50%)";
    popupRandomNum.style.fontSize = "48px";
    document.body.appendChild(popupRandomNum);

    setTimeout(() => {
        popupRandomNum.remove();
        const userGuess = prompt(`Guess the result of ${randomNum} * ${currentCount}:`);
        if (userGuess && parseInt(userGuess) === randomNum * currentCount) {
            resultDiv.textContent = "You have won!";
            count = 0; // Reset count to 0 after a correct guess
            score += 1; // Increment score for a correct answer
            updateScore();
            updateHistory("Correct");
        } else {
            resultDiv.textContent = "";
            score -= 1; // Decrement score for a wrong answer
            updateScore();
            updateHistory("Wrong");
        }
    }, 2000);
});

document.querySelector(".multiply").addEventListener('click', function () {
    const result = calculateResult();
    resultDiv.textContent = `Result: ${count} * ${multiplyInput.value} = ${result}`;
});

document.querySelector(".reset").addEventListener('click', function () {
    count = 0;
    updateCounter();
    multiplyInput.value = 1;
});

// Initialize score and history
updateScore();
