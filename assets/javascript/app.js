var start;
var gameHTML;
var counter= 20;
var questions=["What is the name of Harry Potters Owl?", "How old do you need to be to attend Hogwarts?","What flavour of 'Bertie Bott's Every Flavour Bean' did Dumbledore end up with?","Where did Charlie take Hagrid's Dragon?","What core is inside Harry's wand?"];
var answers=[["Hedwig","Owly","Pigwidgeon","Scabbers"],["10","11","12","13"],["Toffee","Grass","Vomit","Strawberry"],["Ireland","Romania","China","Mexico"],["Dragon","Unicorn","Thunderbird","Phoenix"]];
var correctAnswer=["A. Hedwig","B. 11","C. Vomit","B. Romania","D. Phoenix"];
var questionCounter=0;
var chosenAnswer;
var clock;
var scoreCorrect=0;
var scoreWrong=0;
var notAnswered=0;

$(document).ready(function() {
    function initialScreen() {
        start="<p class='main-button-container'><a class='btn btn-danger btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
    $(".mainArea").html(start);
    }

initialScreen();

$("body").on("click",".start-button",function(){
   
    generateHTML();

    timerWrapper();

});
$("body").on("click", ".answer", function(){

	chosenAnswer = $(this).text();
	if(chosenAnswer === correctAnswer[questionCounter]) {
	

		clearTimeout(clock);
		generateCorrect();
	}
	else {

		clearTimeout(clock);
		generateWrong();
	}
});
});
function generateHTML(){
    gameHTML= "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>"+ questions[questionCounter] + "</p><p class='first-answer answer'>A. " + answers[questionCounter][0] + "</p><p class='answer'>B. " + answers[questionCounter][1] + "</p><p class='answer'>C. " + answers[questionCounter][2] + "</p><p class='answer'>D. " + answers[questionCounter][3] + "</p>";
$(".mainArea").html(gameHTML);
}

function timerWrapper() {
    clock=setInterval(twentySeconds,1000);
    function twentySeconds(){
        if (counter===0) {
            clearTimeout(clock);
            timeRanOut();
        }
        if (counter >0) {
            counter--;

        }
        $(".timer").html(counter);
        }
    }
function timeRanOut(){
    notAnswered++;
    gameHTML= "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswer[questionCounter] + "</p>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait,2000)
}
function generateCorrect(){
    scoreCorrect++;
    gameHTML= "<p class='text-center timer-p'>Correct! The answer is: " + correctAnswer[questionCounter] + "</p>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait,2000)
}
function generateWrong(){
    scoreWrong++;
    gameHTML= "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer was: " + correctAnswer[questionCounter] + "</p>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait,2000)
}
function wait() {
    if (questionCounter<4) {

        questionCounter++;
        generateHTML();
        counter=20;
        timerWrapper();
    }
    else{
        finalScreen();
    }
    }

    function finalScreen(){
        gameHTML="<p class='text-center'>Quiz Finished!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + scoreCorrect + "</p>" + "<p>Wrong Answers: " + scoreWrong + "</p>" + "<p>Unanswered: " + notAnswered + "<a class='btn btn-danger btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(gameHTML);
    }
    $("body").on("click",".reset-button",function(){
        
   scoreCorrect=0;
scoreWrong=0;
notAnswered=0;
questionCounter=0;
generateHTML();

    timerWrapper();
});
