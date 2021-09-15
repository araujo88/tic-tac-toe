kaboom({
    global: true,
    fullscreen: false,
    width: 600,
    height: 600,
    scale: 1,
    debug: false,
    clearColor: [0, 0, 0, 0],
})

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
let xWin1
let xWin2
let yWin1
let yWin2
let waitTime = 0.5
let difficulty

function randomInt(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function checkClick() {
    if ((mousePos().x >= 0) && (mousePos().x < 200)) {
        posX = 100
        x1 = 0
    }
    else if ((mousePos().x >= 200) && (mousePos().x < 400)) {
        posX = 300
        x1 = 1
    }
    else if ((mousePos().x >= 400) && (mousePos().x <= 600)) {
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
    else if ((mousePos().y >= 400) && (mousePos().y <= 600)) {
        posY = 500
        y1 = 2
    }
    console.log("Board x1: ", x1, "Board y1: ", y1, "Board value: ", board[x1][y1])
    console.log("Mouse position x: ", mousePos().x, "Mouse position y: ", mousePos().y)
    console.log(board)
}

function checkWinner(gameTile) {
    if (gameTile == 1) {
        console.log("'X' wins!")
        winner = "Game over! Player wins!"
        wait(2, () => {
            go('gameOver')
        })
        waitTime = 0.5
        return -1
    }
    if (gameTile == 2) {
        console.log("'O' wins!")
        winner = "Game over! Computer wins!"
        wait(2, () => {
            go('gameOver')
        })
        waitTime = 0.5
        return 1
    }
}

function checkWin() {
    if ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2]) && (board[0][0] != 0)) {
        waitTime = 3
        xWin1 = 0
        yWin1 = 0
        xWin2 = 2
        yWin2 = 2
        add([ 
            sprite("diag1"),
            layer("ui")
        ])
        return checkWinner(board[0][0])
    }
    if ((board[0][2] == board[1][1]) && (board[1][1] == board[2][0]) && (board[0][2] != 0)) {
        waitTime = 3
        xWin1 = 0
        yWin1 = 2
        xWin2 = 2
        yWin2 = 0
        add([ 
            sprite("diag2"),
            layer("ui")
        ])
        return checkWinner(board[0][2])
    }
    for (let i=0; i<3; i++) {
        if ((board[0][i] == board[1][i]) && (board[1][i] == board[2][i]) && (board[0][i] != 0)) {
            waitTime = 3
            xWin1 = 0
            yWin1 = i
            xWin2 = 2
            yWin2 = i
            if (xWin1 == 0 && yWin1 == 0) {
                add([ 
                    sprite("row1"),
                    layer("ui")
                ])
            }
            else if (xWin1 == 0 && yWin1 == 1) {
                add([ 
                    sprite("row2"),
                    layer("ui")
                ])
            }
            else {
                add([ 
                    sprite("row3"),
                    layer("ui")
                ])
            }
            return checkWinner(board[0][i])
        }
        if ((board[i][0] == board[i][1]) && (board[i][1] == board[i][2]) && (board[i][0] != 0)) {
            waitTime = 3
            xWin1 = i
            yWin1 = 0
            xWin2 = i
            yWin2 = 2
            if (xWin1 == 0 && yWin1 == 0) {
                add([ 
                    sprite("col1"),
                    layer("ui")
                ])
            }
            else if (xWin1 == 1 && yWin1 == 0) {
                add([ 
                    sprite("col2"),
                    layer("ui")
                ])
            }
            else {
                add([ 
                    sprite("col3"),
                    layer("ui")
                ])
            }
            return checkWinner(board[i][0])
        }
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
    wait(2, () => {
        go('gameOver')
    })
    waitTime = 0.5
    return 0
}

function evaluate(gameTile) {
    if (gameTile == 1) {
        return -1
    }
    if (gameTile == 2) {
        return 1
    }
}

function checkBoard() {
    if ((board[0][0] == board[1][1]) && (board[1][1] == board[2][2]) && (board[0][0] != 0)) {
        return evaluate(board[0][0])
    }
    if ((board[0][2] == board[1][1]) && (board[1][1] == board[2][0]) && (board[0][2] != 0)) {
        return evaluate(board[0][2])
    }
    for (let i=0; i<3; i++) {
        if ((board[0][i] == board[1][i]) && (board[1][i] == board[2][i]) && (board[0][i] != 0)) {
            return evaluate(board[0][i])
        }
        if ((board[i][0] == board[i][1]) && (board[i][1] == board[i][2]) && (board[i][0] != 0)) {
            return evaluate(board[i][0])
        }
    }
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            if (board[i][j] == 0) {
                return 2
            }
        }
    }
    return 0
}

function computerInput() {
    player1Input = false
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
                play("pop")
            ]);
            console.log("Position placed for O! (x, y) = ", 100*(1+2*x2), 100*(1+2*y2))
            player2Input = false
            player1Input = true
            break;
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////

function isMovesLeft() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == 0) {
                    return true
                }
            }
        }
        return false
}

