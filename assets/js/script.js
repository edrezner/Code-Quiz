/* 1. clicking start quiz button starts 75 second timer
*/
var startPage = document.querySelector(".startPage")
var firstQue = document.querySelector(".firstQue")
var timeRemaining = 75;
var start = document.querySelector(".start");
var timer = document.querySelector(".timer");

start.addEventListener("click", function starTime() {
    var timerInterval = setInterval(function() {
        timeRemaining--;
        timer.textContent = "Time Remaining: " + timeRemaining;

        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            alert("Time is up!");
        }
    }, 1000);
        startPage.style.display = "none";
        firstQue.style.display = "block";
});

/* matches */