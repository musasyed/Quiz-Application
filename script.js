const questions=[
    {
        question:"Who is Syed Musa Azam?",
        answers:[
            {text:"Graphic Designer",correct:false},
            {text:"Wordpress Designer",correct:false},
            {text:"MERN Stack Developer",correct:false},
            {text:"Both 2nd and 3rd",correct:true},
        ]
    },
    {
        question:"which websites musa can design?",
        answers:[
            {text:"Business Website",correct:false},
            {text:"Ecommerce Website",correct:false},
            {text:"Blog Website",correct:false},
            {text:"All of them",correct:true},
        ] 
    },
    {
        question:"Musa have portfolio and where we can avail this service",
        answers:[
            {text:"developerbooklet.com",correct:true},
            {text:"expertdeveloper.com",correct:false},
            {text:"techdeveloper.com",correct:false},
            {text:"developer.com",correct:false},
        ] 

    }
];


const questionElement=document.getElementById('question')
const answerButton=document.getElementById('answer-buttons')
const nextButtons=document.getElementById('next-btn')


let currentQuestionIndex=0;
let score=0;


function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButtons.innerHTML="Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+ ". " + currentQuestion.question

currentQuestion.answers.forEach(answer=>{
    const button=document.createElement("button")
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
        button.dataset.correct=answer.correct
    }
    button.addEventListener("click",selectAnswer)
})
}

function resetState(){
    nextButtons.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct=="true"
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct")
        }
        button.disabled=true;
    });
    nextButtons.style.display="block"


}

function showScore(){
    resetState();
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}`;
    nextButtons.innerHTML="Play Again"
    nextButtons.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButtons.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz()