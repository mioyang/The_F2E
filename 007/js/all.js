//初始化
var canvas = document.getElementById("myGame");
var ctx = canvas.getContext("2d");

////////////////////元件變數////////////////////
//圓球
var ballRadius = 12;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;

//下方反彈磚
var paddleHeight = 15;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = canvas.height - paddleHeight;
var rightPressed = false;
var leftPressed = false;

//磚塊
var brickRowCount = 3;
var brickColumnCount = 10;
var brickWidth = 75;
var brickHeight = 30;
var brickPadding = 10;
var brickOffsetTop = 40;
var brickOffsetLeft = 60;

var bricks = [];
for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
};

//分數
var score = 0;

//生命值
var lives = 3;

////////////////////各種動作////////////////////
//控制反彈磚
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
};

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
};

//撞擊偵測
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("恭喜過關!");
                        document.location.reload();
                    }
                }
            }
        }
    }
};
//偵測滑鼠移動
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
};


////////////////////定義元件樣式////////////////////
//定義繪製圓球
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#ED784A";
    ctx.fill();
    ctx.closePath();
};

//定義繪製反彈磚
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "#005CAF";
    ctx.fill();
    ctx.closePath();
};

//定義磚塊區
function drawBricks() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#005CAF";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
};
//計算分數
function drawScore() {
    ctx.font = "18px Rubik";
    ctx.fillStyle = "#ED784A";
    ctx.fillText("分數: " + score, 8, 20);
}
//生命值
function drawLives() {
    ctx.font = "18px Rubik";
    ctx.fillStyle = "#ED784A";
    ctx.fillText("生命值: " + lives, canvas.width - 85, 20);
}

////////////////////動起來吧！////////////////////
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //繪製磚塊
    drawBricks();
    //繪製圓球
    drawBall();
    //繪製反彈磚
    drawPaddle();
    //球撞到磚塊，磚塊消失
    collisionDetection();
    //分數計算
    drawScore();
    //生命值
    drawLives();

    //球撞到牆壁改變方向
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    };
    //球撞到球拍反彈，撞到底部結束遊戲
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                alert("Game Over");
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    };

    //移動反彈磚
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
    };

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
};

draw();