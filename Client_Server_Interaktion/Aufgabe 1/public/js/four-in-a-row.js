import { render } from "./lib/suiweb.js"
import { connect4Winner } from "./connect4-winner.js";

const COLUMNS = 6;
const ROWS = 7;
const URL = "http://localhost:3000/api/data/state?api-key=c4game"


let state = {
	board: Array(COLUMNS).fill('').map(el => Array(ROWS).fill('')),
	currentPlayer: "red",
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
}

function showBoard() {
    console.log("showBoard")
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
    })
}

function doTurn(element){
    let fieldNumber = element.target.id;
    let field = Math.floor(fieldNumber % COLUMNS);
    let row = Math.floor(fieldNumber / ROWS);

    if(!checkIfEmptyCell(field, row)) {
        alert("This cell is already used");
    }
    else if(!connect4Winner(getCurrentPlayer(), state.board)) {
        state.board[field][row] = getCurrentPlayer();

        let pieceElement = ["div",	{className: state.board[field][row] + " piece"}];
        let root = document.querySelector('[class="field ' + fieldNumber + '"]');
        
        console.log(state.currentPlayer)
        changeCurrentPlayer();
        console.log(state.currentPlayer)
        render(pieceElement, root);
    }
    else {
        alert("Game over!")
    }
}

function checkIfEmptyCell(field , row){
    return state.board[field][row] === "";
}

function getCurrentPlayer(){
    return state.currentPlayer 
}

function changeCurrentPlayer() {
    let title = document.getElementById('header-title')
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
            state = data;
            showBoard();
    })
 }

 function restartGame() {
    state.board = Array(COLUMNS).fill('').map(el => Array(ROWS).fill(''))
     showBoard()
 }

 function init(){
	showBoard()
    boardEventHandler()
	buttonEventHandler()
}

init()
