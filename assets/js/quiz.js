var position = 0;
var correct = 0;
var time = 30;
var quiz, status, question, choice, choices, chA, chB, chC, chD, timeId, timeIt, submitId, score, input, players, local_players;

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


function get(x){
  return document.getElementById(x);
}

timeId = get('timer');
timeIt = setInterval(countdown, 1000);

function countdown() {

  if (time == 0) {
    clearTimeout(timeIt);
    timeId.innerHTML = 'Timeout';
    console.log("Timeout")
    checkAnswer('fail')
    } 
    
    else {
    timeId.innerHTML = 'Time: ' + time;
    time--;
    }
}

submitId = get('submit');

function scoreboard(score) {
  input = get('text_input').value;
  local_players = localStorage.getItem("local_players");
  local_players = local_players ? JSON.parse(local_players) : {};
  local_players[input] = score;
  localStorage.setItem("local_players", JSON.stringify(local_players));
  submitId.innerHTML = "<h3>Added to leaderboard</h3>"
  submitId.innerHTML += "<a class='button' href='scoreboard.html'>Leaderboard</a>"
  submitId.innerHTML += "<a class='button' href='index.html'>Home</a>"
}

function submit(score) {
  console.log('submit func')

  submitId.innerHTML = "<h3>Add score to leaderboard</h3>"
  submitId.innerHTML += "<h3>Score: "+score+"</h3"
  submitId.innerHTML += "<input class='input' id='text_input' type='text' placeholder='Type name'>"
  submitId.innerHTML += "<button class='button' onclick='scoreboard("+score+")'>Submit</button>"

}

function renderQuestion(){
    quiz = get("quiz");

    if(position >= questions.length & correct == 0){
      quiz.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
      get("status").innerHTML = "Quiz completed";
      
      position = 0;
      correct = 0;
      time = 0;
      score = time;

      localStorage.setItem("score", score);
      console.log("saved score to local storage: " + score)
      clearTimeout(timeIt);
      timeId.innerHTML = 'Timeout'

      return submit(score);
    }

    else if(position >= questions.length){
      quiz.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
      get("status").innerHTML = "Quiz completed";
      
      position = 0;
      correct = 0;
      score = time;

      localStorage.setItem("score", score);
      console.log("saved score to local storage: " + score)
      clearTimeout(timeIt);
      timeId.innerHTML = 'Timeout'

      return submit(score);
    }
    get("status").innerHTML = "Question "+(position+1)+" of "+questions.length;
    
    question = questions[position].question;
    chA = questions[position].a;
    chB = questions[position].b;
    chC = questions[position].c;
    chD = questions[position].d;

    quiz.innerHTML = "<h3 class='question_style'>"+question+"</h3>";
    
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='a'> "+chA+"</label>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='b'> "+chB+"</label>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='c'> "+chC+"</label>";
    quiz.innerHTML += "<label> <input type='radio' name='choices' value='d'> "+chD+"</label>";
    quiz.innerHTML += "<button class='button' onclick='checkAnswer()'>Submit Answer</button>";
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