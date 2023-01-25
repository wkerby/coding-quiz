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
var totalPoints = 0;
var secondsRem = 120;
var numCorrect = 0; //variable to log the number of correct answers 
var gameOn = false; //boolean indicating that game is/is not in play //set to false until end-user wants game to begin
var index = 0; //variable to establish starting point for question display

var questions = { //create object to store questions, possible answers, and correct answers
    Question0: ["Which of the following is a pseudo-class that targets an element's style when it is hovered over?", [":hover", ":mouse", ":cover", ":envelope"], ":hover"],
    Question1: ["What is the language used to apply styling to a webpage?", ["CSS", "JavaScript", "HTML", "C#"], "CSS"],
    Question2: ["What is the language used to organize contents on a webpage?", ["CSS", "JavaScript", "Ruby", "HTML"], "HTML"],
    Question3: ["What is the language used to establish interactivity between the end-user and the webpage?", ["Python", "JavaScript", "Perl", "HTML"], "JavaScript"],
    Question4: ["What object of the window interface allows programmers to store data entered by the end-user?", ["localStorage", "storeObject", "body", "memory"], "LocalStorage"],
    Question5: ["Is programming fun to learn?", ["No", "No", "Yes", "No"], "Yes"]
};


//create functions

function questionSet() { //create function to establish question, answer choices, and correct answer

    currentQuestion = Object.values(questions)[index][0]; //set current question
    currentChoices = Object.values(questions)[index][1]; //set current answer choices
    currentAnswer = Object.values(questions)[index][2]; //set current correct answer

    question.textContent = currentQuestion; //write current question into webpage
    choiceA.textContent = currentChoices[0]; //write answer choice A
    choiceB.textContent = currentChoices[1]; //write answer choice B
    choiceC.textContent = currentChoices[2]; //write answer choice C
    choiceD.textContent = currentChoices[3]; //write answer choice D
}

function startGame() { //create function that starts game 
    console.log("Game started")
    gameOn = true;
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
            endGame();
        }

        else if (gameOn == false) {
            secondsRem = secondsRem //capture the number of seconds remaining at the end of the game if game ends with time remaining
            clearInterval(timerInterval)
        }

        else {
            var time = secondsToMins(secondsRem);
            timeRem.textContent = time[0] + ":" + time[1] + time[2];
        }

    }, 1000);
}

function nextQuestion() { //create function to determine which question to assign to current question
    index++;
    if (gameOn) {

        if (index > (Object.values(questions).length) - 1) {
            index = 0;
            endGame(); //make sure to end game when the player has cycled throug all of the questions
        }

        else {
            questionSet();
        }
    }
}

function wrongRight(event) { //create a function that notifies player if he/she chose corrrect or incorrect answer
    event.stopPropagation() // add stopPropagation function to avoid event bubbling
    var evalEl = event.target
    console.log(evalEl);
    console.log(currentAnswer);
    if (evalEl.textContent === currentAnswer) {
        responseDisplay.setAttribute("style", "color:green; font-weight:700;");
        responseDisplay.textContent = "Correct!";
        numCorrect++;
    }

    else {
        responseDisplay.setAttribute("style", "color:red; font-weight:700;");
        responseDisplay.textContent = "Incorrect";
        secondsRem = secondsRem - 15;
    }

}

function returnFinalScore(secondsRem, numCorrect) { //return final score as a function of number of correct answers chosen and number of seconds remaining when game is over
    if (numCorrect == 0) {
        finalScore = numCorrect;
    }

    else {
        finalScore = numCorrect * secondsRem;
    }

    return finalScore;
}

function endGame() {
    finalScore = returnFinalScore(secondsRem, numCorrect);
    timeRem.textContent = "GAME OVER! Final score: " + finalScore; //display total numer of points here at end of game
    gameOn = false;
}

//run questionSet function to render the first question onto the page 
questionSet();

//create event listeners

//add event listener to hourglass button so that it begins the game when it is selected
hourGlass.addEventListener('click', startGame);

//add event listener to hourglass so that it starts timer when it is selected
hourGlass.addEventListener('click', displayTime);

//add event listenet for next button
nextButton.addEventListener('click', nextQuestion);

//add event listener for all possible answer choices
choiceA.addEventListener('click', wrongRight);
choiceB.addEventListener('click', wrongRight);
choiceC.addEventListener('click', wrongRight);
choiceD.addEventListener('click', wrongRight);



