var rocket, rocketImg
var rock, rockImg, rocksGroup
var space, spaceImg
var gameState = "play"
var block1, block2, block3
var score = 0

function preload(){
rocketImg = loadImage("rocket3.png")
rockImg = loadImage("rock2.png")
spaceImg = loadImage("space bg.jpg")
}

function setup() {
  createCanvas(600,600);
  space = createSprite(300,300);
  space.addImage("space", spaceImg);
  space.velocityY = 1;
  
  rocket=createSprite(400,110,100,100)
  rocket.addAnimation("rocket3", rocketImg)
  rocket.scale=.5
  block1= createSprite(15,0,10,6000)
  block2=createSprite(595,0,10,6000)
  block3=createSprite(800,1,6000,10)
  rocksGroup=new Group()
  score =0 
}

function draw() {
    background("white");
    text("Score: "+score, 100, 50)

    
      if(gameState==="play"){
        rocket.bounceOff(block1)
        block1.visible=false
    
    rocket.bounceOff(block2)
    block2.visible=false
    
    rocket.bounceOff(block3)
    block3.visible=false
    score = score + Math.round(getFrameRate()/60)
    if(space.y > 330){
      space.y = 300
    }
    if(touches.length>0||(keyDown("up")||(keyDown("space")))){
      rocket.velocityY=-10
      touches=[]
    }
    if(keyDown("right")){
      rocket.velocityX=+10
    }
    if(keyDown("left")){
      rocket.velocityX=-10
    }
    createRocks();

    rocket.velocityY=rocket.velocityY+.5
    if(rocket.isTouching(rocksGroup)){
      gameState="end"
      }
  
      }
  
      else if(gameState==="end"){
        text("GAME OVER", 300, 300)
        space.destroy()
        rocksGroup.destroyEach()
        rocket.destroy()
      }
     
     
      drawSprites()

}
function createRocks(){
    if(frameCount% 60===0){
    var rock = createSprite(Math.round((random(50,550))),-19, 100, 100)
    rock.addImage( "rock2.png", rockImg)
    rock.scale = .1
    rock.velocityY=5
    rock.lifetime = 130
    rocksGroup.add(rock)
    }
}