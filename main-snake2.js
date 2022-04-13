

const canvas = document.getElementById("canvas");
const GAME_WIDTH = 600;
canvas.width = canvas.height = GAME_WIDTH;
const ctx = canvas.getContext("2d");
const BACK_GROUND = "black";
ctx.fillStyle = BACK_GROUND;
ctx.fillRect(0, 0, GAME_WIDTH, GAME_WIDTH);

const SNAKE_COLOR = 'white';
const UNIT = 20;

class vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getRandom() {
        let random = Math.floor(Math.random() * GAME_WIDTH)
        random -= random % UNIT;
        return random;
    }

    draw() {
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x, this.y, UNIT, UNIT)
    }

    clear() {
        ctx.fillStyle = BACK_GROUND;
        ctx.fillRect(this.x, this.y, UNIT, UNIT)
    }

    spawn() {
        this.clear()
        this.x = this.getRandom()
        this.y = this.getRandom()
        this.draw()
    }


}



class SNAKE {


    constructor() {
        this.body = [
            new vector(UNIT * 7, UNIT * 4),
            new vector(UNIT * 6, UNIT * 4),
            new vector(UNIT * 5, UNIT * 4),
            new vector(UNIT * 4, UNIT * 4),
            new vector(UNIT * 3, UNIT * 4),
            new vector(UNIT * 2, UNIT * 4),
            new vector(UNIT * 1, UNIT * 4)
        ];
        this.head = this.body[0];
        this.speed = new vector(1, 0);
        this.count = 0;
    }


    draw() {

        ctx.fillStyle = 'red';
        ctx.fillRect(this.body[0].x, this.body[0].y, UNIT, UNIT)

        ctx.fillStyle = SNAKE_COLOR;
        for (let i = 1; i < this.body.length; i++) {
            ctx.fillRect(this.body[i].x, this.body[i].y, UNIT, UNIT)
        }

    }

    clear() {

        ctx.fillStyle = BACK_GROUND;
        ctx.fillRect(this.body[this.body.length - 1].x, this.body[this.body.length - 1].y, UNIT, UNIT)



    }

    move() {

        this.clear()

        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].x = this.body[i - 1].x
            this.body[i].y = this.body[i - 1].y
        }

        this.body[0].x += UNIT * this.speed.x;
        this.body[0].y += UNIT * this.speed.y;

        this.checWall();
        this.checkDead();
        this.draw();


    }

    checkEat(food) {
        let head = this.body[0];
        return food.x == head.x && food.y == head.y
    }

    growUp() {
        this.clear()
        let snakeLength = this.body.length;
        let mountX = this.body[snakeLength - 1].x - this.body[snakeLength - 2].x;
        let mountY = this.body[snakeLength - 1].y - this.body[snakeLength - 2].y

        let newPart = new vector(
            this.body[snakeLength - 1].x + mountX,
            this.body[snakeLength - 1].y + mountY
        )

        this.body.push(newPart);

        this.draw();
    }

    checWall() {

        if (this.head.x < 0) {
            this.head.x = GAME_WIDTH - UNIT;

        }

        if (this.head.x > GAME_WIDTH - UNIT) {
            this.head.x = 0;

        }

        if (this.head.y < 0) {
            this.head.y = GAME_WIDTH - UNIT;

        }

        if (this.head.y > GAME_WIDTH - UNIT) {
            this.head.y = 0;

        }
    }


    checkDead() {
        for (let i = 1; i < this.body.length; i++) {
            if (this.head.x == this.body[i].x && this.head.y == this.body[i].y) {
                // alert('Bạn được ' + this.count + ' điểm');
                location.reload();
                // let name = prompt("nhập tên người chơi:");

                // document.getElementById('name').innerHTML = name += name + ':' + this.count + ' điểm <br>';
               

            }

        }
    }


}


