import { render } from "./lib/suiweb.js"
import { connect4Winner} from "./connect4-winner.js";

const COLUMNS = 6;
const ROWS = 7;
const URL = "http://localhost:3000/api/data/state?api-key=c4game"


let state = {			
	board: Array(COLUMNS).fill('').map(el => Array(ROWS).fill('')),
	currentPlayer: 'b',
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
        return ["div", { className: "field " + index }]
    }

    if (type == 'r') {
        return ["div", { className: "field " + index }, ["div", { className: "red piece" }]]
    }

    if (type == 'b') {
        return ["div", { className: "field " + index }, ["div", { className: "blue piece" }]]
    }
}

function showBoard() {
    const app = document.querySelector(".board")
    render([App], app)
    return app
}

function buttonEventHandler(){
	document.querySelector('#button-load-server').addEventListener("click", () => {
		loadStateFromServer()
	})
    document.querySelector('#button-save-server').addEventListener("click", () => {
		saveStateToServer()
	})
    document.querySelector('#button-load-local').addEventListener("click", () => {
		loadStateFromLocalStorage()
	})
    document.querySelector('#button-save-local').addEventListener("click", () => {
		saveStateToLocalStoreage()
	})
    document.querySelector('#button-new-game').addEventListener("click", () => {
		restartGame()
	})

}

function boardEventHAndler(){

}


function doTurn(){
    if(state.currentPlayer === 'r'){

    }

}


function setColorAndPlayer() {
    let title = document.getElementById('header-title')
    if (state.currentPlayer === "b") {
        title.textContent = "Rot ist am Zug"
        title.style.backgroundColor = "red"
    } else {
        title.textContent = "Blau ist am Zug"
        title.style.backgroundColor = "blue"
    }

}


function saveStateToServer() {
    fetch(URL, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(state.board),
    }).then(result => console.log(result))
}

function loadStateFromLocalStorage(){
 if (localStorage.getItem("board") != null) {
    state.board = JSON.parse(localStorage.getItem("board"));
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
    state.board = Array(COLUMNS).fill('').map(el => Array(ROWS).fill(''))
 }

 function init(){
	showBoard()
	buttonEventHandler()
}

init()