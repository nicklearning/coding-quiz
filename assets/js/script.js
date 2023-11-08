// declare and assign variables
var startBtn = document.querySelector("#start-quiz");
var timeRemaining = document.querySelector("#time");
var startPage = document.querySelector("#start-page-content");
var time = 75;

// start button event listener
startBtn.addEventListener("click", function (){
    timeRemaining.innerHTML = time;
    startPage.style.display = 'none';
}); 

