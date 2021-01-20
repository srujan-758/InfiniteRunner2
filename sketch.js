var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var square, square1, square2, square3, square4;
var square1_img,square2_img, square3_img, square4_img;


function preload(){
 square1_img=loadImage("images/square1.png") 
 square2_img=loadImage("images/square2.png") 
 square3_img=loadImage("images/square3.png")  
 square4_img=loadImage("images/square4.png")   
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
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
