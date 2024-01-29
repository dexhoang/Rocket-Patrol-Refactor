class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        //load images/tile sprite
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('cities', './assets/cities.png')
        this.load.image('newspaceship', './assets/newspaceship.png')
        this.load.image('title', './assets/titlescreen.png')

        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        })

        //load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')      
        this.load.audio('driftveil', './assets/driftveilcity.mp3')
        this.load.audio('oof', './assets/oof.mp3')  
    }

    create() {
        //animation configuration
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        //title screen background
        this.add.image(320, 240, 'title')

        //title
        let menuConfig1 = {
            fontFamily: 'Courier',
            fontSize: '65px',
            backgroundColor: '#12285D',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //sub title //A7BAE8
        let menuConfig2 = {
            fontFamily: 'Courier',
            fontSize: '36px',
            backgroundColor: '#12285D',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //instructions
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#568096',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        //display menu text
        this.add.text(game.config.width/2, game.config.height/3 - borderUISize - borderPadding, 'ROCKET PATROL:', menuConfig1).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'CITY LIGHTS EDITION', menuConfig2).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/1.8, 'Use ← → arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#568096'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/1.8 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)    

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //easy mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.scene.start('playScene')
        }
    }
}