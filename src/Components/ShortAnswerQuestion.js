import React, { useState } from 'react'
import { InlineMath, BlockMath } from 'react-katex';
import { simplify, rationalize, evaluate } from 'mathjs'
import '../css/ShortAnswerQuestion.css'
import { Button, Box, Icon } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

function ShortAnswerQuestion({
    questionInfo, 
    answered, 
    setAnswered,
    answerMsg,
    setAnswerMsg,
    score,
    setScore,
    answerValues,
    setAnswerValues,
    gameOver,
    errorMsg,
    setErrorMsg,
    
}) {


    const [shortAnswerResponse, setShortAnswerResponse] = useState("")

    const handleChange = e => {
            setShortAnswerResponse(e.target.value)
    }

    const handleSubmit = e => {
        
            e.preventDefault()
            // setAnswered(true)
            if (questionInfo.details.checkAnswer === 'check sets') {
                try {
                    let responseSet = new Set(shortAnswerResponse.trim().split(',').map(item => item.includes("/") ? Number(rationalize(item).toString()) : item === "none" ? "none" : Number(item)))
                    console.log(responseSet, questionInfo.answers)
                    if (responseSet.size === questionInfo.answers.size && [...responseSet].every(value => questionInfo.answers.has(value))) {
                    setScore(() => score + 1)
                    setAnswerMsg("Correct!")
                    } else {
                        setAnswerMsg("Incorrrect")
                    }
                    setAnswered(true)
                    setAnswerValues(() => shortAnswerResponse)
                    setShortAnswerResponse("")
                } catch(err) {
                    console.error()
                    setErrorMsg("Invalid Response!")
                }
                
            } else if (questionInfo.details.checkAnswer === 'check expression' ) {
                try {
                    // console.log(rationalize(shortAnswerResponse.trim()).toTex().replace("~", ""), questionInfo.answers[0])
                    // console.log(simplify(shortAnswerResponse.trim()).toTex().replace("~", "").replace('\\cdot', '').trim(), questionInfo.answers[0])

                    if (questionInfo.details.parseExpression !== undefined) {
                        console.log("checking parsed expression", questionInfo.details.parseExpression(shortAnswerResponse))
                        console.log(questionInfo.details.parseExpression(questionInfo.shortAnswerSolution))
                        if (questionInfo.details.parseExpression(shortAnswerResponse) === questionInfo.details.parseExpression(questionInfo.shortAnswerSolution)) {
                            console.log("checking expression...correct!")
                            setScore(() => score + 1)
                        setAnswerMsg(`Correct!`)
                        } else {
                            console.log("checking expression....incorrect!")
                            setAnswerMsg("Incorrect")
                        }
                    }
                    else if (simplify(shortAnswerResponse.trim()).toTex().replace("~", "").replace('\\cdot', '').trim().replace("+-", "-") === questionInfo.answers[0]) {
                    setScore(() => score + 1)
                        setAnswerMsg(`Correct!`)
                    } else {
                        setAnswerMsg("Incorrect")
                    }
                    setAnswered(true)
                    setAnswerValues(() => shortAnswerResponse)
                    setShortAnswerResponse("")
                } catch (err) {
                    console.error()
                    setErrorMsg("Invalid Response!")
                }
            } else if (questionInfo.details.checkAnswer === 'check permutation' ) {
                try {
                    console.log("checking if response matches one of the valid answers")
                    if (questionInfo.answers[0].includes(shortAnswerResponse)) {
                        setScore(() => score + 1)
                        setAnswerMsg(`Correct!`)
                    } else {
                        setAnswerMsg("Incorrect")
                    }
                    setAnswered(true)
                    setAnswerValues(() => shortAnswerResponse)
                    setShortAnswerResponse("")
                } catch(err) {
                    console.error()
                    setErrorMsg("Invalid Response!")
                }
            }
            // setAnswerValues(() => shortAnswerResponse)
            // setShortAnswerResponse("")
            console.log(answerValues)
    }

    return (
        <div className={`shortAnswerQuestionContainer slideoutDiv`}>
            <p>{questionInfo.question}</p>
            {questionInfo.desmosGraph.showGraph !== true && questionInfo.expression !== false && <p className="questionExpression"><InlineMath math={questionInfo.expression} /></p>}
            {errorMsg}
            <form onSubmit={e => handleSubmit(e)} >
                <div className="shortAnswerForm">
                    <label className="shortAnswerLabel" for="shortAnswer"><InlineMath math={questionInfo.details.label} /></label> 
                    <input name="shortAnswer" className="shortAnswerInput" maxlength="30" disabled={answerMsg !== null} value={shortAnswerResponse} type="text" onChange={e => handleChange(e)} placeholder="Type your answer here"></input>
                </div>
                <ul>
                    {questionInfo.details.hints && questionInfo.details.hints.map(item => 
                        <li className="hint"> {item} </li>
                        )}
                </ul>

                <div className="submitBtnContainer">
                    <Button size="large" variant="contained" color="primary" endIcon={<SendIcon />} type="submit" disabled={answerMsg !== null || gameOver === true || shortAnswerResponse === ""}>
                        SUBMIT
                    </Button>
                </div>

                <h3> {answerMsg} </h3>
                
                <p>{answerMsg !== null && `Your answer:`} </p> {answerMsg !== null && questionInfo.details.checkAnswer === "check expression" ? <InlineMath math={simplify(answerValues).toTex().replace("~", "").replace('\\cdot', '').trim().replace("+-", "-").replace("pit", "pi t")} /> : answerValues} 
                
                {/* {answerMsg !== null 
                    ? 
                        questionInfo.details.checkAnswer === 'check expression' || questionInfo.details.checkAnswer === 'check permutation'
                        ?
                        <div>
                            <h3>The correct answer is: </h3> 
                            <InlineMath math={`${questionInfo.answers[0]}`} />
                        </div>
                        :
                        
                        <div>
                            <h3>The correct answer is: </h3>
                            {questionInfo.answers}
                        </div>
                    :
                        ""
                } */}
            </form>
        </div>
    )
}

export default ShortAnswerQuestion