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
    let rowsColsCount = 42
    for (let i = 0; i < rowsColsCount; i++) {
        let rand = Math.floor(Math.random() * (3 - 1 + 1))+1 // max-min+1 + min
        if (rand == 1){
            child = elt('div', {class: "red piece"})
            document.querySelector('.board').appendChild(elt('div', {class:'field'}, child))
        }else if (rand == 2){
            child = elt('div', {class: "blue piece"})
            document.querySelector('.board').appendChild(elt('div', {class:'field'}, child))
        }else{
            document.querySelector('.board').appendChild(elt('div', {class:'field'}))
        }

    }
}