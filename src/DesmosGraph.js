import React from 'react';
import Desmos from 'desmos'
import './DesmosGraph.css'

const DesmosGraph = ({ 
    graphfunction = 'y=x', 
    graphid = Math.ceil(Math.random() * 1000000),
    keypad = false, 
    expressions = false ,
    lockViewport = false,
    pointsOfInterest = true,
    xAxisLabel = 'x',
    yAxisLabel = 'y',
    degreeMode = false,
    xAxisStep = 0,
    yAxisStep = 0,
    }) => {


    let calcDiv = document.getElementById("calcDiv")

    const elt = document.createElement('div')
    elt.style.width = '500px'
    elt.style.height = '350px'

    const calculator = Desmos.GraphingCalculator(elt, {
        keypad: keypad,
        expressions: expressions,
        xAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
        yAxisArrowMode: Desmos.AxisArrowModes.POSITIVE,
        lockViewport: lockViewport,
        pointsOfInterest: pointsOfInterest,
        xAxisLabel: xAxisLabel,
        yAxisLabel: yAxisLabel,
        degreeMode: degreeMode,
        xAxisStep: xAxisStep,
        yAxisStep: yAxisStep
    })
    calculator.setExpression({ id: graphid, latex: graphfunction })

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