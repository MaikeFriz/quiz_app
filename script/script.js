let currentQuestion = 0;
let amountCorrectAnswers = 0;

function init() {
    document.getElementById('questions_screen').style = 'display: none';
}

function renderQuizQuestions() {
    document.getElementById('start_screen').style = 'display: none';
    document.getElementById('questions_screen').style = '';
    showAmountQuestions();
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        document.getElementById('end_screen').style = '';
        document.getElementById('questions_screen').style = 'display: none';
        document.getElementById('amount_questions_finishing_screen').innerHTML = questions.length;
        document.getElementById('amount_correct_answers').innerHTML = ' ' + amountCorrectAnswers;
        currentQuestion = 0;
    } else {
        let question = questions[currentQuestion];
        document.getElementById('question_div').innerHTML = question.question;
        document.getElementById('answer_1').innerHTML = question.answer_1;
        document.getElementById('answer_2').innerHTML = question.answer_2;
        document.getElementById('answer_3').innerHTML = question.answer_3;
        document.getElementById('answer_4').innerHTML = question.answer_4;
    }
}

function showAmountQuestions() {
    document.getElementById('amount_questions').innerHTML = questions.length;
}

function chooseAnswer(selectedAnswer) {
    let question = questions[currentQuestion];
    let chosenAnswerNumber = selectedAnswer.slice(-1);
    let IDofCorrectAnswer = `answer_${question['right_answer']}`; //so herausfinden welche Antwort die richtige ist
    if (chosenAnswerNumber == question.right_answer) {
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-success');
        amountCorrectAnswers++;
    } else {
        document.getElementById(selectedAnswer).parentNode.classList.add('bg-danger');
        document.getElementById(IDofCorrectAnswer).parentNode.classList.add('bg-success'); //hier dann verwenden um hintergrund der richtigen antwort einzufaerben
    }
    document.getElementById('next_button').disabled = false;
}

function resetGivenAnswer() {
    document.getElementById('next_button').disabled = true;
    let answerOptions = document.querySelectorAll('.answer_options');
    answerOptions.forEach(element => {
        element.classList.remove('bg-danger');
        element.classList.remove('bg-success');
    });
    let questionLetterElements = document.querySelectorAll('.question_letter');
    questionLetterElements.forEach(element => {
        element.classList.remove('bg-danger');
        element.classList.remove('bg-success');
    });
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
    resetGivenAnswer();
    document.getElementById('question_number').innerHTML = currentQuestion + 1;
}

function playNewRound() {
    document.getElementById('end_screen').style = 'display: none';
    document.getElementById('questions_screen').style = '';
    renderQuizQuestions();
}
