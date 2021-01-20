class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    square1 = createSprite(100,200);
    square1.addImage("square1",square1_img);
    square2 = createSprite(300,200);
    square2.addImage("square2",square2_img);
    square3 = createSprite(500,200);
    square3.addImage("square3",square3_img);
    square4 = createSprite(700,200);
    square4.addImage("square4",square4_img);
    

    square = [square1,square2,square3,square4];
    
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      
      background("blue");

     
      var index = 0;

      //var fuel = 35;
      
      var x = 210;
      var y;

      for(var plr in allPlayers){
       
        index = index + 1 ;

        
        x = x + (220);
        y = displayHeight - allPlayers[plr].distance;
        square[index-1].x = x;
        square[index-1].y = y;

        if (index === player.index){
          fill("white");
          textSize(35);
          text("YOUR FUEL:"+player.fuel,camera.position.x,camera.position.y);
          stroke(10);
          camera.position.x = displayWidth/2;
          camera.position.y = square[index-1].y
        }
      
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10;
      player.fuel -= 1;
      player.update();
      
    }
    
    if(player.distance>4300){
      gameState=2
    }
    
    if(player.fuel<=0){
     console.log("vjghk"); 
    
    }
     
    drawSprites();
  }

  end(){
   console.log("GAME OVER"); 
  }

 resetfuel(){
    fill("red");
    textSize(45);
    text("YOU ARE OUT OF FUEL!!!",camera.position.x,camera.position.y);
    player.distance -=60;
    player.fuel = 55;
    player.distance.update(); 
  }
}
 
