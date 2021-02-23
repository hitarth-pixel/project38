var trex;
var trexrun;
//var ball ;
//var ballImage;
var ground;
var ground2;
var cloud2;
var cloud;
var randomNumber;
var obstacle;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
var PLAY=1;
var END=0;
var gameState=PLAY;
var invisibleground;
var obstaclegroup;
var cloudsGroup;
var score=0;
var gameOver;
var gameOver2;
var sound;
var sound2,sound3,sound4;
var back;

function preload(){
  ground2=loadImage("ground2.png")
  
  trexrun=loadAnimation("trex1.png","trex3.png","trex4.png")
  
  cloud2=loadImage("cloud.png")
  
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  
  gameOver=loadImage("gameOver.png");
  
  sound2=loadSound("score.mp3");
  sound3=loadSound("wall_hit.mp3");
  sound4=loadSound("hit.mp3");
  
  back=loadImage("back.jpg")
}

function setup(){
  
  createCanvas(displayWidth,displayHeight);
  
  frameRate(30)
  
ground=createSprite(300,900,80,80) 
  ground.addImage("g",ground2)
  ground.velocityX=-4
  ground.x=ground.width/2
  ground.visible=false;
  
  
  
  //creating invisible ground
  invisibleground= createSprite(500,890,displayWidth,10)
  invisibleground.visible=false;
  
  trex=createSprite(100,890,50,50)
trex.addAnimation("run", trexrun)
trex.scale=0.8;
  
gameOver2=createSprite(500,700,100,100);
gameOver2.addImage("gameover",gameOver);
gameOver2.scale=2.0;
gameOver2.visible=false;
  
obstaclegroup=new Group();
cloudsGroup=new Group();
  

  randomNumber=random(1,100);


}  


function draw(){
  background(back);
  camara(trex);
  
  console.log(ground.x);
  
  if(gameState===PLAY){
     if(keyDown("space")&&trex.y >= 165){                   

  trex.velocityY= -10
       sound4.play();
       
}
     //gravity 
    trex.velocityY+=0.3 
    
   score = score+ Math.round(frameCount/60);
    ground.velocityX=-4;
      if (ground.x<0) {
   ground.x=ground.width/2; 
  }
    clouds();
  obstacles();
    
     if(obstaclegroup.isTouching(trex)){
      
      gameState=END;
       sound3.play();    }
  }
     else if(gameState===END){
      ground.velocityX=0;
       
       cloudsGroup.setVelocityEach(0);
       obstaclegroup.setVelocityEach(0);
       gameOver2.visible=true;
       
     }
      
  trex.collide(invisibleground);
  textSize(60);
  fill ("red");
  stroke ("blue")
  text("Score: "+ score, 500, 800); 
  if(mousePressedOver(gameOver2)){
    sound2.play()
   restart();
    }

  drawSprites();
}

function clouds() {
if (frameCount%60===0) {
cloud=createSprite(600,500,40,10)
cloud.addImage("c",cloud2)
cloud.velocityX= -4
cloud.y=random(20,100);
  cloud.scale=0.7
  cloudsGroup.add(cloud);
  } 
  
}

function obstacles() {
  if(frameCount%80===0){
    obstacle=createSprite(1000,890,50,50);
    obstacle.velocityX= -6
  //generate random obstacles
    var rand=Math.round(random(1,6))
    switch(rand){
      case 1:obstacle.addImage(obstacle1)
      break;
      case 2:obstacle.addImage(obstacle2)
      break;
      case 3:obstacle.addImage(obstacle3)
      break;
      case 4:obstacle.addImage(obstacle4)
      break;
      case 5:obstacle.addImage(obstacle5)
      break;
      case 6:obstacle.addImage(obstacle6)
      break;
      default:break;
    }
 obstacle.scale=0.5;
obstacle.lifetime=300;
obstaclegroup.add(obstacle);
  
  }
  
}

function restart(){
  score=0;
  ground.velocityX=-4;
gameOver2.visible=false;
gameState=PLAY;
  
obstaclegroup.destroyEach();

}

function camara(obj){
       
         camera.position.x=displayWidth/2;
         camera.position.y=obj.y;

        }