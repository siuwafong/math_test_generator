import React, { useState } from 'react'
import "katex/dist/katex.min.css"
import { InlineMath, BlockMath } from 'react-katex';

function MultipleAnswerQuestion({
    questionInfo, 
    optionsOrder, 
    answered, 
    setAnswered,
    answerMsg,
    setAnswerMsg,
    score,
    setScore,
    gameOver
}) {

    const [unselectedOptions, setUnselectedOptions] = useState(questionInfo.answers.map(item => item.option))
    const [selectedOptions, setSelectedOptions] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState("")

    const incorrectResponses = questionInfo.answers.filter(item => item.correct === false).map(item => item.option)
    const correctResponses = questionInfo.answers.filter(item => item.correct === true).map(item => item.option)

    console.log(incorrectResponses, correctResponses)

    // let choice

    const sortOptions = (selectedOption, change) => {
        if (change === "remove") {
            setSelectedOptions(() => selectedOptions.filter(item => item !== selectedOption))
            setUnselectedOptions(() => unselectedOptions.concat(selectedOption))
        } else if (change === "add") {
            setUnselectedOptions(() => unselectedOptions.filter(item => item !== selectedOption))
            setSelectedOptions(() => selectedOptions.concat(selectedOption))
        }
    }

    const checkAnswers = (unselectedOptions, selectedOptions) => {
        console.log(new Set(correctResponses))
        console.log(new Set(selectedOptions))
        let correctResponsesSet = new Set(correctResponses)
        let responseSet = new Set(selectedOptions)
        if (responseSet.size === correctResponsesSet.size && [...correctResponsesSet].every(value => responseSet.has(value))) {
            console.log("correct!")
            setCorrectAnswers(true)
            setScore(() => score + 1)
            setAnswerMsg(<div>You answered {selectedOptions.map((item, idx) =>  <span> <InlineMath math={item} key={item}/> {idx !== selectedOptions.length - 1 && ', '}   </span> )}. That is correct! </div>)
        } else {
            console.log("incorrect")
            setCorrectAnswers(false)
            setAnswerMsg(<div>You answered {selectedOptions.map((item, idx) =>  <span> <InlineMath math={item} key={item}/> {idx !== selectedOptions.length - 1 && ', '} </span> )}. That is incorrect. </div>)

        }
        setAnswered(true)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()

        checkAnswers(unselectedOptions, selectedOptions)
       
     }
     
     const handleOptionChange = (e, checkedValue) => {
        console.log(e.target)

        selectedOptions.includes(e.target.value)
        ?
            sortOptions(e.target.value, "remove")
        :
            sortOptions(e.target.value, "add")

     }


    return (
        <div>
            <p>{questionInfo.question}</p>
            {questionInfo.desmosGraph.showGraph !== true && questionInfo.expression !== false && <p><InlineMath math={questionInfo.expression} /></p>}
            <form onSubmit={e => handleSubmit(e)}>
                <ol>
                    {optionsOrder.map(item => 
                        <li>
                        <InlineMath math={questionInfo.answers[item].option} />    
                        <input 
                            type="checkbox" 
                            name="option" 
                            key={item}
                            value={questionInfo.answers[item].option} 
                            onChange={e => handleOptionChange(e, questionInfo.answers[item])} 
                            checked={selectedOptions.includes(questionInfo.answers[item].option)}
                            disabled={answerMsg !== null}
                        ></input>
                        </li>
                    )}
                </ol>
                <button type="submit" disabled={answered === true || selectedOptions.length === 0 || gameOver === true ? true : false}>SUBMIT</button>
            </form>
            <h3>{answerMsg}</h3>
        </div>
    )
}


export default MultipleAnswerQuestion