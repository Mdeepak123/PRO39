var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2;
var index;
var track, car1_img,car2_img;

function preload(){

  track = loadImage("images/track.jpg");

  car1_img = loadImage("images/car2.png");
  car2_img = loadImage("images/car3.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 300, displayHeight-300);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
