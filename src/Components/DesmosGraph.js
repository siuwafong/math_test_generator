import React, { useRef } from 'react';
import Desmos from 'desmos'
import '../css/DesmosGraph.css'

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
    answered,

    }) => {
    
    let root = document.getElementById("root")
    let elt = document.createElement('div')
    root.appendChild(elt)


    let colors = [
        Desmos.Colors.RED,
        Desmos.Colors.BLUE,
        Desmos.Colors.GREEN,
        Desmos.Colors.PURPLE,
        Desmos.Colors.ORANGE
    ]

    // let calcRef = useRef(null) 
    // let calcDiv = document.getElementById("calcDiv")
    // let desmosgraphContainer = document.getElementById("desmosgraphContainer")

    // elt = document.createElement('div')
    elt.style.width = '500px'
    elt.style.height = '350px'

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
        yAxisStep: yAxisStep
    })

    for (let i = 0; i < graphfunction.length; i++) {
        calculator.setExpression({ 
            id: `graphid${i}`, 
            latex: graphfunction[i].latex, 
            lineStyle: graphfunction[i].style === 'dashed' ? Desmos.Styles.DASHED : Desmos.Styles.SOLID,
            color: graphfunction[i].color === "black" ? Desmos.Colors.BLACK : colors[(i+1) % 4],
            label: graphfunction[i].label,
            showLabel: graphfunction[i].showLabel
        })
    }

    // document.body.prepend(elt)

    elt.classList.add("calcDiv")

    // calcDiv.appendChild(elt)
    // calcDiv.prepend(elt)

    document.body.append(elt)

    if (answered === true) {
        console.log(elt.parentNode)
        // calculator.destroy()
        console.log(elt === null)
        if (elt.parentNode !== null) {
            console.log("preparing to remove graph")
            calculator.destroy()
            elt.parentNode.removeChild(elt)
            document.querySelectorAll(".calcDiv").forEach((item) => item.setAttribute("hidden", true) )
        }
    }

    // if (answered === true) {
    //     console.log(elt.parentNode)
    //     // calculator.destroy()
    //     console.log(elt === null)
    //     if (elt.parentNode !== null) {
    //         calculator.destroy()
    //         elt.parentNode.removeChild(elt)
    //         elt.setAttribute("hidden", true) 
    //     }
    // }

    

return (
        <div id="desmosgraphContainer">
            <div id="calcDiv">
                {/* <div ref={calcRef} >

                </div> */}
            </div>
        </div>
    )
}

export default DesmosGraph