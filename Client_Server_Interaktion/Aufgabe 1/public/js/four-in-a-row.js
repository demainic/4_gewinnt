import { render } from "./lib/suiweb.js"
import { connect4Winner } from "./connect4-winner.js";

const COLUMNS = 6;
const ROWS = 7;
const URL = "http://localhost:3000/api/data/state?api-key=c4game"


let state = {			
	board: Array(COLUMNS).fill('').map(el => Array(ROWS).fill('')),
	currentPlayer: "r",
}

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

    if (type == 'r') {
        return ["div", { className: "field " + index, id: index  }, ["div", { className: "red piece" }]]
    }

    if (type == 'b') {
        return ["div", { className: "field " + index, id: index }, ["div", { className: "blue piece" }]]
    }
}

function showBoard() {
    const app = document.querySelector(".suiweb")
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

}

function boardEventHandler(){
    document.querySelector('.board').addEventListener("click", (element) => {        
        doTurn(element)
        checkIfGameOver()
    })
}


function doTurn(element){
    let fieldNumber = element.target.id;
    let field = Math.floor(fieldNumber % COLUMNS);
    let row = Math.floor(fieldNumber / ROWS);
    
    if(!checkIfEmptyCell(field, row)) {
        alert("This cell is already used")
    }
    else {
        state.board[field][row] = getCurrentPlayer()
        state.currentPlayer === "r" ? state.currentPlayer = "b" : state.currentPlayer = "r"
    }
     
    console.log(state.board)
    setColorInTitle();   
}

function checkIfGameOver(){
    return connect4Winner(getCurrentPlayer, state.board) ? alert("Game finished") : '';
}

function checkIfEmptyCell(field , row){
    return state.board[field][row] === "";
}

function getCurrentPlayer(){
    return state.currentPlayer === 'r' ? 'r' : 'b' 
}

function setColorInTitle() {
    let title = document.getElementById('header-title')
    if (state.currentPlayer === "b" ) {
        title.textContent = "Rot ist am Zug"
        title.style.backgroundColor = "red"
    } else {
        title.textContent = "Blau ist am Zug"
        title.style.backgroundColor = "blue"
        state.currentPlayer = "r"
    }

}

function saveStateToServer() {
    fetch(URL, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(state.board),
    }).then(result => console.log(result))
}

function saveStateToLocalStoreage(){
    localStorage.setItem("state", JSON.stringify(state));
}

function loadStateFromLocalStorage(){
 if (localStorage.getItem("state") != null) {
    state.board = JSON.parse(localStorage.getItem("state"));
 }
 }

 function loadStateFromServer(){
    fetch(URL)
    .then((response) => response.json())
    .then((data) => {
            state.board = data;
            showBoard();
    })
 }

 function restartGame() {
    let title = document.getElementById('header-title')
    if (state.currentPlayer === "b" ) {
        title.textContent = "Rot ist am Zug"
        title.style.backgroundColor = "red"
    }
    state.board = Array(COLUMNS).fill('').map(el => Array(ROWS).fill(''))
 }

 function init(){
	showBoard()
    boardEventHandler()
	buttonEventHandler()
}

init()
