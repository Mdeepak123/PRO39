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

    car1 =createSprite(700,700);
    car1.addImage("image for car1",car1_img);

    car2 = createSprite(1050,700);
    car2.addImage("image for car2", car2_img);
    cars = [car1, car2];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("#c68767");
      image(track, -150,-displayHeight*4,displayWidth, displayHeight*5);
      //index of the array
      index = 0;
      //x and y position of the cars
      var x = 300;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1;
        x+=400
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
        player.x = x;
        player.y = y;

        if (index === player.index){

          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = x;
          camera.position.y = cars[index-1].y;
        }
        
      }


    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      cars[index-1].velocityX=cars[index-1].velocityX-1;
      x-=1;
      player.update(); 
    }
 
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      x+=1;
      player.update();

    }

    if(player.distance > 5600){
      gameState = 2;
    }

    console.log(player.distance);

    drawSprites();
  }

  end(){
    console.log("Game Ended");

    text("Game ended", displayWidth/2, 100);
  }
}
