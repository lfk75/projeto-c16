//Estados de Jogo
var faca, facaimg;
var fruta;
var fruta1, fruta2, fruta3, fruta4;
var alien, alienimg;
var fim, gameOverImage;

var gameOver;
var facacortando;
//grupos
var frutas;
var invasao;


const PLAY=1;
const END=0;

var gameState =1;
var score;
var aleatorio;


function preload(){
  
 facaimg = loadImage("knife.png");
 alienimg = loadAnimation("alien1.png","alien2.png")
 fruta1 = loadImage("fruit1.png");
 fruta2 = loadImage("fruit2.png");
 fruta3 = loadImage("fruit3.png");
 fruta4 = loadImage("fruit4.png");
  gameOverImage = loadImage("fimdeJogo.png")
  
  gameOver = loadSound("gameover.mp3")
  facacortando = loadSound("knifeSwoosh.mp3")
}



function setup() {
  createCanvas(600, 600);
  
   faca = createSprite(40,200,20,20);
   faca.addImage("facada", facaimg);
   faca.scale=0.5
 faca.setCollider("rectangle",0,0,40,40);
  faca.debug = true
 
 fim = createSprite(300,300);
 fim.addImage("fimJogo", gameOverImage);
 fim.visible = false;

  score=0;
  frutas = createGroup();
  invasao = createGroup();
   
 
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Chamar função de frutas e função de aliens
    fruits();
    Monster();
    
    //mover a faca
    faca.y=World.mouseY;
    faca.x=World.mouseX;
  
    
    if(faca.isTouching(frutas)){
     frutas.destroyEach();
      
      facacortando.play();
      score=score+1;
    }

    if (faca.isTouching(invasao)) {
    gameState = END
    faca.visible = false;
    gameOver.play();
    }
  }

  if (gameState === END) {
frutas.destroyEach();
invasao.destroyEach();

fim.visible = true;


  }


  
  drawSprites();
  //exibir pontuação
  textSize(25);
  text("Pontuação : "+ score,250,50);
}


function Monster(){
  if(World.frameCount%200===0){
   alien=createSprite(630,200,20,20);
   alien.addAnimation("moving", alienimg);
   alien.y=Math.round(random(100,590));
   alien.velocityX=-(5+(score/10));
   alien.setLifetime=50;
    
   invasao.add(alien);
  }
}

function fruits(){
  if(World.frameCount%80===0){
   fruta = createSprite(-10,300);
   fruta.velocityX = 4 +score/100

   aleatorio = Math.round(random(1,4));
  console.log(aleatorio);

   switch(aleatorio){
    case 1: fruta.addImage(fruta1);
            break;
    case 2:fruta.addImage(fruta2);
            break;
    case 3: fruta.addImage(fruta3);
            break;
    case 4: fruta.addImage(fruta4);
            break;
    default:break;
   }
    fruta.scale = 0.2;
    fruta.Lifetime = 300;
    frutas.add(fruta);
 }
}