function normal() {
    let fps = 100;
}
function hard() {
    let fps = 50;
}
function playEasy() {

    window.addEventListener('keydown', (evt) => {
        console.log(evt);
        if (evt.key == "ArrowDown" && player.speed.y != -1) {
            player.speed.x = 0;
            player.speed.y = 1;

        }

        if (evt.key == "ArrowUp" && player.speed.y != 1) {
            player.speed.x = 0;
            player.speed.y = -1;

        }

        if (evt.key == "ArrowRight" && player.speed.x != -1) {
            player.speed.x = 1;
            player.speed.y = 0;

        }

        if (evt.key == "ArrowLeft" && player.speed.x != 1) {
            player.speed.x = -1;
            player.speed.y = 0;

        }


    }
    )

    let fps = 200;
    let player = new SNAKE();
    player.draw();
    setInterval(() => {
        player.move()
        if (player.checkEat(food)) {
            player.growUp();
            food.spawn();
            player.count++;
            document.getElementById('results').innerHTML = player.count;

        }
    }, fps)

    let food = new Food()
    food.spawn();


    if (player.body.x < 0) {
        player.body.x = canvas.width - UNIT;
    }
    if (player.body.x > canvas.width) {
        player.body.x = 0;
    }

    if (player.body.y < 0) {
        player.body.y = canvas.height - UNIT;
    }
    if (player.body.y > canvas.height) {
        player.body.y = 0;
    }
}

function playHard() {

    window.addEventListener('keydown', (evt) => {
        console.log(evt);
        if (evt.key == "ArrowDown" && player.speed.y != -1) {
            player.speed.x = 0;
            player.speed.y = 1;

        }

        if (evt.key == "ArrowUp" && player.speed.y != 1) {
            player.speed.x = 0;
            player.speed.y = -1;

        }

        if (evt.key == "ArrowRight" && player.speed.x != -1) {
            player.speed.x = 1;
            player.speed.y = 0;

        }

        if (evt.key == "ArrowLeft" && player.speed.x != 1) {
            player.speed.x = -1;
            player.speed.y = 0;

        }


    }
    )

    let fps = 50;
    let player = new SNAKE();
    player.draw();
    setInterval(() => {
        player.move()
        if (player.checkEat(food)) {
            player.growUp();
            food.spawn();
            player.count++;
            document.getElementById('results').innerHTML = player.count;

        }
    }, fps)

    let food = new Food()
    food.spawn();


    if (player.body.x < 0) {
        player.body.x = canvas.width - UNIT;
    }
    if (player.body.x > canvas.width) {
        player.body.x = 0;
    }

    if (player.body.y < 0) {
        player.body.y = canvas.height - UNIT;
    }
    if (player.body.y > canvas.height) {
        player.body.y = 0;
    }
}

function playNormal() {

    window.addEventListener('keydown', (evt) => {
        console.log(evt);
        if (evt.key == "ArrowDown" && player.speed.y != -1) {
            player.speed.x = 0;
            player.speed.y = 1;

        }

        if (evt.key == "ArrowUp" && player.speed.y != 1) {
            player.speed.x = 0;
            player.speed.y = -1;

        }

        if (evt.key == "ArrowRight" && player.speed.x != -1) {
            player.speed.x = 1;
            player.speed.y = 0;

        }

        if (evt.key == "ArrowLeft" && player.speed.x != 1) {
            player.speed.x = -1;
            player.speed.y = 0;

        }


    }
    )

    let fps = 100;
    let player = new SNAKE();
    player.draw();
    setInterval(() => {
        player.move()
        if (player.checkEat(food)) {
            player.growUp();
            food.spawn();
            player.count++;
            document.getElementById('results').innerHTML = player.count;

        }
    }, fps)

    let food = new Food()
    food.spawn();


    if (player.body.x < 0) {
        player.body.x = canvas.width - UNIT;
    }
    if (player.body.x > canvas.width) {
        player.body.x = 0;
    }

    if (player.body.y < 0) {
        player.body.y = canvas.height - UNIT;
    }
    if (player.body.y > canvas.height) {
        player.body.y = 0;
    }
}