function minimax(depth, isMax) {
    let score = checkBoard()
    let best
    
    // If Maximizer has won the game return his/her
    // evaluated score
    if (score == 1) {
        return score
    }
    
    // If Minimizer has won the game return his/her
    // evaluated score
    if (score == -1) {
        return score
    }
    
    // If there are no more moves and no winner then
    // it is a tie
    if (isMovesLeft() == false) {
        return 0
    }
    
    // If this maximizer's move
    if (isMax) {    
        best = -1000
    
        // Traverse all cells
        for (let i = 0; i < 3; i++) {      
            for (let j = 0; j < 3; j++) {  
                
                // Check if cell is empty
                if (board[i][j] == 0) {
                    
                    // Make the move
                    board[i][j] = 2
    
                    // Call minimax recursively and choose
                    // the maximum value
                    best = Math.max(best, minimax(depth + 1, !isMax))
                    
                    // Undo the move
                    board[i][j] = 0
                }
            }
        }
        return best
    }
    // If this minimizer's move
    else {
        best = 1000
    
        // Traverse all cells
        for (let i = 0; i < 3; i++) {      
            for (let j = 0; j < 3; j++) {  
                
                // Check if cell is empty
                if (board[i][j] == 0) {
                    
                    // Make the move
                    board[i][j] = 1
    
                    // Call minimax recursively and choose
                    // the minimum value
                    best = Math.min(best, minimax(depth + 1, !isMax))
    
                    // Undo the move
                    board[i][j] = 0
                }
            }
        }
        return best
    }
}

function computerInput2() {
    player1Input = false
    checkWin()

    let bestVal = -10
    let moveVal

    // Traverse all cells, evaluate minimax function for
    // all empty cells. And return the cell with optimal
    // value.
    for (let i = 0; i < 3; i++) {      
        for (let j = 0; j < 3; j++) {  
        
            // Check if cell is empty
            if (board[i][j] == 0) {
            
                // Make the move
                board[i][j] = 2

                // compute evaluation function for this
                // move.
                moveVal = minimax(0, false)

                // Undo the move
                board[i][j] = 0

                // If the value of the current move is
                // more than the best value, then update
                // best
                if (moveVal > bestVal) {               
                    x2 = i;
                    y2 = j;
                    bestVal = moveVal
                }
            }
        }
    }
    board[x2][y2] = 2;
    add([
        pos(100*(1+2*x2), 100*(1+2*y2)),
        origin('center'),
        sprite("o", {
            width: width(),
            height: height(),
            tiled: true,
        }),
        play("pop")
    ]);
    console.log("Position placed for O! (x, y) = ", 100*(1+2*x2), 100*(1+2*y2))
    player2Input = false
    player1Input = true
}

////////////////////////////////////////////////////////////////////////////////////////////

// Sprites
loadSprite('x', 'X.png')
loadSprite('o', 'O.png')

loadSprite('diag1', 'diag1.png')
loadSprite('diag2', 'diag2.png')
loadSprite('row1', 'row1.png')
loadSprite('row2', 'row2.png')
loadSprite('row3', 'row3.png')
loadSprite('col1', 'col1.png')
loadSprite('col2', 'col2.png')
loadSprite('col3', 'col3.png')

// Background
loadSprite('background', 'board.png')

// SFX
loadSound("pop", "pop.mp3")

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
        // computerInput()
        computerInput2()
    }

    if (player1Input == true) {
        wait(waitTime, () => {
            mouseClick(() => {
                checkClick()
                if (board[x1][y1] == 0 && checkWin() == 2 && player1Input == true) {
                    board[x1][y1] = 1
                    add([
                        pos(posX, posY),
                        origin('center'),
                        sprite("x", {
                            width: width(),
                            height: height(),
                            tiled: true,
                        }),
                        play("pop")
                    ]);
                    console.log("Position placed for X! (x, y) = ", posX, posY)
                    player1Input = false
                    player2Input = true
                    checkWin()
                    if (checkWin() == 2) {
                        player1Input = false
                        wait(waitTime, () => {
                            if (difficulty == "easy") {
                                computerInput()
                            }
                            if (difficulty == "hard") {
                                computerInput2()
                            }
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
    xWin1 = null
    xWin2 = null
    yWin1 = null
    xWin2 = null
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
			clickAction: () => {go('selectDifficulty')}
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
                xWin1 = null
                xWin2 = null
                yWin1 = null
                xWin2 = null
                if (seed == 0) {
                    player1Input = true
                }
                else {
                    player2Input = true
                }
                go('selectDifficulty')
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

scene("selectDifficulty", () => {

	add([
		text("Select difficulty:"),
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
                difficulty = "easy"
                go('game')
            }
		},
	]);

	add([
		text("Easy"),
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
                difficulty = "hard"
                go('game')
            }
		},
	]);

	add([
		text("Hard"),
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
			clickAction: () => {
                go('menu')
            }
		},
	]);

	add([
		text("Menu"),
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

start("menu");
