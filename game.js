var playing = false;
var score;
var timeLeft = 60;
var correctAnswer;
document.getElementById("startreset").onclick = function(){
    if(playing==true){
        location.reload();
    }else{
        playing=true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        show("timeremaining");
        timeLeft = 60;
        document.getElementById("timeremaining").innerHTML = "Time Remaining: 60 sec";
        hide("gameover");
        document.getElementById("startreset").innerHTML = "Reset Game";
        startCountdown();
        generateQA();
    }
}

for(i=1;i<5;i++){
    document.getElementById("box"+i).onclick = function(){
        if(playing==true){
            if(this.innerHTML == correctAnswer){
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                },1000);
                generateQA();
            }else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                },1000);
            }
        }
    }
}

function  startCountdown(){
    var timerInterval = setInterval(function(){
        document.getElementById("timeremaining").innerHTML = "Time Remaining: " + timeLeft + " sec";
        timeLeft--;
        if(timeLeft<=0){
            clearInterval(timerInterval);
            show("gameover");
            document.getElementById("gameover").innerHTML="<p>GAME OVER!!</p><p>YOUR SCORE IS "+score+".</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing=false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    },1000);
}

function hide(Id){
    document.getElementById(Id).style.display="none";
}

function show(Id){
    document.getElementById(Id).style.display="block";
}

function generateQA(){
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
   
    var correctPosition = 1+ Math.round(3*Math.random());
    
    document.getElementById("box"+correctPosition).innerHTML =
    correctAnswer; 
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+Math.round(9*Math.random())); 
            }while(answers.indexOf(wrongAnswer)>-1)
        document.getElementById("box"+i).innerHTML = wrongAnswer;
        answers.push(wrongAnswer);
        }
    }
}

