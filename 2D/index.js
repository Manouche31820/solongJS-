const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1380
canvas.height = 576
const gravity = 0.7
c.fillRect(0, 0, canvas.width, canvas.height)

class Sprite {
    constructor({
      position,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 }
    }) {
      this.position = position
      this.width = 50
      this.height = 150
      this.image = new Image()
      this.image.src = imageSrc
      this.scale = scale
      this.framesMax = framesMax
      this.framesCurrent = 0
      this.framesElapsed = 0
      this.framesHold = 5
      this.offset = offset
    }
  
    draw() {
      c.drawImage(
        this.image,
        this.framesCurrent * (this.image.width / this.framesMax),
        0,
        this.image.width / this.framesMax,
        this.image.height,
        this.position.x - this.offset.x,
        this.position.y - this.offset.y,
        (this.image.width / this.framesMax) * this.scale,
        this.image.height * this.scale
      )
    }
  
    animateFrames() {
      this.framesElapsed++
  
      if (this.framesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent++
        } else {
          this.framesCurrent = 0
        }
      }
    }
    update() {
        this.draw()
        this.animateFrames()
      }
    }
    

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/fond4.png'
})
const background2 = new Sprite({
    position: {
        x: 300,
        y: 100
    },
    imageSrc: './img/elec.png',
    scale: 1.5,
    framesMax: 3
})
class Fighter extends Sprite{
    constructor({position, velocity, imageSrc, scale = 1, framesMax = 1, offset = {x:0, y:0}, sprites}){
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
        })
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 15
        this.sprites = sprites

        for (const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
        // console.log(this.sprites);
    }

    update(){
        this.draw()
        this.animateFrames()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 70){
            this.velocity.y = 0;
        }
        else
            this.velocity.y += gravity
    }
}

const player = new Fighter({
    position: {
        x: 0,
        y:0
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc:'./img/Idle.png',
    framesMax: 2,
    scale: 0.3,
    offset:{
        x: 0,
        y: 0
    },
    sprites:{
        idle: {
            imageSrc:'./img/Idle.png',
            FramesMax: 2
        },
        run: {
            imageSrc:'./img/Run.png',
            FramesMax: 4
        }
    }
})

const keys = {
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
    }
    
}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    background2.update()
    // background3.update()
    // background4.update()
    player.update()
    player.velocity.x = 0
    player.image = player.sprites.idle.image
     if (keys.q.pressed && player.lastKey === 'q'){
        player.velocity.x = -5
    }else if (keys.d.pressed && player.lastKey === 'd'){
        player.image = player.sprites.run.image
        player.velocity.x = 5
    }
}
animate()

window.addEventListener('keydown', (event) => {
    switch(event.key){
        case 'd':
            player.lastKey = 'd'
            keys.d.pressed = true
            break
        case 'q':
            player.lastKey = 'q'
            keys.q.pressed = true
            break
        case 'z':
            player.velocity.y = -10
            break
    }
})
window.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'd':
            keys.d.pressed = false
            break
        case 'q':
            keys.q.pressed = false
            break
    }
    switch(event.key){
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})