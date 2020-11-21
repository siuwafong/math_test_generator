import React, { useState, useEffect } from 'react'
import "katex/dist/katex.min.css"
import { InlineMath, BlockMath } from 'react-katex';
import '../css/MultipleChoiceQuestion.css'
import { Button, Box } from '@material-ui/core';

function MultipleChoiceQuestion({
    questionInfo, 
    optionsOrder, 
    answered, 
    setAnswered,
    answerMsg,
    setAnswerMsg,
    score,
    setScore,
    gameOver,
    
    }) {

    const [selectedOption, setSelectedOption] = useState(null)
    const [correctAnswer, setCorrectAnswer] = useState(null)

    let choice = ""

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (selectedOption !== null) {
        setAnswerMsg(
            correctAnswer === true 
            ?
            <div>You answered <InlineMath math={selectedOption} />. That is correct! </div>
            : 
            <div>You answered <InlineMath math={selectedOption} />. That is incorrect. </div>
        )
        setAnswered(() => true)
        if (correctAnswer === true) {
            setScore(() => score + 1)
        }
        setSelectedOption(null)
        }
     }
     
     const handleOptionChange = (e, checkedValue) => {
        choice = e.target.value
        // setCheckedRadio(checkedValue)
        setSelectedOption(checkedValue.option)
        setCorrectAnswer(checkedValue.correct)
     }


    return (
        <div className={answered === false && 'questionContainer'}>
            <p>{questionInfo.question}</p>
            {questionInfo.desmosGraph.showGraph !== true && questionInfo.expression !== false && <p className="questionExpression"><InlineMath  math={questionInfo.expression} /></p>}
            <form onSubmit={e => handleSubmit(e)}>
                <ol type="a">
                    {optionsOrder.map(item => 
                        <li className="multipleChoiceListItem">
                            <input 
                                className="multipleChoiceRadio"
                                type="radio" 
                                name="option" 
                                value={questionInfo.answers[item].correct} 
                                onChange={e => handleOptionChange(e, questionInfo.answers[item])} 
                                checked={selectedOption === questionInfo.answers[item].option}
                                ></input>
                            <span className="multipleChoiceOption"> <InlineMath  math={questionInfo.answers[item].option} />  </span>
                        </li>
                    )}
                </ol>
                <div className="submitContainer">
                    <button type="submit" disabled={answered === true || selectedOption === null || gameOver === true ? true : false}>SUBMIT</button>
                </div>
            </form>
            <h3>{answerMsg}</h3>
        </div>
    )
}


export default MultipleChoiceQuestion