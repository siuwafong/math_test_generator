import React, { useState } from 'react'
import { InlineMath, BlockMath } from 'react-katex';

function ShortAnswerQuestion({
    questionInfo, 
    answered, 
    setAnswered,
    answerMsg,
    setAnswerMsg,
    score,
    setScore,

}) {

    const [shortAnswerResponse, setShortAnswerResponse] = useState("")


    const handleChange = e => {
        setShortAnswerResponse(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setAnswered(true)
        if (questionInfo.details.checkAnswer === 'check sets') {
            console.log(shortAnswerResponse)
            let responseSet = new Set(shortAnswerResponse.trim().split(',').map(item => Number(item)))
            if (responseSet.size === questionInfo.answers.size && [...responseSet].every(value => questionInfo.answers.has(value))) {
               setScore(() => score + 1)
               setAnswerMsg("Correct!")
            } else {
                setAnswerMsg("Incorrrect")
            }
        }
    }

    console.log(questionInfo)

    return (
        <div>
            <p>{questionInfo.question}</p>
            {questionInfo.desmosGraph.showGraph !== true && <p><InlineMath math={questionInfo.expression} /></p>}
            <form onSubmit={e => handleSubmit(e)}>
                <input disabled={answerMsg !== null} value={shortAnswerResponse} type="text" onChange={e => handleChange(e)} placeholder="Type your answer here"></input>
                <button type="submit" disabled={answerMsg !== null}>SUBMIT</button>
                <h3>{answerMsg} {shortAnswerResponse}</h3>
            </form>
        </div>
    )
}

export default ShortAnswerQuestion