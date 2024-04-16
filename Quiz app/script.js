const questions = [
    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        answers:[
            {text:"A. var", correct:"false"},
            {text:"B. let", correct:"false"},
            {text:"C. const", correct:"false"},
            {text:"D. All of the above", correct:"true"},
        ]
    },
    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        answers:[
            {text:"A. Throws an error", correct:"false"},
            {text:"B. Ignores the statement", correct:"true"},
            {text:"C. Gives a warning", correct:"false"},
            {text:"D. None of the above", correct:"false"},
        ]
    },
    {
    question: "Which of the following method/s can be used to display data in some form using Javascript?",
        answers:[
            {text:"A. document.write()", correct:"false"},
            {text:"B. console.log()", correct:"false"},
            {text:"C. window.alert()", correct:"false"},
            {text:"D. All of the above", correct:"true"},
        ]
    },
    {
        question: "What keyword is used to check whether a given property is valid or not?",
        answers:[
            {text:"A. in", correct:"true"},
            {text:"B. is in", correct:"false"},
            {text:"C. exists", correct:"false"},
            {text:"D. lies", correct:"false"},
        ]
    },
    {
        question: "What is the use of the noscript tag in Javascript?",
        answers:[
            {text:"A. The contents are displayed by non js-based browser", correct:"true"},
            {text:"B. clears all the cookies nad cache", correct:"false"},
            {text:"C. both A and B", correct:"false"},
            {text:"D. None of the above", correct:"false"},
        ]
    }    
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
                 button.dataset.correct=answer.correct;
             }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);       
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
});
startQuiz();

