/* 1. clicking start quiz button starts 75 second timer
*/
var content = document.querySelector(".content")
var timeRemaining = 75;
var start = document.querySelector(".start");
var timer = document.querySelector(".timer");

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

    var newH2 = document.createElement("h2"); 

    content.appendChild(newH2);
    
    newH2.textContent = "Question1";
    
    var quizButton = "";
    var quizQue = ["Correct1", "Wrong1", "Wrong2", "Wrong3"];

    for (var i = 0; i < 4; i++) {
        quizButton = document.createElement("button");
        
        if (i === 0) {
            quizButton.classList.add("correct");
        } else { 
            quizButton.classList.add("wrong");
        }

        content.appendChild(quizButton);
        
        quizButton.textContent = quizQue[i];
    };  
    

});


/* matches */