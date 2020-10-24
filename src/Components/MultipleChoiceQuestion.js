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
    let choice = ""


    const handleSubmit = (evt) => {
        evt.preventDefault()
        setAnswerMsg(selectedOption)
        setAnswered(() => true)
        if (selectedOption === "true") {
            setScore(() => score + 1)
        }
     }
     
     const handleOptionChange = (e, checkedValue) => {
        choice = e.target.value
        setCheckedRadio(checkedValue)
        setSelectedOption(choice)
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
                            onChange={e => handleOptionChange(e, questionInfo.answers[item].option)} 
                            checked={checkedRadio === questionInfo.answers[item].option}
                            ></input>
                        </li>
                    )}
                </ol>
                <button type="submit" disabled={answered ? true : false}>SUBMIT</button>
            </form>
            <h3>{answerMsg}</h3>
        </div>
    )
}


export default MultipleChoiceQuestion