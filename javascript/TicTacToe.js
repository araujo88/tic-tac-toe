kaboom({
    global: true,
    fullscreen: false,
    width: 600,
    height: 600,
    scale: 1,
    debug: false,
    clearColor: [0, 0, 0, 0],
})

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let level = 0
let totalScore = 0
let posX
let posY
let x1, y1, x2, y2
let board
let hasFinished
let seed = randomInt(0, 1)
let player1Input = false
let player2Input = false
let winner

function checkClick() {
    if ((mousePos().x >= 0) && (mousePos().x < 200)) {
        posX = 100
        x1 = 0
    }
    else if ((mousePos().x >= 200) && (mousePos().x < 400)) {
        posX = 300
        x1 = 1
    }
    else if ((mousePos().x >= 500) && (mousePos().x <= 600)) {
        posX = 500
        x1 = 2
    }
    if ((mousePos().y >= 0) && (mousePos().y < 200)) {
        posY = 100
        y1 = 0
    }
    else if ((mousePos().y >= 200) && (mousePos().y < 400)) {
        posY = 300
        y1 = 1
    }
    else if ((mousePos().y >= 500) && (mousePos().y <= 600)) {
        posY = 500
        y1 = 2
    }
    console.log("Board x1: ", x1, "Board y1: ", y1, "Board value: ", board[x1][y1])
    console.log(board)
}

function checkWinner(gameTile) {
    if (gameTile == 1) {
        console.log("'X' wins!")
        winner = "Game over! Player wins!"
        wait(0.5, () => {
            go('gameOver')
        })
        return -1
    }
    if (gameTile == 2) {
        console.log("'O' wins!")
        winner = "Game over! Computer wins!"
        wait(0.5, () => {
            go('gameOver')
        })
        return 1
    }
}

function checkWin() {
    if ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2]) && (board[0][0] != 0)) {
        return checkWinner(board[0][0])
    }
    if ((board[0][2] == board[1][1]) && (board[1][1] == board[2][0]) && (board[0][2] != 0)) {
        return checkWinner(board[0][2])
    }
    for (let i=0; i<3; i++) {
        if ((board[0][i] == board[1][i]) && (board[1][i] == board[2][i]) && (board[0][i] != 0))
            return checkWinner(board[0][i])
        if ((board[i][0] == board[i][1]) && (board[i][1] == board[i][2]) && (board[i][0] != 0))
            return checkWinner(board[i][0])
    }
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            if (board[i][j] == 0) {
                return 2
            }
        }
    }
    console.log("Draw!")
    winner = "Draw!"
    wait(0.5, () => {
        go('gameOver')
    })
    return 0
}

function computerInput() {
    checkWin()
    while (true) {
        x2 = randomInt(0, 2);
        y2 = randomInt(0, 2);
        if (board[x2][y2] == 0) {
            board[x2][y2] = 2;
            add([
                pos(100*(1+2*x2), 100*(1+2*y2)),
                origin('center'),
                sprite("o", {
                    width: width(),
                    height: height(),
                    tiled: true,
                }),
            ]);
            console.log("Position placed for O! (x, y) = ", 100*(1+2*x2), 100*(1+2*y2))
            player2Input = false
            player1Input = true
            break;
        }
    }
}

// Sprites
loadSprite('x', 'X.png')
loadSprite('o', 'O.png')

// Background
loadSprite('background', 'board.png')

// SFX
//loadSound("suspense", "assets/sfx/suspense2.mp3")

// Music
//loadSound("intro", "assets/music/intro.mp3")

