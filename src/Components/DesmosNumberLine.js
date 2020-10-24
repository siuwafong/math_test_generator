import React from 'react'
import Desmos from 'desmos'
import './DesmosGraph.css'

const DesmosNumberLine = ({ 
    leftNumber = -1,
    leftSymbol = "<",
    rightNumber = 1,
    rightSymbol = "<",
    graphfunction =  `${leftNumber}${leftSymbol}x${rightSymbol}${rightNumber} \\left\\{-0.1<y<0.1\\right\\}`, 
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
    showYAxis = false,
    settingsMenu = false,
    zoomButtons = false,
    }) => {

// TODO:
// add leq and geq random symbols "<=" or "<" and ">" or ">=" 
// add points with hollow and filled styling based on leq/geq symbols

    let calcDiv = document.getElementById("calcDiv")

    const elt = document.createElement('div')
    elt.style.width = '500px'
    elt.style.height = '400px'

    let calculator = Desmos.GraphingCalculator(elt, {
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
        yAxisStep: yAxisStep,
        showYAxis: showYAxis,
        settingsMenu: settingsMenu,
        zoomButtons: zoomButtons,
    })

    calculator.setExpression({ 
        id: graphid, 
        latex: graphfunction 
    })

    // document.body.prepend(elt)

    elt.classList.add("calcDiv")
    document.body.insertBefore(elt, calcDiv)

    calculator.setExpression({
        latex: `(${leftNumber}, 0)`,
        pointStyle: leftSymbol === "<" ? Desmos.Styles.OPEN : Desmos.Styles.SOLID
    })

    calculator.setExpression({
        latex: `(${rightNumber}, 0)`,
        pointStyle: rightSymbol === "<" ? Desmos.Styles.OPEN : Desmos.Styles.SOLID
    })

    

return (
        <div id="desmosNumberLine-container">
            <div id="numberLineDiv">
                <button onClick={e => console.log(calculator.getState())}>
                    GET STATE
                </button>
            </div>
        </div>
    )
}

export default DesmosNumberLine