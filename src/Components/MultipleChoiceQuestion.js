import React, { useState } from 'react'
import "katex/dist/katex.min.css"
import { InlineMath, BlockMath } from 'react-katex';

function MultipleChoiceQuestion({
    questionInfo, 
    optionsOrder, 
    answered, 
    setAnswered,
    answerMsg,
    setAnswerMsg,
    score,
    setScore,
    checkedRadio,
    setCheckedRadio
    }) {

    const [selectedOption, setSelectedOption] = useState(null)
    const [correctAnswer, setCorrectAnswer] = useState(null)


    let choice = ""


    const handleSubmit = (evt) => {
        evt.preventDefault()
        setAnswerMsg(
            correctAnswer === true 
            ?
            <div>You answered <InlineMath math={selectedOption} />. That is correct! </div>
            : 
            <div>You answered <InlineMath math={selectedOption} />. That is incorrect. </div>
        )
        setAnswered(() => true)
        if (correctAnswer === "true") {
            setScore(() => score + 1)
        }
     }
     
     const handleOptionChange = (e, checkedValue) => {
        choice = e.target.value
        // setCheckedRadio(checkedValue)
        setSelectedOption(checkedValue.option)
        setCorrectAnswer(checkedValue.correct)
     }

    return (
        <div>
            <p>{questionInfo.question}</p>
            {questionInfo.desmosGraph.showGraph !== true && <p><InlineMath math={questionInfo.expression} /></p>}
            <form onSubmit={e => handleSubmit(e)}>
                <ol>
                    {optionsOrder.map(item => 
                        <li>
                        <InlineMath math={questionInfo.answers[item].option} />    
                        <input 
                            type="radio" 
                            name="option" 
                            value={questionInfo.answers[item].correct} 
                            onChange={e => handleOptionChange(e, questionInfo.answers[item])} 
                            checked={selectedOption === questionInfo.answers[item].option}
                            ></input>
                        </li>
                    )}
                </ol>
                <button type="submit" disabled={answered === true || selectedOption === null ? true : false}>SUBMIT</button>
            </form>
            <h3>{answerMsg}</h3>
        </div>
    )
}


export default MultipleChoiceQuestion