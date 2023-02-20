var content = document.querySelector(".content")
var mark = document.querySelector(".mark")
var timeRemaining = 75;
var timerInterval = "";
var start = document.querySelector(".start");
var timer = document.querySelector(".timer");
var newH2 = document.createElement("h2");
var hsInput = document.createElement("input");
var quizButton = "";
var quizButton2 = "";
var quizBody = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers",],
        answer: 'alerts',
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "parentheses", "curly brackets", "square brackets"],
        answer: "parentheses",
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
    },
    {
        title: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["quotes", "curly brackets", "commas", "parenthesis"],
        answer: "quotes",
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log",
    },
];
var quizPage = 0;
var hsP = document.querySelector(".hsP");
var hsScreen = document.querySelector(".hsScreen");
var hsSubmit = document.querySelector(".hsSubmit");
var initInput = document.querySelector(".initBox");


function highScoreScreen() {
    content.innerHTML = "";

    clearInterval(timerInterval);

    hsScreen.style.display = "block";

    hsP.textContent = "Your final score is " + timeRemaining + ".";

    hsSubmit.addEventListener("mousedown", function () {
        mark.innerHTML = "";
    });

    hsSubmit.addEventListener("click", function (event) {
        event.preventDefault();

        var initScore = initInput.value.trim() + " - " + timeRemaining;
        var initScores = localStorage.getItem("highScores") || [];
        if (initScores.length > 0) {
            initScores = JSON.parse(initScores);
        }
        initScores.push(initScore);
        localStorage.setItem("highScores", JSON.stringify(initScores));

        hsScreen.innerHTML = "";

        var header = document.querySelector(".header");
        header.style.display = "none";

        hsScreen.appendChild(newH2);
        newH2.textContent = "High Scores";

        var hsList = document.createElement("ol");
        hsScreen.appendChild(hsList);

        var scoreListItem = JSON.parse(localStorage.getItem("highScores"));

        for (var i = 0; i < initScores.length; i++) {
            var hsItem = document.createElement("li");
            hsItem.textContent = scoreListItem[i];
            hsList.appendChild(hsItem);
        };


        quizButton = document.createElement("button");
        hsScreen.appendChild(quizButton);
        quizButton.classList.add("goBack");
        quizButton.textContent = "Go Back";

        quizButton2 = document.createElement("button");
        hsScreen.appendChild(quizButton2);
        quizButton2.classList.add("clearHs");
        quizButton2.textContent = "Clear High Scores";

        quizButton.addEventListener("click", function () {
            location.reload();
        });

        quizButton2.addEventListener("click", function () {
            localStorage.clear();
            hsList.innerHTML = "";
        })
    });
}

function quizPopulate(quizPage) {
    content.innerHTML = "";

    content.appendChild(newH2);

    newH2.textContent = quizBody[quizPage].title;

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

                newP.textContent = "Wrong!";
            } else {

                newP.textContent = "Correct!";
            }

            quizPage++;

            if (quizPage < quizBody.length) {
                quizPopulate(quizPage);
            } else {
                highScoreScreen();
            }
        });

        quizButton.addEventListener("mousedown", function () {
            mark.innerHTML = "";
        });


    };
}

start.addEventListener("click", function (event) {
    event.preventDefault();
    timerInterval = setInterval(function () {
        timeRemaining--;
        timer.textContent = "Time Remaining: " + timeRemaining;

        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            alert("Time is up!");
        }
    }, 1000);
    quizPopulate(0);
});

