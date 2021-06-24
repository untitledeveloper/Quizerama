var position = 0;
var correct = 0;
var score = 0;
var time = 30;
var quiz, status, question, choice, choices, chA, chB, chC, chD;

var questions = [
    {
        question: "test1",
        a: "a",
        b: "b",
        c: "c",
        d: "d",
        answer: "b"
      },
    {
        question: "test2",
        a: "a",
        b: "b",
        c: "c",
        d: "d",
        answer: "b"
      },
    {
        question: "test3",
        a: "a",
        b: "b",
        c: "c",
        d: "d",
        answer: "b"
      },
    {
        question: "test4",
        a: "a",
        b: "b",
        c: "c",
        d: "d",
        answer: "b"
      }
    ]

var elem = document.getElementById('timer');
var timerId = setInterval(countdown, 1000);

function countdown() {
    if (time == -1) {
    clearTimeout(timerId);
    elem.innerHTML = 'Timeout';
    console.log("Timeout")
    checkAnswer('fail')
    } 
    
    else {
    elem.innerHTML = 'Time: '+time;
    time--;
    }
}

function get(x){
    return document.getElementById(x);
  }


function renderQuestion(){
    quiz = get("quiz");
    if(position >= questions.length){
      quiz.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
      get("status").innerHTML = "Quiz completed";
      
      position = 0;
      correct = 0;

      return false;
    }
    get("status").innerHTML = "Question "+(position+1)+" of "+questions.length;
    
    question = questions[position].question;
    chA = questions[position].a;
    chB = questions[position].b;
    chC = questions[position].c;
    chD = questions[position].d;

    quiz.innerHTML = "<h3>"+question+"</h3>";
    
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='a'> "+chA+"</label>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='b'> "+chB+"</label>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='c'> "+chC+"</label>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='d'> "+chD+"</label>";
    quiz.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
  }

  function checkAnswer(a){

    choices = document.getElementsByName("choices");
    for(var i=0; i<choices.length; i++){
      if(choices[i].checked){
        choice = choices[i].value;
        console.log(choice)
      }
    }

    if (a == 'fail') {
      position = 4
      console.log('fail')
    }
    
    else if(choice == questions[position].answer){

      correct++;
      console.log(correct)
    }
    
    else {
      time = time-5;
      console.log(time)
    }
  
    position++;

    renderQuestion();
  }
  window.addEventListener("load", renderQuestion);