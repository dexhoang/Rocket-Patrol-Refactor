//Name: Dexter Hoang
//Title: Rocket Patrol: City Lights Edition
//Time worked: 14 hrs
//Mods:
//  -Create a new scrolling tile sprite for the background (1)
//  -Implement parallax scrolling for the background (3)
//  -Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
//  -Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
//  -Create a new title screen (e.g., new artwork, typography, layout) (3)
//  -Allow the player to control the Rocket after it's fired (1)
//  -Create 4 new explosion sound effects and randomize which one plays on impact (3)
//  -Display the time remaining (in seconds) on the screen (3)
//TOTAL POINTS: 20

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config)

//reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

//set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3