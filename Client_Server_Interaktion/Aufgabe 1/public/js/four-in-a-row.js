import { render } from "./lib/suiweb.js"
import { connect4Winner } from "./connect4-winner.js";

const COLUMNS = 7;
const ROWS = 6;
const URL = "http://localhost:3000/api/data/state?api-key=c4game"


let state = {
	board: Array(ROWS).fill('').map(el => Array(COLUMNS).fill('')),
	currentPlayer: "red",
}

let stateseq = {
    element: [],
    player: [],
    current: 0,
}

let title = document.getElementById('header-title')

const App = () => [Board, { board: state.board }]

const Board = ({ board }) => {
    let flatBoard = [].concat(...board)
    let fields = flatBoard.map((type, index) => [Field, { type, index }])
    return (
        ["div", { className: "board" }, ...fields]
    )
}

const Field = ({ type, index }) => {
    if (type == '') {
        return ["div", { className: "field " + index, id: index  }]
    }
}

function showBoard() {
    const app = document.querySelector(".board")
    render([App], app)
    return app
}

function buttonEventHandler(){
	document.getElementById('button-load-server').addEventListener("click", () => {
		loadStateFromServer()
	})
    document.getElementById('button-save-server').addEventListener("click", () => {
		saveStateToServer()
	})
    document.getElementById('button-load-local').addEventListener("click", () => {
		loadStateFromLocalStorage()
	})
    document.getElementById('button-save-local').addEventListener("click", () => {
		saveStateToLocalStoreage()
	})
    document.getElementById('button-new-game').addEventListener("click", () => {
		restartGame()
	})
    document.getElementById('button-undo-last-move').addEventListener("click", () => {
        undoLastMove()
    })

}

function boardEventHandler(){
    document.querySelector('.board').addEventListener("click", (element) => {        
        doTurn(element)
    })
}

function doTurn(element){
    let fieldNumber = element.target.id;
    let column = fieldNumber % COLUMNS;
    let row = Math.floor(fieldNumber / COLUMNS);

    if(checkIfOccupiedCell(row,column)){
        alert("This cell is already used");
    }
    else if(!connect4Winner(getOtherPlayer(), state.board)) {
        state.board[row][column] = getCurrentPlayer();

        let pieceElement = ["div",	{className: state.board[row][column] + " piece"}];
        let root = document.querySelector('[class="field ' + fieldNumber + '"]');

        stateseq.element.push(element)
        stateseq.player.push(state.currentPlayer)
        stateseq.current +=1

        changeCurrentPlayer();
        render(pieceElement, root);
        setWinTitle();
    }
    else {
        showMessage(getCurrentPlayer + "hat gewonnen!")
        alert("Game")
        restartGame()
    }
}

function checkIfOccupiedCell(row , column){
    return state.board[row][column] !== '';
}

function getCurrentPlayer(){
    return state.currentPlayer 
}
function getOtherPlayer(){
    if (state.currentPlayer === "red") {
        return "blue"
    }
    else {
        return "red"
    }
}
function setWinTitle(){
    if (connect4Winner("red", state.board)) {
        title.textContent = "Rot hat gewonnen"
        title.style.backgroundColor = "red"
    }
    else if(connect4Winner("blue", state.board)) {
        title.textContent = "Blau hat gewonnen"
        title.style.backgroundColor = "blue"
    }
}

function changeCurrentPlayer() {
    if (state.currentPlayer === "blue") {
        title.textContent = "Rot ist am Zug"
        title.style.backgroundColor = "red"
        state.currentPlayer = "red"

    } 
    else if(state.currentPlayer === "red") {
        title.textContent = "Blau ist am Zug"
        title.style.backgroundColor = "blue"
        state.currentPlayer = "blue"


    }
}

function saveStateToServer() {
    fetch(URL, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(state),
    })
}

function saveStateToLocalStoreage(){
    localStorage.setItem("state", JSON.stringify(state));
}

function loadStateFromLocalStorage(){
    if (localStorage.getItem("state") != null) {
        state = JSON.parse(localStorage.getItem("state"));
    }
 }

 function loadStateFromServer(){
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
            state = data

    })
 }

 function restartGame() {
     let board = document.querySelector('.board')
     board.innerHTML = ""
     state.board = Array(ROWS).fill('').map(el => Array(COLUMNS).fill(''))
     state.currentPlayer = "red"
     title.textContent = "Rot ist am Zug"
     title.style.backgroundColor = "red"
     init()
 }

 function showMessage(message){
    title.textContent = message;
 }

 function undoLastMove() {
    if (stateseq.current > 0) {
        stateseq.current -= 1
        let element = stateseq.element.pop()
        let fieldNumber = element.target.id;
        let column = fieldNumber % COLUMNS;
        let row = Math.floor(fieldNumber / COLUMNS);

        state.board[row][column] = ""
        element.target.innerHTML = ""
        changeCurrentPlayer()
    }
    else {
        showMessage("No more undo possible")
    }
 }

 function reInitView(){
  if (!state.winner) {
    state.board = document.querySelector(".board");
  }

 }
 function init(){
	showBoard()
    boardEventHandler()
	buttonEventHandler()
}
init()