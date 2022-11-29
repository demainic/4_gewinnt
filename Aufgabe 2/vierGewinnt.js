const COLUMNS = 6;
const ROWS = 7;
let game = Array(COLUMNS).fill('').map(el => Array(ROWS).fill(''))

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

function showBoard (){
    reset()
    let board = document.querySelector('.board')
    let flatGame = game.flat()
    for (let i = 0; i < flatGame.length; i++) {

        if (flatGame[i] == "r"){
            child = elt('div', {class: "red piece"})
            document.querySelector('.board').appendChild(elt('div', {class:'field'}, child))
        }else if (flatGame[i] == "b"){
            child = elt('div', {class: "blue piece"})
            document.querySelector('.board').appendChild(elt('div', {class:'field'}, child))
        }else{
            document.querySelector('.board').appendChild(elt('div', {class:'field'}))
        }

    }
}

function reset(){
    let board = document.querySelector('.board')
    board.innerHTML = ""

}
function changeByInterval() {
    let randColor = Math.floor(Math.random() * (3 - 1 + 1))+1 // max-min+1 + min
    let randPlace = Math.floor(Math.random() * COLUMNS * ROWS)
    let y = Math.trunc(randPlace / ROWS)
    let x = (randPlace % ROWS)

    if (randColor == 1){
        game[y][x] = "r"
    }else if (randColor == 2){
        game[y][x] = "b"
    }else {
        game[y][x] = ""
    }


    showBoard()
}