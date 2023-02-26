// All variables used globally or used in more than one function are listed at the top.
// quizBody object is listed here to keep the content of the function it's used in less voluminous.
var content = document.querySelector(".content")
var mark = document.querySelector(".mark")
var timeRemaining = 75;
var timerInterval = "";
var start = document.querySelector(".start");
var timer = document.querySelector(".timer");
var newH1 = document.createElement("h1");
var quizButton = "";
var quizBody = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers",],
        answer: '3. alerts',
    },
    {
        title: "The condition in an if / else statement is enclosed within _____.",
        choices: ["1. quotes", "2. parentheses", "3. curly brackets", "4. square brackets"],
        answer: "2. parentheses",
    },
    {
        title: "Arrays in JavaScript can be used to store _____.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above",
    },
    {
        title: "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["1. quotes", "2. curly brackets", "3. commas", "4. parentheses"],
        answer: "1. quotes",
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log",
    },
];
var quizPage = 0;
var hsScreen = document.querySelector(".hsScreen");
var hsSubmit = document.querySelector(".hsSubmit");
var initBox = document.querySelector(".initBox");
var hsLink = document.querySelector("a");

// Displays the high score list when the 'View High Scores' link is clicked.
hsLink.addEventListener ("click", highScoreScreen);

// Displays the high score list.
function highScoreScreen() {
    content.innerHTML = "";

    // The next two lines are here in case if the 'View High Score' link is clicked in the middle of the quiz.
    mark.innerHTML = "";

    clearInterval(timerInterval);

    hsScreen.style.display = "flex";

    var initScore = initBox.value.trim() + " - " + timeRemaining;
    var initScores = localStorage.getItem("highScores") || [];
    
    // If there is a list of high scores, they are turned into a JavaScript object.
    if (initScores.length > 0) {
        initScores = JSON.parse(initScores);
    }

    // If the initials input text box is not empty, it is added to the end of the High Score list.
    if (initBox.value != "") {
        initScores.push(initScore);
    }

    // Sets the local storage with a JSON string of the high score list.
    localStorage.setItem("highScores", JSON.stringify(initScores));

    // Clears the hsScreen content so that new elements displaying the high score list and two new buttons can be appended.
    hsScreen.innerHTML = "";

    // Header is hidden on this page.
    var header = document.querySelector(".header");
    header.style.visibility = "hidden";

    hsScreen.appendChild(newH1);
    newH1.textContent = "High Scores";

    // Creates an ordered list for the high scores to eventually be displayed.
    var hsList = document.createElement("ol");
    hsScreen.appendChild(hsList);

    // Turns the JSON string in local storage into a JavaScript object.
    var scoreListItem = JSON.parse(localStorage.getItem("highScores"));

    // Creates the list items from the high score list.
    for (var i = 0; i < initScores.length; i++) {
        var hsItem = document.createElement("li");
        hsItem.textContent = scoreListItem[i];
        hsList.appendChild(hsItem);
    };

    // Button elements are created and the display style needs to be reset since the original HTML was cleared earlier.
    var hsScreenTwo = document.createElement("article");
    hsScreen.appendChild(hsScreenTwo);
    hsScreenTwo.classList.add("hsScreenTwo");
    hsScreenTwo.style.display = "flex";

    quizButton = document.createElement("button");
    hsScreenTwo.appendChild(quizButton);
    quizButton.classList.add("goBack");
    quizButton.textContent = "Go Back";

    var quizButton2 = "";
    quizButton2 = document.createElement("button");
    hsScreenTwo.appendChild(quizButton2);
    quizButton2.classList.add("clearHs");
    quizButton2.textContent = "Clear High Scores";

    // Refreshes the page when the 'Go Back' button is clicked.
    quizButton.addEventListener("click", function () {
        location.reload();
    });

    // Clears local storage and high score list.
    quizButton2.addEventListener("click", function () {
        localStorage.clear();
        hsList.innerHTML = "";
    })
};

// This function is called when the user answers the final question; hiding the quiz content and displaying the HTML within the hsScreen section.
function quizEnd() {
    content.innerHTML = "";

    clearInterval(timerInterval);

    hsScreen.style.display = "flex";

    // This conditional statement preevents a negative score in case the user answered wrong on the final question with less than 10 seconds remaining.
    if (timeRemaining < 0) {
        timeRemaining = 0;
        timer.textContent = "Time: " + timeRemaining;
    }

    var hsP = document.querySelector(".hsP");
    hsP.textContent = "Your final score is " + timeRemaining + ".";

    hsSubmit.addEventListener("mousedown", function () {
        mark.innerHTML = "";
    });

    // Makes sure the text box for user initials cannot be empty.
    hsSubmit.addEventListener("click", function(){
        if (initBox.value.length == 0) {
            alert("You must enter your initials to register a score!")
        } else {
            highScoreScreen()
        }
    });
}

// This function populates all the quiz content (questions and answer buttons).
function renderQuiz(quizPage) {
   
    // Clears the current HTML within the .content section and appends new elements that make up the quiz.
    content.innerHTML = "";

    content.appendChild(newH1);

    newH1.textContent = quizBody[quizPage].title;

    /* This loop creates all the buttons containing the quiz answers selecting the correct set of questions
    pased on the index from the quizPage variable. Every button click advances the quizPage variable by one.
    The correct answer button adds an hr element and 'correct' text underneath the quiz. The wrong 
    answer button subtracts 10 seconds from the time remaining and adds an hr element and 'wrong' 
    text under the quiz. A mousedown on any button clears the hr element and any correct/wrong text.
    Once the quizPage variable is no longer less than the quizBody length the quizEnd function is ran. */
    for (var i = 0; i < 4; i++) {
        quizButton = document.createElement("button");

        content.appendChild(quizButton);

        quizButton.textContent = quizBody[quizPage].choices[i];

        quizButton.addEventListener("click", function (event) {
            event.preventDefault();
            var selectedAnswer = event.target.textContent;
            var newHr = document.createElement("hr");
            var newP = document.createElement("p");
            mark.appendChild(newHr);
            mark.appendChild(newP);
            if (selectedAnswer !== quizBody[quizPage].answer) {
                timeRemaining = timeRemaining - 10;
                timer.textContent = "Time: " + timeRemaining;
                newP.textContent = "Wrong!";
            } else {

                newP.textContent = "Correct!";
            }

            quizPage++;

            if (quizPage < quizBody.length) {
                renderQuiz(quizPage);
            } else {
                quizEnd();
            }
        });

        quizButton.addEventListener("mousedown", function () {
            mark.innerHTML = "";
        });
    };
}

// Sets the functionality of the 'Start Quiz' button. Starts the quiz, timer and sets condition if time runs out.
start.addEventListener("click", function (event) {
    event.preventDefault();
    timerInterval = setInterval(function () {
        timeRemaining--;
        timer.textContent = "Time: " + timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time is up!");
            quizEnd();
        }
    }, 1000);
    renderQuiz(0);
});

