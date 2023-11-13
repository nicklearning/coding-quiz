var scoreList = document.querySelector("#score-list");
var clearBtn = document.querySelector("#clear-btn");

function renderScores() {
    var lastScore = JSON.parse(localStorage.getItem("highscore"));
    for (let index = 0; index < lastScore.length; index++) {
        const element = lastScore[index];
        var myScore = document.createElement('h2');
        scoreList.append(myScore);
        myScore.textContent = lastScore[index].initals + " - " + lastScore[index].score;
    }



}

clearBtn.addEventListener("click", function () {
    localStorage.clear();
    scoreList.innerHTML = ''
});
