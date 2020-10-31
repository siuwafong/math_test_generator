import React, { useState } from 'react'
import { InlineMath, BlockMath } from 'react-katex';
import { rationalize } from 'mathjs'

function ShortAnswerQuestion({
    questionInfo, 
    answered, 
    setAnswered,
    answerMsg,
    setAnswerMsg,
    score,
    setScore,
    answerValues,
    setAnswerValues
}) {

    const [shortAnswerResponse, setShortAnswerResponse] = useState("")
    

    const handleChange = e => {
        setShortAnswerResponse(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setAnswered(true)
        if (questionInfo.details.checkAnswer === 'check sets') {
            let responseSet = new Set(shortAnswerResponse.trim().split(',').map(item => item.includes("/") ? Number(rationalize(item).toString()) : Number(item)))
            console.log(responseSet)
            if (responseSet.size === questionInfo.answers.size && [...responseSet].every(value => questionInfo.answers.has(value))) {
               setScore(() => score + 1)
               setAnswerMsg("Correct!")
            } else {
                setAnswerMsg("Incorrrect")
            }
        } else if (questionInfo.details.checkAnswer === 'check expression') {
            // insert check expression code here
        }
        setAnswerValues(shortAnswerResponse)
        setShortAnswerResponse("")
    }

    return (
        <div>
            <p>{questionInfo.question}</p>
            {questionInfo.desmosGraph.showGraph !== true && <p><InlineMath math={questionInfo.expression} /></p>}
            <form onSubmit={e => handleSubmit(e)}>
                <input disabled={answerMsg !== null} value={shortAnswerResponse} type="text" onChange={e => handleChange(e)} placeholder="Type your answer here"></input>
                <p>Info on how to solve the problem</p>
                <button type="submit" disabled={answerMsg !== null}>SUBMIT</button>
                <h3>{answerMsg !== null ? answerMsg === "Correct!" ? `You answered ${answerValues}. That is correct!` : `You answered ${answerValues}. That is incorrect!` : null}</h3>
            </form>
        </div>
    )
}

export default ShortAnswerQuestion