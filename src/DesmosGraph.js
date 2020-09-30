import React from 'react';
import Desmos from 'desmos'


const DesmosGraph = ({ graphfunction, graphid }) => {


    let calcDiv = document.getElementById("calcDiv")

    const elt = document.createElement('div')
    elt.style.width = '500px'
    elt.style.height = '350px'

    const calculator = Desmos.GraphingCalculator(elt)
    calculator.setExpression({ id: 'graph1', latex: 'y=x^2' })

    // document.body.prepend(elt)

    elt.classList.add("calcDiv")
    document.body.insertBefore(elt, calcDiv)

    

return (
        <div id="desmosgraph-container">
            <div id="calcDiv">

            </div>
        </div>
    )
}

export default DesmosGraph