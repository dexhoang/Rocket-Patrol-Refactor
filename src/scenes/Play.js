class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {
        //place tile sqrite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0)
        this.cities = this.add.tileSprite(0, 0, 640, 480, 'cities').setOrigin(0, -0.57)
        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x12285D).setOrigin(0,0)
        //white borders
        this.add.rectangle(0,0, game.config.width, borderUISize, 0x1f2138).setOrigin(0,0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x1f2138).setOrigin(0,0)
        this.add.rectangle(0,0, borderUISize, game.config.height, 0x1f2138).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x1f2138).setOrigin(0,0)
        //rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0)
         // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0)
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0)
        this.ship04 = new newSpaceship(this, game.config.width + borderUISize*8, borderUISize*2.1 + borderPadding*4, 'newspaceship', 0, 100).setOrigin(0,0)
        //define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        //initialize score
        this.p1Score = 0
        //display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        //game over flag
        this.gameOver = false
        //60 sec play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5) 
            this.gameOver = true 
        }, null, this)

        //background music
        this.sound.play('driftveil', {volume: 0.3})

        //display timer
        this.timer = 0
        this.timeText = this.add.text(478, borderUISize + borderPadding*2, 'TIME:', scoreConfig)
        this.timeNum = this.add.text(563, borderUISize + borderPadding*2, this.timer, scoreConfig)
    }

    update() {
        //timer & update time text
        this.remaining = this.clock.getRemaining()
        this.round = (Math.round(this.remaining)/1000).toFixed(0)
        this.timeNum.text = this.round

        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.game.sound.stopAll()
            this.scene.restart()
        }

        //parallax scrolling
        this.starfield.tilePositionX -= 1
        this.cities.tilePositionX -= 4


        if (!this.gameOver) {
            this.p1Rocket.update()
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.ship04.update()
        }

        //check collision
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset()
            this.ufoExplode(this.ship04)
        }
    }

    checkCollision(rocket, ship) {
        //simple AABB checking
        if (rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true
            } else {
                return false
            }
    }

    animationShip(ship) {
        ship.alpha = 0
        let ships = this.add.sprite(ship.x, ship.y, 'spaceshit').setOrigin(0, 0);
        ships.anims.play('spaceshit', true)
        ships.on('animationcomplete', () => {
            ships.destroy()
        })
    }

    shipExplode(ship) {
        //temporarily hide ship
        ship.alpha = 0
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
            ship.reset()
            ship.alpha = 1
            boom.destroy()
        })
        //score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        //play different random explosion sound effect
        var value = Phaser.Math.Between(0, 4)
        if (value == 0) {
            this.sound.play('sfx-explosion')
        }
        if (value == 1) {
            this.sound.play('newexplode1')
        }
        if (value == 2) {
            this.sound.play('newexplode2')
        }
        if (value == 3) {
            this.sound.play('newexplode3')
        }
        if (value == 4) {
            this.sound.play('newexplode4')
        }
    }

    ufoExplode(ship) {
        //temporarily hide ship
        ship.alpha = 0
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
            ship.reset()
            ship.alpha = 1
            boom.destroy()
        })
        //score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score

        //play different random explosion sound effect
        this.sound.play('ufo')
    }
}