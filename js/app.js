
// ENEMY CLASS
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;

    // This assigns a random speed to each bug. 
    this.velocity = Math.floor((Math.random()* 5) + 1);
    
    // Sets the avatar for the bugs.
    this.sprite = 'images/enemy-bug.png';

    // This is the actual height/width of the bugs. 
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
    // If the player hits a bug, the player dies and resets to start position.
    // This code with help from https://www.youtube.com/watch?v=rqEJ7WiLWdo
    if ( (this.x + this.width >= player.x && this.x <= player.x + player.width) 
        && (this.y >= player.y && this.y <= player.y + player.height) ) {
        player.reset();
        alert('Oh noes! You\'ve died!');
    };
};

// Draws the bugs on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Reset the bugs to their start position.
Enemy.prototype.reset = function () {
    this.x = x;
    this.y = y;
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

    // This is the actual height/width of the player image. 
    // It matters for collision detection. 
    this.height = 81;
    this.width = 68;
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

// This sets the boundaries of the playing field. The player
// is not able to move beyond the boundaries of the board. 

Player.prototype.handleInput = function(allowedKeys) {   
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