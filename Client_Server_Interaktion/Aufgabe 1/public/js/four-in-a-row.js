import { render } from "./lib/suiweb.js"

const COLUMNS = 6;
const ROWS = 7;
const url = "http://localhost:3000"
let currentPlayer = 0;
let game = Array(COLUMNS).fill('').map(el => Array(ROWS).fill(''))


function elt(type, attrs, ...children) {
    let node = document.createElement(type)
    for (a in attrs) {
        node.setAttribute(a, attrs[a])
    }
    for (let child of children) {
        if (typeof child != "string") node.appendChild(child)
        else node.appendChild(document.createTextNode(child))
    }
    return node
}

/**
 * In
 */
function showBoard() {
    reset()
    let flatGame = game.flat()
    for (let i = 0; i < flatGame.length; i++) {

        if (flatGame[i] == "r") {
            child = elt('div', {class: "red piece"})
            document.querySelector('.board').appendChild(elt('div', {class: 'field'}, child)).addEventListener('click', function (e) {
                click(e.target, i)
            })
        } else if (flatGame[i] == "b") {
            child = elt('div', {class: "blue piece"})
            document.querySelector('.board').appendChild(elt('div', {class: 'field'}, child)).addEventListener('click', function (e) {
                click(e.target, i)
            })
        } else {
            document.querySelector('.board').appendChild(elt('div', {class: 'field'})).addEventListener('click', function (e) {
                click(e.target, i);
            })
        }

    }
}

/**
 * Reset the state of the board
 */
function reset() {
    let board = document.querySelector('.board')
    board.innerHTML = ""
}

/**
 sets circles
 Beispiel: click auf 41, 41%7 = 6 -> Reihe 6 + 35 =41 -> circle wird auf 41 gelegt
 Wenn schon besetzt -> es muss
 */
function click(target, number) {
    document.querySelector('.board');
    let flatGame = game.flat()

    //divided by 6 to get the first box in the column
    let newNumber = number % 7 + 35
    while (newNumber >= 0) {
        if (flatGame[newNumber] == "") {
            break
        }
        newNumber = newNumber - 7
    }
    if (newNumber < 0) {
        alert("This column is full")
    } else {

        let x = Math.floor(newNumber / ROWS)
        let y = newNumber % ROWS
        currentPlayer ? game[x][y] = "b" : game[x][y] = "r"
        currentPlayer ? currentPlayer = 0 : currentPlayer = 1;
        setColorAndPlayer()
    }
    showBoard()
}


function setColorAndPlayer() {
    let title = document.getElementById('header-title')
    if (currentPlayer == 0) {
        title.textContent = "Rot ist am Zug"
        title.style.backgroundColor = "red"
    } else {
        title.textContent = "Blau ist am Zug"
        title.style.backgroundColor = "blue"
    }

}

function saveState() {
    fetch(url + "/api/data/" + "state" + "?api-key=c4game", {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(game),
    })
}

function loadState() {
    fetch(url + "/api/data/" + "state" + "?api-key=c4game")
        .then((response) => response.json())
        .then((data) => {
            if (Object.keys(data).length != 0) {
                game = data;
                showBoard();
            }
        })
}

function newGame() {
    startGame()
}

function startGame() {
    showBoard()
}

export {startGame}