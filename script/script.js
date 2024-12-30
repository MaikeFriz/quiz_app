let currentQuestion = 0;
let rightAnswers = 0;
let AUDIO_SUCCESS = new Audio('assets/sounds/success.mp3');
let AUDIO_FAIL = new Audio('assets/sounds/false.mp3');

function init() {
    showQuestion();
}

function showQuestion() {
    if (gameIsOver()) {
        showEndscreen();
    } else {
        updateProgressBar();
        showNextQuestion();
    }
}

function gameIsOver(){
   return currentQuestion >= questions.length;
}

function showEndscreen(){
    document.getElementById('questions_screen').style = "display: none;";
    document.getElementById('finished_screen').style = "";
    document.getElementById('all_questions_2').innerHTML = questions.length;
    document.getElementById('right_answers').innerHTML = rightAnswers;
}

function showNextQuestion(){
    let question = questions[currentQuestion];
    document.getElementById('all_questions').innerHTML = questions.length;
    document.getElementById('number_current_question').innerHTML = currentQuestion + 1;
    document.getElementById('question_test').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}

function updateProgressBar(){
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    console.log('Fortschritt:', percent);
    document.getElementById('progress_bar').innerHTML = `${percent}%`;
    document.getElementById('progress_bar').style = `width: ${percent}%`;
}

function answer(selection) {
    let question = questions[currentQuestion];
    console.log('selected answer is', selection);
    let selectedQuestionNumber = selection.slice(-1); //slice(-1) um auf den letzten buchstaben bzw zahl zuzugreifen
    console.log('korrekte antwort ist', question['right_answer']);
    let idOfRightAnswer = `answer_${question['right_answer']}`;


    if (rightAnswerSelected(selectedQuestionNumber)) {
        console.log('Diese Antwort ist korrekt.');
        document.getElementById(selection).parentNode.classList.add('bg-success'); //.parentNode um auf elternelement zuzugreifen, also die css klasse dem elternelement zu geben.
        rightAnswers++;
        AUDIO_SUCCESS.play();
    } else {
        console.log('Diese Antwort ist falsch.')
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber){
    return selectedQuestionNumber == question['right_answer'];
}

function resetAnswers() {
    document.getElementById('next-button').disabled = true;
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
    resetAnswers();
}

function restartGame(){
document.getElementById('questions_screen').style = "";
document.getElementById('finished_screen').style = "display: none;";
currentQuestion = 0;
rightAnswers = 0;
init();
}



