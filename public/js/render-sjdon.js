function renderSJDON(elements, appRoot) {
    const htmlNodes = []

    if(Array.isArray(elements[0])){
        elements.forEach(element => {
            htmlNodes.push(createHTMLNode(element, appRoot))
        })
    } else {
        htmlNodes.push(createHTMLNode(elements, appRoot))
    }

    htmlNodes.forEach(node => {
        appRoot.appendChild(node)
    })
}

function addAttributes(htmlNode, attributes) {
    for (const key in attributes) {
        htmlNode.setAttribute(key, attributes[key])
    }
}

function createHTMLNode(element, appRoot){
    if(Array.isArray(element)) {
        let htmlNode = document.createElement(element[0])
        if(element.length == 3) {
            addAttributes(htmlNode, element[1])
            renderSJDON(element[2], htmlNode)
        } else if(typeof element[1] === "string") {
            renderSJDON(element[1], htmlNode)
        } else {
            addAttributes(htmlNode, element[1])
        }
        return htmlNode
    }
}