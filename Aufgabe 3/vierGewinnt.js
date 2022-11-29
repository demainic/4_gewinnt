const COLUMNS = 6;
const ROWS = 7;
let currentBox;
let currenBoxNumber;
currentPlayer = 0;
let game = Array(COLUMNS).fill('').map(el => Array(ROWS).fill(''))

/*
// createTextNode
 */

function elt (type, attrs, ...children) {
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

/*
create board
 */
function showBoard (){
    reset()
    var button = document.getElementById('button').addEventListener('click', newGame);
    let board = document.querySelector('.board')
    let flatGame = game.flat()
    for (let i = 0; i < flatGame.length; i++) {

        if (flatGame[i] == "r"){
            child = elt('div', {class: "red piece"})
            document.querySelector('.board').appendChild(elt('div', {class:'field'}, child)).addEventListener('click', function(e){
                click(e.target,i)
            })
        }else if (flatGame[i] == "b"){
            child = elt('div', {class: "blue piece"})
            document.querySelector('.board').appendChild(elt('div', {class:'field'}, child)).addEventListener('click', function(e){
                click(e.target,i)
            })
        }else{
            document.querySelector('.board').appendChild(elt('div', {class:'field'})).addEventListener('click', function(e){
                click(e.target,i)
            })
        }

    }
}

/*
reset board
 */
function reset(){
    console.log("reset")
    let board = document.querySelector('.board')
    board.innerHTML = ""

}
/*
sets circles
 */
function click(target,number){
    console.log("click")
    let board = document.querySelector('.board')
    let flatGame = game.flat()
    if(flatGame[number]!=""){
        alert("This field is already taken")
    }
    else{
        let x = Math.floor(number/ROWS)
        let y = number%ROWS
        currentPlayer ? game[x][y] = "b" : game[x][y] = "r"
        currentPlayer ? currentPlayer = 0 : currentPlayer = 1;
    }
    showBoard()

}



function newGame(){
    console.log("newGame")
    startGame()

}



// function changeByInterval() {
//     let randColor = Math.floor(Math.random() * (3 - 1 + 1))+1 // max-min+1 + min
//     let randPlace = Math.floor(Math.random() * COLUMNS * ROWS)
//     let y = Math.trunc(randPlace / ROWS)
//     let x = (randPlace % ROWS)
//
//     if (randColor == 1){
//         game[y][x] = "r"
//     }else if (randColor == 2){
//         game[y][x] = "b"
//     }else {
//         game[y][x] = ""
//     }
//     showBoard()
// }

function startGame(){
    game = Array(COLUMNS).fill('').map(el => Array(ROWS).fill(''))
    showBoard()
}