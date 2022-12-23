function connect4Winner(color, board){

    //We check for horizontal, vertial and diagonal values

    let length = board.length
    let height = board[0].length

    for (let i = 0; i < length; i++) {
        let connected = 0
        for (let j = 0; j < height; j++) {
            if (board[i][j] === color) {
                connected += 1
                if (connected === 4) return true
            } else {
                connected = 0
            }
        }
    }

    for (let j = 0; j < height; j++) {
        let connected = 0
        for (let i = 0; i < length; i++) {
            if (board[i][j] === color) {
                connected += 1
                if (connected === 4) return true
            } else {
                connected = 0
            }
        }
    }

    for (let i = 0; i < length - 3; i++) {
        for (let j = 0; j < height - 3; j++) {
            if (board[i][j] === color) {
                if (
                    board[i + 1][j + 1] === color &&
                    board[i + 2][j + 2] === color &&
                    board[i + 3][j + 3] === color
                ) {
                    return true
                }
            }
        }
    }

    for (let i = 0; i < length - 3; i++) {
        for (let j = 3; j < height; j++) {
            if (board[i][j] === color) {
                if (
                    board[i + 1][j - 1] === color &&
                    board[i + 2][j - 2] === color &&
                    board[i + 3][j - 3] === color
                ) {
                    return true
                }
            }
        }
    }

    return false
}

export { connect4Winner }