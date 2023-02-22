var content = document.querySelector(".content")
var mark = document.querySelector(".mark")
var timeRemaining = 75;
var timerInterval = "";
var start = document.querySelector(".start");
var timer = document.querySelector(".timer");
var newH1 = document.createElement("h1");
var hsInput = document.createElement("input");
var quizButton = "";
var quizButton2 = "";
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
        choices: ["1. quotes", "2. curly brackets", "3. commas", "4. parenthesis"],
        answer: "1. quotes",
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is",
        choices: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log",
    },
];
var quizPage = 0;
var hsP = document.querySelector(".hsP");
var hsScreen = document.querySelector(".hsScreen");
var hsSubmit = document.querySelector(".hsSubmit");
var initBox = document.querySelector(".initBox");
var hsLink = document.querySelector("a");

hsLink.addEventListener ("click", highScoreScreen);

function highScoreScreen() {
    content.innerHTML = "";

    mark.innerHTML - "";

    clearInterval(timerInterval);

    hsScreen.style.display = "flex";

    var initScore = initBox.value.trim() + " - " + timeRemaining;
    var initScores = localStorage.getItem("highScores") || [];
    
    if (initScores.length > 0) {
        initScores = JSON.parse(initScores);
    }
    
    initScores.push(initScore);
    

    localStorage.setItem("highScores", JSON.stringify(initScores));

    hsScreen.innerHTML = "";

    var header = document.querySelector(".header");
    header.style.visibility = "hidden";

    hsScreen.appendChild(newH1);
    newH1.textContent = "High Scores";

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
};

function quizEnd() {
    content.innerHTML = "";

    clearInterval(timerInterval);

    hsScreen.style.display = "flex";

    if (timeRemaining < 0) {
        timeRemaining = 0;
    }

    hsP.textContent = "Your final score is " + timeRemaining + ".";

    hsSubmit.addEventListener("mousedown", function () {
        mark.innerHTML = "";
    });

    hsSubmit.addEventListener("click", highScoreScreen)
}

function quizPopulate(quizPage) {
    content.innerHTML = "";

    content.appendChild(newH1);

    newH1.textContent = quizBody[quizPage].title;

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
                quizEnd();
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
        timer.textContent = "Time: " + timeRemaining;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            alert("Time is up!");
            quizEnd();
        }
    }, 1000);
    quizPopulate(0);
});

var hsLink = document.querySelector("a");

hsLink.addEventListener("click", function () {
    hsSubmit.click();
});

