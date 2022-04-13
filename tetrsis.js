let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


let ROW = 18;
let COL = 10;
let SQ = 40;
let COLOR = 'WHITE';
let score = 0;

//  vẽ bản đồ trò chơi
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    ctx.strokeStyle = "ccc";
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);

}

let board = [];
for (r = 0; r < ROW; r++) {
    board[r] = [];
    for (c = 0; c < COL; c++) {
        board[r][c] = COLOR;
    }
}

console.log(board);

function drawBoard() {

    for (r = 0; r < ROW; r++) {

        for (c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c])
        }
    }

}

drawBoard();
//



class Piece {

    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;
        this.tetrominoN = 0; // sinh ra mảnh thì là phần tử đầu
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.x = 3;  //
        this.y = -2; //vẽ hình bên ngoài và sau đó hình rơi vào board
    }

    fill(color) {
        for (let r = 0; r < this.activeTetromino.length; r++) {

            for (let c = 0; c < this.activeTetromino.length; c++) {
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, color);
                }
            }
        }
    }

    draw() {
        this.fill(this.color);
    }


    undraw() {
        this.fill(COLOR);
    }

    moveDown() {

        if (!this.collosition(0, 1, this.activeTetromino)) {
            this.undraw();
            this.y++;
            this.draw();
        } else {
            this.lock();
            p = randomPiece();
        }
    }
    moveLeft() {

        if (!this.collosition(-1, 0, this.activeTetromino)) {
            this.undraw();
            this.x--;
            this.draw();
        }

    }

    moveRight() {

        if (!this.collosition(1, 0, this.activeTetromino)) {
            this.undraw();
            this.x++;
            this.draw();
        }
    }
    lock() {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
                if (!this.activeTetromino[r][c]) {
                    continue
                }

                if (this.y + r < 0) {
                    alert("game over");
                    gameOver = true;
                    break;
                }

                board[this.y + r][this.x + c] = this.color;
            }
        }

        //xử lí ăn điểm
        for (let r = 0; r < ROW; r++) {
            let isFull = true;
            for (let c = 0; c < COL; c++) {
                isFull = isFull && (board[r][c] != COLOR);

            }


            if (isFull) {
                for (let y = r; y > 1; y--) {
                    for (let c = 0; c < COL; c++) {
                        board[y][c] = board[y - 1][c];
                    }
                }

                for (let c = 0; c < COL; c++) {
                    board[0][c] = COLOR;
                }

                score += 100;
            }
        }
        drawBoard();
        document.querySelector('#score').innerText = score;

    }

    collosition(x, y, piece) {
        // x :giá trị dịch thuyển theo phương ngang  VD sang trái => x = -1 ;y = 0
        // xuống dưới => x = 0 ;y =1;

        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece.length; c++) {
                if (!piece[r][c]) {
                    continue
                }

                let newX = this.x + c + x;
                let newY = this.y + r + y;

                if (newX < 0 || newX >= COL || newY >= ROW) {
                    return true;
                }

                if (newY < 0) {
                    continue
                }

                if (board[newY][newX] != COLOR) {
                    return true
                }
            }
        }

        return false;
    }

    rotate() {
        let nextParttern = this.tetromino[(this.tetrominoN + 1) % this.activeTetromino.length]
        let move = 0;

        // kiểm tra khi quay va chạm với thành
        if (this.collosition(0, 0, nextParttern)) {
            if (this.x > COL / 2) {
                move = -1;
            } else { move = 1 }
        }

        if (!this.collosition(0, 0, nextParttern)) {
            this.undraw();
            this.x += move;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
        }
    }



}


const PIECES = [

    [S, "green"],
    [T, "black"],
    [O, "blue"],
    [L, "purble"],
    [I, "cyan"],
    [J, "orange"],
];



// khởi tạ0 1 mảnh rơi xuống
function randomPiece() {
    let r = Math.floor(Math.random() * (PIECES.length));
    return new Piece(PIECES[r][0], PIECES[r][1]);
}

let p = randomPiece();
console.log(p);

// nhập sự kiên mũi tên để di chuyển traí phải

document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key == "ArrowLeft" || e.key == "a") {
        p.moveLeft();
    }

    if (e.key == "ArrowRight" || e.key == "d") {
        p.moveRight();
    }

    if (e.key == "ArrowUp" || e.key == "w") {
        //quay hình

        p.rotate()
    }

    if (e.key == "ArrowDown" || e.key == "s") {
        p.moveDown();
    }
})


let gameOver = false;
let interval;

function drop() {

    interval = setInterval(function () {
        if (!gameOver) {
            p.moveDown();
        } else { clearInterval(interval) }
    }, 700)

}

drop();




