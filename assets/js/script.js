/* 1. clicking start quiz button starts 75 second timer
*/
var content = document.querySelector(".content")
var timeRemaining = 75;
var start = document.querySelector(".start");
var timer = document.querySelector(".timer");
var newH2 = "";
var newH2 = document.createElement("h2");
var quizButton = "";
var quizQue = ["Question1", "Question2", "Question3", "Question4", "Question5"];
var quizAns = ["Correct1", "Wrong1", "Wrong2", "Wrong3", "Wrong4", "Correct2", "Wrong5", "Wrong6",
    "Correct1", "Wrong7", "Wrong8", "Wrong9", "Wrong10", "Wrong11", "Wrong12", "Correct4", "Wrong13", "Wrong14", "Correct5", "Wrong15"];
var score = 100;

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

    content.innerHTML = "";

    content.appendChild(newH2);

    newH2.textContent = quizQue[0];

    for (var i = 0; i < 4; i++) {
        quizButton = document.createElement("button");

        if (i === 0) {
            quizButton.classList.add("correct");
        } else {
            quizButton.classList.add("wrong");
        }

        content.appendChild(quizButton);

        quizButton.textContent = quizAns[i];

        quizButton.addEventListener("click", function (event) {
            event.preventDefault();

            if (event.target.matches(".wrong")) {
                timeRemaining = timeRemaining - 5;
                score = score - 20;
            }
        })
    };
});



/* matches */