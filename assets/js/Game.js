
var canvas=document.getElementById('myGame');
var context=canvas.getContext("2d");

//Score
let score = 0;
let time = 60;
//Property of big square
let x ;
let y ;
let speed;
let sideLenght;

// Property of target square
let targetX;
let targetY;
let targetLength;
//Bigtarget
let bigTargetX=Math.random()*canvas.width;
let bigTargetY=Math.random()*canvas.height;
let bigtargetLength=10;
//cricle
let circleX;
let circleY;
let dx;
let dy;
let radius;

let up=false;
let left=false;
let right=false;
let down=false;

let playAgain;

let count;
let MakeOtherCircle;


function inti(){
    score=0;
    time=60;

    x=10;
    y=50;
    speed=10;
    sideLenght=15;

    targetLength=5;
    targetX=Math.random()*(canvas.width-targetLength);
    targetY=Math.random()*(canvas.height-targetLength);

    circleY=Math.random()*canvas.height+2;
    circleX=60;
    radius=10;
    dx=0.5;
    dy=1;

    up=false;
    left=false;
    right=false;
    down=false;

    playAgain=true;
    
    count=0;
    MakeOtherCircle=0;
}

let showScore=document.getElementById('ShowScore');
showScore.style.display='none';


function isWithin(a, b, c) {
    return (a>b && a<c);
}

function erase(){
    context.fillStyle="black";
    context.fillRect(0,0,canvas.width,canvas.height);
}

function respawnSmall() {
    targetX =Math.round(Math.random() * (canvas.width-targetLength));
    targetY =Math.round(Math.random() * (canvas.height-targetLength));
}
function respawnBig(){
    bigTargetX=Math.round(Math.random()*(canvas.width-bigtargetLength));
    bigTargetY=Math.round(Math.random()*(canvas.height-bigtargetLength));
}

function draw(){
    let startGame=document.getElementById('startGame');
    //Clear screen
    erase();
    // To do :Update location base on keyboard click
    //Draw
    context.beginPath();
    context.strokeStyle='blue';
    context.arc(circleX, circleY, radius, 0, 2 * Math.PI);
    context.stroke();
   
    if(circleX+radius>canvas.width||circleX-radius<0){
        dx=-dx;
    }
    if(circleY+radius>canvas.height||circleY-radius<0){
        dy=-dy;
    }
    circleY+=dy;
    circleX+=dx;

    context.fillStyle="#0000FF";
    context.fillRect(x,y,sideLenght,sideLenght);

    //Draw target
    context.fillStyle="#F39C12";
    context.fillRect(targetX,targetY,targetLength,targetLength);

    if(count>=5){
        context.fillStyle="red";
        context.fillRect(bigTargetX,bigTargetY,bigtargetLength,bigtargetLength);
        if(isWithin(bigTargetX,x,x+sideLenght)||isWithin(bigTargetX+bigtargetLength,x,x+sideLenght)){
            if(isWithin(bigTargetY, y, y + sideLenght) || isWithin(bigTargetY +bigtargetLength , y , y+sideLenght)) {
                respawnBig();
                count=0;
                MakeOtherCircle+=1;
                time+=6;
                score+=10;
            }
        }
    }
    if(isWithin(circleX-radius,x,x+sideLenght)||isWithin(circleX+radius,x,x+sideLenght)){
        if(isWithin(circleY-radius,y,y+sideLenght)||isWithin(circleY+radius,y,y+sideLenght)){
            playAgain=false;
        }
    }
    
    
    // to move 
    if(down){
        y+=speed;
    }
    else if(up){
        y-=speed;
    }
    else if(right){
        x+=speed;
    }
    else if(left){
        x-=speed;
    }
    //To make x and y have fix value that make the box stay inside the screen(base on my understanding)
    if(y+sideLenght>canvas.height){
        y=canvas.height-sideLenght; // y=300-50=250
    }
    else if(x+sideLenght>canvas.width){
        x=canvas.width-sideLenght; //x=300-50=250
    }
    if(y<0){
        y=0;
    }
    else if(x<0) {
        x=0;
    }
    // Detect if big square collides with target
    if(isWithin(targetX, x, x+sideLenght) || isWithin(targetX +targetLength, x, x+sideLenght)) {
        if(isWithin(targetY, y, y + sideLenght) || isWithin(targetY +targetLength , y , y+sideLenght)) {
        // Respawn target: delete old target, and random new target at other location
        respawnSmall();
        // Increase score
        score++;
        // Increase score to get big target
        count++;
        console.log(count)
        console.log("get score", score);
        }
    }
    if(playAgain==false||time==0){
        clearBotton.style.display='inherit';
        showScore.style.display='inherit';
        showScore.innerHTML="Your Score: "+score;
        startGame.innerHTML="Play Again";
    }
    else {
        
        down = false;
        up = false;
        left = false;
        right = false;
        requestAnimationFrame(draw);
    }
    
    

}

// Start game
function startGame(){
    let clearBotton=document.getElementById('clearBotton');
    clearBotton.style.display='none';
    inti();
    draw();
    ShowTime.innerHTML="Time: "+time;
}
//Showtime on the screen
setInterval(function(){
    let ShowTime=document.getElementById('ShowTime');
    if(playAgain){
        if(time-->0){
            console.log(time);
        ShowTime.innerHTML="Time: "+time;
        }
        else{
            console.log(time);
           
        }
    }
},1000);

canvas.addEventListener('keydown', function(event){
    event.preventDefault();
    console.log(event.key);
    
    if(event.key=="ArrowDown"){
        down=true;
    }
    else if(event.key=="ArrowUp"){
        up=true;
    }
    else if(event.key=="ArrowRight"){
        right=true;
    }
    else if(event.key=="ArrowLeft"){
        left=true;
    }
});



