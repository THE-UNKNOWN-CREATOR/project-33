var Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies; 
var particles = [];
var plinkos = [];
var divisions =[];
var particle;
var menu = 0, play = 1, paused = 2, end = 3, begin=4, instructions=5;
var divisionHeight=300;
var score =0, highScore = 0;
var count = 20;
var gameState =menu;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }
    for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,175));
    }

    for (var j = 75; j <=width; j=j+50) {
        plinkos.push(new Plinko(j,275));
    }

    for (var j = 50; j <=width-10; j=j+50) {
        plinkos.push(new Plinko(j,375));
    }
    
}
 
function draw() {
  background("black");

  if(gameState === begin)
  {
    text("PRESS SPACE TO PLAY", 200, 40);
  }

  if(count < 0)
  {
    gameState = end;
  }

  if(gameState === play || gameState === begin || gameState === paused) 
  { 
  textSize(35)
  text("Score : "+score,20,40);
  
  fill("white");
  //text(mouseX + "," + mouseY, 20, 50);
  textSize(35)
  text(" 500 ", 5, 550);
  text(" 500 ", 80, 550);
  text(" 500 ", 160, 550);
  text(" 500 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 100 ", 400, 550);
  text(" 100 ", 480, 550);
  text(" 200 ", 560, 550);
  text(" 200 ", 640, 550);
  text(" 200 ", 720, 550);
  Engine.update(engine);
  ground.display();
  
  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();  
  }
 
    if(particle!=null)
    {
       particle.display();
        
        if (particle.body.position.y > 760)
        {
              if (particle.body.position.x < 300&&particle.body.position.x >0) 
              {
                  score=score+500;                     
                  particle=null;
                  gameState === begin 
                  if ( count <= 0){ gameState = end}                          
              }


              else if (particle.body.position.x < 600 && particle.body.position.x > 301 ) 
              {
                    score = score + 100;                    
                    particle=null;
                    gameState === begin 
                    if ( count <= 0) {gameState = end}

              }
              else if (particle.body.position.x < 900 && particle.body.position.x > 601 )
              {
                    score = score + 200;
                    particle=null;
                    gameState === begin 
                    if ( count <= 0)  
                    {
                      gameState = end
                    }

              }
        }
  
      }

   for (var k = 0; k < divisions.length; k++) 
   {
     divisions[k].display();
   }
  }

   if(score > highScore)
  {
    highScore = score;
  }

  if(gameState === end)
  {
    textSize(70)
    text("GAME OVER", 150, 200)
    textSize(30)
    text("Your Score Is " + score, 250, 400);
    text("PRESS SHIFT TO GO TO MENU", 125, 700)
    if(score > highScore)
    {
      text("Your New High Score Is " + highScore, 200, 450)
    }else
    {
      text("Your High Score Is " + highScore, 200, 450)
    }
    for (let j = 0; j < particles.length; j++) {
      World.remove(world, particles[j].body); 
    }
    
    if(keyCode === 16)
    {
      particle = null
      count = 20;
      score = 0
      gameState = menu;
    }
  }

  if(gameState === menu)
  {
    textSize(30);
    fill("red");
    text("WELCOME TO PLINKO THE GAME OF CHANCE", 50, 200);
    textSize(20)
    text("Your High Score Is " + highScore, 275, 350);
    text("press enter to start", 275, 500)
    if(keyCode === 13)
    {
      gameState = begin;
    }

    if(keyCode === 9)
    {
      gameState = instructions
    }
  }

  if(gameState === play)
  {
    text("CHANCES :"+ count, 500, 40);
  }

  if(gameState === instructions)
  {
    text("Plinko Is A Game Of Luck In Which The You Have To Press The Space Key To ", 30, 370)
    text("Make Particle Drop Then You Have To Wait Until It Hits The Ground Then You Get ", 20, 400)
    text("Points Depending On Which Division You Fall Into", 150, 430);
  }

  }
  
  


function keyPressed()
{
  if(keyCode === 32)
  {
    count = count-1;
    if(gameState === begin || gameState === play);
  {
     particle=new Particle(random(800, 0), 10, 10, 10);
     gameState = play; 
  }   
  }
}
