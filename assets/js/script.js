var content = document.querySelector(".content")
var mark = document.querySelector(".mark")
var timeRemaining = 75;
var start = document.querySelector(".start");
var timer = document.querySelector(".timer");
var newH2 = document.createElement("h2");
var quizButton = "";
var quizBody = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers",],
        answer: 'alerts',
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
    },
    {
        title: "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes",
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log",
    },
];
var quizPage = 0;

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
            if (selectedAnswer !== quizBody[quizPage].answer) {
                timeRemaining = timeRemaining - 5;
                var newHr = document.createElement("hr");
                var newP = document.createElement("p");
                mark.appendChild(newHr);
                mark.appendChild(newP);
                newP.textContent = "Wrong!";
            } else {
                var newHr = document.createElement("hr");
                var newP = document.createElement("p");
                mark.appendChild(newHr);
                mark.appendChild(newP);
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
            var newHr = document.createElement("hr");
            var newP = document.createElement("p");
            newHr.style.display = "none";
            mark.innerHTML="";
            content.appendChild(newHr);
            content.appendChild(newP);
        });

        
    };
}

start.addEventListener("click", function (event) {
    event.preventDefault();
    var timerInterval = setInterval(function () {
        timeRemaining--;
        timer.textContent = "Time Remaining: " + timeRemaining;

        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            alert("Time is up!");
        }
    }, 1000);
    quizPopulate(0);
});
