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
                click(e.target,i);
                console.log(i)
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
Beispiel: click auf 41, 41%7 = 6 -> Reihe 6 + 35 =41 -> circle wird auf 41 gelegt
Wenn schon besetzt -> es muss
 */
function click(target,number){
    console.log("click")
    let board = document.querySelector('.board')
    let flatGame = game.flat()

    newNumber = number%7+35 //divided by 6 to get the first box in the column
    while(newNumber>=0){
        // console.log("new number:", newNumber)
        if (flatGame[newNumber] == "") {
        break
        }
        newNumber = newNumber-7
    }
//
    if(newNumber<0){
        alert("This column is full")
    }
    else{
        let x = Math.floor(newNumber/ROWS)
        let y = newNumber%ROWS
        currentPlayer ? game[x][y] = "b" : game[x][y] = "r"
        currentPlayer ? currentPlayer = 0 : currentPlayer = 1;
        setColorAndPlayer()
    }
    showBoard()

}


function setColorAndPlayer(){
    title = document.getElementById('header-title')
    if(currentPlayer == 0){
        title.textContent = "Rot ist am Zug"
        title.style.backgroundColor = "red"
    }else{
        title.textContent = "Blau ist am Zug"
        title.style.backgroundColor = "blue"
    }

}


function newGame(){
    console.log("newGame")
    startGame()

}



function startGame(){
    game = Array(COLUMNS).fill('').map(el => Array(ROWS).fill(''))
    showBoard()
}