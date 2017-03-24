console.log(Phaser);//This sets the variable for the spacebar.
var spaceKey;

var ground;
var player;
var obstacle;
var roof

//This sets the score to start at -1.
var score = -1;


var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var GAME_CONTAINER_ID = 'gameDiv';

//This is the object which runs the game.
function preload(){
game.load.image('background', 'assets/DSTurbolasers.png');
game.load.image('ground', 'assets/wallHorizontal.png');
game.load.image('obstacle', 'assets/Turbolaser.png');
game.load.image('player', 'assets/x_wing_reference_3_by_lorcoft.png');
game.load.image('roof', 'assets/wallHorizontal.png');
};

function create(){


game.physics.startSystem(Phaser.Physics.ARCADE);
game.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'background');
game.stage.backgroundColor = '#8c8c8c'
player = game.add.sprite(15, 500, 'player');
obstacle = game.add.sprite(700,game.world.height, 'obstacle');
obstacle.scale.setTo(1, .7    );
obstacle.anchor.setTo(-6, 1);
platforms = game.add.group();
platforms.enableBody = true;
ground = platforms.create(0, GAME_HEIGHT, 'ground');
game.physics.arcade.enable(player);
game.physics.arcade.enable(obstacle);
game.physics.arcade.enable(0,1);
game.physics.arcade.enable(ground);
roofforms = game.add.group(0,0, 'roof');
roofforms.enablebody = true;
roof = platforms.create(0, GAME_HEIGHT*1/30,'roof');
roof.anchor.setTo(0,1);
roof.scale.setTo(4,1);
game.physics.arcade.enable(roof);
roof.body.immovable = true;
obstacle.body.immovable = true;
ground.anchor.setTo(0, 1);
ground.scale.setTo(4, 1);
ground.body.immovable = true;
spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
player.body.bounce.y = 0.2;
player.body.gravity.y = 600;
scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#4286f4' });

//roof

};

function update(){
game.physics.arcade.collide(player, obstacle);
game.physics.arcade.collide(player, ground);
game.physics.arcade.collide(player, roof);
if (spaceKey.isDown) {
      player.body.velocity.y = -300;
    }
    if (obstacle.x > 600) {
  obstacle.x -= 0.05;
};  
if (obstacle.x < 0) {
  obstacle.kill();
  obstacle = game.add.sprite(900, GAME_HEIGHT, 'obstacle');
  obstacle.scale.setTo(1,1);
  obstacle.anchor.setTo(0,1);
  game.physics.arcade.enable(obstacle);
  obstacle.body.immovable = true;
};
 if (obstacle.x < 5 && player.x > 5){
    score++;
    scoreText.text = 'score: ' + score;
  };
//This will tell you "You Lose!" if the player is pushed off the left side of the screen.
  if (player.x < 0){
    scoreText = game.add.text(350,200, 'You Lose!', {fill: '#ff0000'});
    obstacle.kill();
    player.kill();
  };
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv', { preload: preload, update: update, create: create });

game.state.start();   