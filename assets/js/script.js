
// declare and assign variables
var startBtn = document.querySelector("#start-quiz");
var timeRemaining = document.querySelector("#time");
var startPage = document.querySelector("#start-page-content");
var questionContainer = document.querySelector("#question-container");
var responseContainer = document.querySelector("#response-container");
var endGameContainer = document.querySelector("#end-game-container");
var hr = document.createElement("hr");
var response = document.createElement("h3");

var index = 0; // track the question while cycling through the array
var time = 75;

// array of question objects
var questions = [
    {
        question: "What is JavaScript?",
        choices: ["A. A style sheet language", "B. A markup language", "C. A programming language", "D. A database management system"],
        correctIndex: "2",
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        choices: ["A. var", "B. variable", "C. v", "D. int"],
        correctIndex: "0",
    },
    {
        question: "What is the purpose of the typeof operator in JavaScript?",
        choices: ["A. To check if a variable is defined", "B. To determine the type of a variable", "C. To create a new variable", "D. To concatenate strings"],
        correctIndex: "1",
    },
    {
        question: "Which function is used to print output in the console in JavaScript?",
        choices: ["A. log()", "B. print()", "C. display()", "D. console()"],
        correctIndex: "0",
    },
    {
        question: "What does the acronym DOM stand for in JavaScript?",
        choices: ["A. Document Object Model", "B. Data Object Model", "C. Document Oriented Model", "D. Dynamic Object Management"],
        correctIndex: "0",
    },
    {
        question: "Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["A. function myFunction() {}", "B. var myFunction = function() {}", "C. () => myFunction() {}", "D. myFunction: function() {}"],
        correctIndex: "3",
    },
    {
        question: "Which of the following is an example of a truthy value in JavaScript?",
        choices: ["A. null", "B. undefined", "C. 0", "D. 'true'"],
        correctIndex: "3",
    },
    {
        question: "What is the purpose of the JSON.parse() method in JavaScript?",
        choices: ["A. To parse a JSON string and convert it to a JavaScript object", "B. To stringify a JavaScript object into a JSON string", "C. To check if a variable is of type JSON", "D. To remove elements from a JSON array"],
        correctIndex: "0",
    },
    {
        question: "What is the purpose of the event.preventDefault() method in JavaScript?",
        choices: ["A. To stop the execution of the current function", "B. To prevent the default behavior of an event (e.g., form submission)", "C. To pause the execution of JavaScript code", "D. To remove an event listener from an element"],
        correctIndex: "1",
    },
    {
        question: "Which of the following statements about localStorage in JavaScript is true?",
        choices: ["A. Data stored in localStorage is automatically encrypted for security.", "B. localStorage has a shorter lifespan compared to session storage.", "C. Data in localStorage persists even after the browser is closed and reopened.", "D. localStorage is limited to storing only string data."],
        correctIndex: "2",
    },

]

// logic for the countdown timer
function setTime() {
    var timerInterval = setInterval(function () {
        time--;
        timeRemaining.textContent = time;

        if (time <= 0 || index === questions.length) {

            clearInterval(timerInterval)
            displayEndGame();
        }
    }, 1000)
};

// start button event listener. Show the question when the start quiz button is clicked.
startBtn.addEventListener("click", function () {
    timeRemaining.innerHTML = time; // display 75 seconds on the clock
    startPage.innerHTML = ""; // clear the start message
    showQuestion(index); // show the first question
    setTime();// start the countdown timer
});

// function to show each question with a parameter of the index of the question array
function showQuestion(index) {
    var question = document.createElement('h2'); // create, append, and set the text content for the question
    questionContainer.append(question);
    question.textContent = questions[index].question;


    var ul = document.createElement("ul");  // create and append the unordered list to the question container
    questionContainer.append(ul);

    // create and append the button elements to the unordered list. Set the data attribute for each button to identify correctness of the user's response. 
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

// add an event listener on the question list to listen for the user's selected answer. 
questionContainer.addEventListener("click", function (e) {
    var element = e.target; // store value of the clicked element

    if (element.matches("button")) { // event delegation
        var elementIndex = element.getAttribute("data-index"); // get the index from the selected button
        if (elementIndex === questions[index].correctIndex) {   // check the index of the element for correctness
            response.textContent = "Correct!"
        } else {
            response.textContent = "Incorrect!"
            time = time - 10;
            timeRemaining.textContent = time;
        }

        responseContainer.append(hr);
        responseContainer.append(response);
    }

    questionContainer.innerHTML = ""; // clear the question container after the selection is made

    index++; // increase the index of the array

    showQuestion(index); //go to the next question
});

var score = document.getElementById("score");

// utility function to display the end game content
function displayEndGame() {
    questionContainer.innerHTML = ""
    endGameContainer.style.display = "block"; // was originally display: none
    endGameContainer.append(hr);
    endGameContainer.append(response); // append response from the last question answered
    if (time < 0) { // don't want to show negative times
        time = 0;
        timeRemaining.textContent = time;
    }
    score.textContent = time; // set the score equal to the time remaining
}

var submitBtn = document.querySelector("#submit-button");

// add event listener on the submit button to listen for when the user goes to submit their score
submitBtn.addEventListener("click", function () {
    var localStorageData = JSON.parse(localStorage.getItem('highscore')) || []; // assign and parse the values in local storage to this variable or assign an empty array

    var highScore = { // create the highscore object
        initals: document.getElementById("initials").value,
        score: time,
    };
    localStorageData.push(highScore); // pushes the latest value the user submitted into local storage

    localStorage.setItem("highscore", JSON.stringify(localStorageData)); // stingify the new data
    window.location.href = "../html/highscores.html" // open up the high scores html page
});


