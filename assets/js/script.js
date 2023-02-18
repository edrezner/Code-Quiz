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
    var correctOne = document.createElement("button");
    var wrongOne = ""; 

    content.appendChild(newH2);
    content.appendChild(correctOne);
    
    newH2.textContent = "Question1";
    
    for (var i = 0; i < 3; i++) {
        wrongOne = document.createElement("button");
        wrongOne.setAttribute("class", "wrong");
        content.appendChild(wrongOne);
    };  
    

});


/* matches */