
// ENEMY CLASS
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;


    //Save the original position as startX and startY 
    //so bugs stream constantly by resetting to their original position. 
    this.startX = x;
    this.startY = y;

    this.velocity = Math.floor((Math.random()* 5) + 1);
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // Sets the avatar for the enemy bugs.
    this.sprite = 'images/enemy-bug.png';

    // This is the actual height/width of the sprites. 
    // It matters for collision detection. 
    this.height = 77;
    this.width = 101;
};

// Update the enemy's position. 

Enemy.prototype.update = function(dt) {
    
    // This line with help from 
    // http://tonirib.github.io/frontend-nanodegree-arcade-game/
    this.x = this.x + 120 * dt * (this.velocity);

    // When the bug goes off the screen- further than 650
    // on the x axis, it resets.
    if (this.x > 650){
        this.reset();
    }

    // Collisions
    // This code with help from https://www.youtube.com/watch?v=rqEJ7WiLWdo

    if ( (this.x + this.width >= player.x && this.x <= player.x + player.width) 
        && (this.y >= player.y && this.y <= player.y + player.height) ) {
        player.lives - 1;
        player.reset();
        alert('Oh noes! You\'ve died!');
    };
};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Enemy.prototype.reset = function () {
    this.x = this.startX;
    this.y= this.startY;
    this.sprite = 'images/enemy-bug.png';
}

// PLAYER CLASS 

var Player = function(x, y) {

    this.x = x;
    this.y = y;

    // Saves the original start position for use in player.reset. 
    this.startX = x;
    this.startY = y;


    // This sets the player avatar.
    this.sprite = 'images/char-cat-girl.png';

    // This is the actual height/width of the sprites. 
    // It matters for collision detection. 
    this.height = 81;
    this.width = 68;

    // CatGirl gets 9 Lives to start with.
    this.lives = 9; 
};

Player.prototype.update = function() { 
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
};

// Start the player back at its beginning position. 

Player.prototype.reset = function() {
    this.x = this.startX;
    this.y= this.startY;
    this.sprite = 'images/char-cat-girl.png';
}

Player.prototype.handleInput = function(allowedKeys) {

   // This sets the boundaries for the player. 
   
   switch (allowedKeys) {
        //Left boundary.
        case 'left': if (this.x > 0){
            this.x = this.x - 101;}
        break;
        
        // Right boundary.
        case 'right': if (this.x < 404) {
            this.x = this.x + 101}
        break;
        
        // If the player's y position is > 50, it means the player
        // is not in the very top water portion, and therefore hasn't won.
        case 'up':
            if (this.y > 50) {
                this.y = this.y - 70;
            } 
        // If the player's y position is < 35, it means the player
        // is in the water portion, and has won and can reset. 
            else {
                alert("w00t! You win!");
                player.reset();
            }
        break;

        // Bottom boundary.
        case 'down': if(this.y < 375){
            this.y = this.y + 75;}
        break;
   }
};

// Instantient Enemies and Player.

var allEnemies = [];

// Three positions that are possible for the bugs 
// to move in. These are the gray blocks. 

var vertPos = [220, 140, 60];

// Create 3 different enemies with different properties. 
for (var i = 0; i < 3; i++) {
    var x = Math.floor((Math.random() * 5 + 1));

    var y = vertPos[Math.floor(Math.random()* 3)];

    var enemy = new Enemy(x, y);

// Now push those bugs in to the allEnemies array!
    allEnemies.push(enemy);
}


// Instantiates the new player in the center bottom tile.
// When player.reset is called, it goes back to this position. 

var player = new Player (202, 420);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});