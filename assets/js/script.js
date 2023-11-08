// declare and assign variables
var startBtn = document.querySelector("#start-quiz");
var timeRemaining = document.querySelector("#time");
var startPage = document.querySelector("#start-page-content");
var questionContainer = document.querySelector("#question-container");
var responseContainer = document.querySelector("#response-container");
var endGameContainer = document.querySelector("#end-game-container")
var hr = document.createElement("hr");
var response = document.createElement("h3");

var index = 0; // track the question 
var time = 45;

// array of question objects
var questions = [
    {
        question: "What is your name?",
        choices: ["Nick", "Mike", "Ann", "Sarah"],
        correctIndex: "0",
    },
    {
        question: "What is your age?",
        choices: ["15", "26", "42", "12"],
        correctIndex: "1",
    },
    {
        question: "What is your sign?",
        choices: ["T", "L", "A", "P"],
        correctIndex: "3",
    },

]

function setTime() {
    var timerInterval = setInterval(function () {
        time--;
        timeRemaining.textContent = time;

        if (time === 0 || index === questions.length) {
    
            clearInterval(timerInterval)
            displayEndGame();
        }
    }, 1000)
}

// start button event listener. Show the question when the start quiz button is clicked.
startBtn.addEventListener("click", function () {
    timeRemaining.innerHTML = time;
    startPage.innerHTML = ""; // clear the start message

    showQuestion(index);
    setTime();// start the timer
});


function showQuestion(index) {
    // create, append, and set the text content for the question
    var question = document.createElement('h2');
    questionContainer.append(question);
    question.textContent = questions[index].question;

    // create and append the unordered list to the question container
    var ul = document.createElement("ul");
    questionContainer.append(ul);

    // create and append the button elements to the unordered list. Set the data attribute for each button.
    var b1 = document.createElement('button');
    b1.setAttribute("data-index", "0");
    ul.append(b1);
    var b2 = document.createElement('button');
    b2.setAttribute("data-index", "1");
    ul.append(b2);
    var b3 = document.createElement('button');
    b3.setAttribute("data-index", "2");
    ul.append(b3);
    var b4 = document.createElement('button');
    b4.setAttribute("data-index", "3");
    ul.append(b4);

    // set the text for each button
    b1.textContent = questions[index].choices[0];
    b2.textContent = questions[index].choices[1];
    b3.textContent = questions[index].choices[2];
    b4.textContent = questions[index].choices[3];

}


// ToDO create question container event listener
questionContainer.addEventListener("click", function (e) {
    var element = e.target;

    if (element.matches("button")) {
        // check the index of the element for correctness
        var elementIndex = element.getAttribute("data-index");
        if (elementIndex === questions[index].correctIndex) {
            response.textContent = "Correct!"
        } else {
            response.textContent = "Incorrect!"
            time = time - 10;
            timeRemaining.textContent = time;
        }

        responseContainer.append(hr);
        responseContainer.append(response);

    }

    questionContainer.innerHTML = ""; //clear the question and choices if it is not the last question

    index++;
    console.log(index);

    showQuestion(index); //go to the next question

});




function displayEndGame() {
    var h1 = document.createElement("h1");
    var h3 = document.createElement("h3");
    var h3Initial = document.createElement("h3");
    var initialInput = document.createElement("input");
    var submitBtn = document.createElement("button");
    h1.textContent = "All done!";
    h3.textContent = "Your final score is " + time + ".";
    h3Initial.textContent = "Enter initials:";
    submitBtn.textContent = "Submit";

    console.log(h3.textContent);

    endGameContainer.append(h1);
    endGameContainer.append(h3);
    endGameContainer.append(h3Initial);
    endGameContainer.append(initialInput);
    endGameContainer.append(submitBtn);
    endGameContainer.append(hr);
    endGameContainer.append(response);


}

