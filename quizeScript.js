
let questions =[
    {
        question: "Which of the following is not a JavaScript framework or library?",
        options: ["React", "Vue", "Django", "Angular"],
        answer: "Django"
      },
      {
        question: "What will be the output of the following code? \n\n console.log(typeof null);",
        options: ["'object'", "'null'", "'undefined'", "'string'"],
        answer: "'object'"
      },
      {
        question: "Which method is used to remove the last element from an array in JavaScript?",
        options: ["shift()", "pop()", "push()", "unshift()"],
        answer: "pop()"
      },
      {
        question: "What is the output of the following code? \n\n console.log(2 + '2');",
        options: ["4", "'22'", "NaN", "undefined"],
        answer: "'22'"
      },
      {
        question: "Which of the following is used to define a variable in JavaScript that cannot be reassigned?",
        options: ["var", "const", "let", "function"],
        answer: "const"
      },
      {
        question: "What will console.log([] == false) return?",
        options: ["true", "false", "TypeError", "undefined"],
        answer: "true"
      },
      {
        question: "How do you check if a property exists in an object in JavaScript?",
        options: ["object.hasOwnProperty(property)", "property in object", "object.includes(property)", "Both a and b"],
        answer: "Both a and b"
      },
      {
        question: "What is the purpose of Array.prototype.map() method in JavaScript?",
        options: [
          "To filter elements from an array",
          "To create a new array with results of calling a function on every element in the array",
          "To add an element to the array",
          "To find the index of an element"
        ],
        answer: "To create a new array with results of calling a function on every element in the array"
      }
]

let questionIndex = 0;
let gotAnswer={}

let questionBox = document.getElementById("questionBox");
questionBox.innerText = '';


function displayQuestion(ind){
    questionIndex = ind;
    const currentQuestion = questionIndex+1 + '. ' + questions[questionIndex].question;
    questionBox.innerText = currentQuestion;

    let checked = false;

   
    
    document.getElementById("backBtn").disabled = true;
    document.getElementById("backBtn").classList.add('not-allowed');

    questions[questionIndex].options.forEach((item,i) => {
        const label = document.getElementById(`label${i+1}`);
        const radio = document.getElementById(`radio${i+1}`);
        radio.checked = false;
        radio.onclick = () => {
            checked = true;
            console.log(radio)
            storeResult(radio.value,questionIndex)
            
        }
        label.innerText=item;
        radio.value = item;
    })

    nextBtn.onclick=()=>{
        if(checked){
            loadNextQuestion(questionIndex+1);
        }
        else{
            alert("Select an option")
        }
    }
}

function loadNextQuestion(questionIndex){
    let checked = false;
    if(questionIndex == 0){
        document.getElementById("backBtn").disabled = true;
        document.getElementById("backBtn").classList.add('not-allowed');
    }
    else{
        document.getElementById("backBtn").disabled = false;
        document.getElementById("backBtn").classList.replace('not-allowed','pointer');
    }


    if(questionIndex == questions.length-1){
        document.getElementById("nextBtn").innerText = "Submit";
    }
    else{
        document.getElementById("nextBtn").innerText = "Next";
    }

    if(questionIndex != questions.length){
        const currentQuestion = questionIndex+1 + '. ' + questions[questionIndex].question
        questionBox.innerText = currentQuestion;

        questions[questionIndex].options.forEach((item,i) => {
            const label = document.getElementById(`label${i+1}`);
            const radio = document.getElementById(`radio${i+1}`);
            radio.checked = false;
            radio.onclick = () => {
                checked = true;
                storeResult(radio.value,questionIndex)
            }
            label.innerText=item;
            radio.value = item;
        })

        nextBtn.onclick=()=>{
            if(checked){
                loadNextQuestion(questionIndex+1);
            }
            else{
                alert("Select an option")
            }
        }

        backBtn.onclick=()=>{
                loadNextQuestion(questionIndex-1);
            }
    }
    
    else{
       calculateResult();
    }
}

function calculateResult(){
    let score=0;
    
        for(i=0;i<Object.keys(gotAnswer).length;i++){
            if(gotAnswer[i] == questions[i].answer){
                console.log(gotAnswer[i] +" : "+ questions[i].answer + " "+ "Matched")
                score++;
            }
            else{
                console.log(gotAnswer[i] +" : "+ questions[i].answer +" "+ "Not matched")
            }
        }
        alert(`Your score is ${score} out of ${questions.length}`)
        // radio.checked = false;
        window.onload = displayQuestion(0,false)
}

function storeResult(btnInput,questionIdx){
    gotAnswer[questionIdx] = btnInput;
}

window.onload = displayQuestion(questionIndex)