NUM_ROWS = 6
NUM_COLS = 7
function connect4Winner(player, board) {

    let rows = getRows(board)
    let cols = getCols(board)
    let diag1= getDiags1(board)
    let diag2= getDiags2(board)
    let won = false
    let winnerCount = 0
    console.log(diag1)
    console.log(diag2)

    if(rowWinner(player, rows)||rowWinner(player, cols)||rowWinner(player, diag1)||rowWinner(player, diag2)){

        return true
    }
    return false

}

let rowWinner = function rowWinner(player, array) {
    for(let i = 0; i < array.length; i++) {
        let winnerCount = 0
        for(let j = 0; j < array[i].length; j++) {
            if(array[i][j] === player) {
                winnerCount++
                if(winnerCount === 4) {
                    return true
                }
            } else {
                winnerCount = 0
            }
        }
        if (array[i] === player) {
            winnerCount++
        } else {
            winnerCount = 0
        }
        if (winnerCount === 4) {
            return true
            console.log('winner')
        }
    }
    return false
}
/*
array mit rows
 */
function getRows(board) {
    // NUM_ROWS = 6
    let rows = []
    for (let i = 0; i < NUM_ROWS; i++) {
        rows.push(board[i])
    }
    return rows
}

/*
array mit cols
 */
function getCols(board) {
    // NUM_ROWS = 6
    // NUM_COLS = 7
    let cols = []
    for (let i = 0; i < NUM_COLS; i++) {
        let col = []
        for (let j = 0; j < NUM_ROWS; j++) {
            col.push(board[j][i])
        }
        cols.push(col)
    }
    return cols
}
/*
array mit diag
 */
function getDiags1(board) {
    let diag1 = []
    for (let i = 0; i < NUM_COLS; i++) {
        for (let j = 0; j < NUM_ROWS; j++) {
            if (diag1[i + j] === undefined) {
                diag1[i + j] = [board[j][i]]
            } else {
                diag1[i + j].push(board[j][i])

            }
        }

    }

    return diag1
}

function getDiags2(board) {
    let diag2 = []
    let newBoard = board.reverse()
    for (let i = 0; i < NUM_COLS; i++) {
        for (let j = 0; j < NUM_ROWS; j++) {
            if (diag2[i + j] === undefined) {
                diag2[i + j] = [newBoard[j][i]]
            } else {
                diag2[i + j].push(newBoard[j][i])

            }
        }

    }

    return diag2
}
module.exports = { connect4Winner, getRows, rowWinner, getCols, getDiags1, getDiags2 }
const testBoard = [
    [ '_', '_', '_', '_', '_', '_', '_' ],
    [ '_', '_', '_', '_', '_', '_', '_' ],
    [ '_', '_', '_', '_', 'b', '_', '_' ],
    [ '_', '_', '_', 'r', 'r', 'b', 'r' ],
    [ '_', '_', 'b', 'r', 'b', 'r', 'b' ],
    [ 'r', 'b', 'b', 'r', 'b', 'r', 'b' ]
]
connect4Winner('r', testBoard)