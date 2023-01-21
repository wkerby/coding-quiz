//create variables
var hourGlass = document.querySelector("#hourglass");
var timeRem = document.querySelector('.top-right p');
var nextButton = document.querySelector("#next-button");
var question = document.querySelector(".question").children[0]; //the p element into which we will place the question
var choices = document.querySelector('ol').children;
var choiceA = choices[0];
var choiceB = choices[1];
var choiceC = choices[2];
var choiceD = choices[3];
var responseDisplay = document.querySelector(".right p");
var secondsRem = 120;

//create questions, possible answers, and correct answers
var questions = {
    Question0: ["Which of the following is a pseudo-class that targets an element's style when it is hovered over?", [":hover", ":mouse", ":cover", ":envelope"], ":hover"],
    Question1: ["What is the language used to apply styling to a webpage?", ["CSS", "JavaScript", "HTML", "C#"], "CSS"],
    Question2: ["What is the language used to organize contents on a webpage?", ["CSS", "JavaScript", "Ruby", "HTML"], "HTML"],
    Question3: ["What is the language used to establish interactivity between the end-user and the webpage?", ["Python", "JavaScript", "Perl", "HTML"], "JavaScript"],
    Question4: ["What object of the window interface allows programmers to store data entered by the end-user?", ["localStorage", "storeObject", "body", "memory"], "LocalStorage"],
    Question5: ["Is programming fun to learn?", ["No", "No", "Yes", "No"], "Yes"]
};

function gameOver() {
    timeRem.textContent = "GAME OVER"; //display total numer of points here at end of game
}

function secondsToMins(numSeconds) { //create functiont that takes number of seconds an returns array of number of minutes, tens of seconds, and seconds
    if (numSeconds < 0) {
        return;
    }

    else if (numSeconds === 0) {
        return [0, 0, 0];

    }

    else if (numSeconds > 0 && numSeconds < 60) {
        var tenSeconds = Math.floor(numSeconds / 10);
        var oneSeconds = numSeconds - tenSeconds * 10;
        return [0, tenSeconds, oneSeconds];
    }

    else {
        var minutes = Math.floor(numSeconds / 60);
        if (numSeconds - (minutes * 60) < 10) {
            var tenSeconds = 0
        }
        else {
            var tenSeconds = Math.floor(((numSeconds - (minutes * 60)) / 10));
        }

        var oneSeconds = (numSeconds - (minutes * 60)) - (tenSeconds * 10);
        return [minutes, tenSeconds, oneSeconds];
    }
}

function displayTime() { //create function that dynamically displays time in the top-right p element
    var timerInterval = setInterval(function () {
        secondsRem--;
        if (secondsRem == 0) {
            clearInterval(timerInterval);
            gameOver();
        }

        else {
            var time = secondsToMins(secondsRem);
            timeRem.textContent(time[0] + ":" + time[1] + time[2]);
        }

    }, 1000);
}