scene("game", () => {
    layers(['bg', 'obj', 'ui'], 'obj')

    camIgnore(["bg", "ui"]);

    const map = [
        '   ',
        '   ',
        '   ',]

    const levelCfg = {
        width: 200,
        height: 200,
        'x': [sprite('x'), solid(), scale(1), 'x'],
        'o': [sprite('x'), solid(), scale(1), 'o'],
    }

    const gameLevel = addLevel(map, levelCfg)

    add([ 
        sprite("background"),
        layer("bg")
    ])

    if (player2Input == true) {
        computerInput()
    }

    if (player1Input == true) {
        wait(1, () => {
            mouseClick(() => {
                checkClick()
                if (board[x1][y1] == 0) {
                    board[x1][y1] = 1
                    add([
                        pos(posX, posY),
                        origin('center'),
                        sprite("x", {
                            width: width(),
                            height: height(),
                            tiled: true,
                        }),
                    ]);
                    console.log("Position placed for X! (x, y) = ", posX, posY)
                    player2Input = true
                    player1Input = false
                    checkWin()
                    if (checkWin() == 2) {
                        wait(0.5, () => {
                            computerInput()
                            checkWin()
                        })
                    }
                }
            });
        })
    }
})

scene("menu", () => {
    board = Array(3).fill(0).map(()=>Array(3).fill(0))
    seed = randomInt(0, 1)
    console.log("Seed: ", seed)
    player1Input = false
    player2Input = false
    if (seed == 0) {
        player1Input = true
    }
    else {
        player2Input = true
    }

	add([
		text("Tic-Tac-Toe"),
        origin('center'),
		pos(width()/2, height()/8),
        color(0, 0, 0),
        scale(5)
	]);

	add([
		rect(160, 20),
        origin('center'),
		pos(width()/2, height()/2),
        scale(2),
		"button",
		{
			clickAction: () => {go('game')}
		},
	]);

	add([
		text("Play game"),
        origin('center'),
		pos(width()/2, height()/2),
        scale(2),
		color(0, 0, 0)
	]);

	add([
		rect(160, 20),
        origin('center'),
		pos(width()/2, height()/2+40),
        scale(2),
		"button",
		{
			clickAction: () => window.open('https://kaboomjs.com/', '_blank'),
		},
	]);

	add([
		text("Learn Kaboom.js"),
        origin('center'),
		pos(width()/2, height()/2+40),
        scale(2),
		color(0, 0, 0)
	]);

    add([
		rect(160, 20),
        origin('center'),
		pos(width()/2, height()/2+80),
        scale(2),
		"button",
		{
			clickAction: () => window.open('https://github.com/araujo88/', '_blank'),
		},
	]);

	add([
		text("Source code"),
        origin('center'),
		pos(width()/2, height()/2+80),
        scale(2),
		color(0, 0, 0)
	]);

	action("button", b => {
		if (b.isHovered()) {
			b.use(color(0.7, 0.7, 0.7));
		} else {
			b.use(color(1, 1, 1));
		}

		if (b.isClicked()) {
			b.clickAction();
		}

	});

});

scene("gameOver", () => {

	add([
		text(winner),
        origin('center'),
		pos(width()/2, height()/8),
        color(0, 0, 0),
        scale(3)
	]);

	add([
		rect(160, 20),
        origin('center'),
		pos(width()/2, height()/2),
        scale(2),
		"button",
		{
			clickAction: () => {
                board = Array(3).fill(0).map(()=>Array(3).fill(0))
                seed = randomInt(0, 1)
                console.log("Seed: ", seed)
                player1Input = false
                player2Input = false
                if (seed == 0) {
                    player1Input = true
                }
                else {
                    player2Input = true
                }
                go('game')
            }
		},
	]);

	add([
		text("Play again"),
        origin('center'),
		pos(width()/2, height()/2),
        scale(2),
		color(0, 0, 0)
	]);

	add([
		rect(160, 20),
        origin('center'),
		pos(width()/2, height()/2+40),
        scale(2),
		"button",
		{
			clickAction: () => {
                go('menu')
            }
		},
	]);

	add([
		text("Menu"),
        origin('center'),
		pos(width()/2, height()/2+40),
        scale(2),
		color(0, 0, 0)
	]);


	action("button", b => {
		if (b.isHovered()) {
			b.use(color(0.7, 0.7, 0.7));
		} else {
			b.use(color(1, 1, 1));
		}

		if (b.isClicked()) {
			b.clickAction();
		}

	});
});

start("menu");