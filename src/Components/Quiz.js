import React, { useState, useEffect } from 'react'
import QuestionSet from './QuestionSet'
import MultipleChoiceQuestion from './MultipleChoiceQuestion'
import ShortAnswerQuestion from './ShortAnswerQuestion'
import DesmosGraph from './DesmosGraph'

let selectedQuestions = QuestionSet.slice(5)

function Quiz() {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answered, setAnswered] = useState(false)
    const [answerMsg, setAnswerMsg] = useState(null)
    const [score, setScore] = useState(0)
    const [shuffledArray, setShuffledArray] = useState([])
    const [shuffledState, setShuffledState] = useState(false)    
    const [checkedRadio, setCheckedRadio] = useState(null)

    let tempArray

    const shuffleAnswers = () => {
        
        for (let k=0; k< selectedQuestions[currentQuestion].answers.length; k++) {
            tempArray.push(k)
        }

        for(let i=0; i < tempArray.length; i++) {
            let j = Math.floor(Math.random() * tempArray.length);
            let temp = tempArray[i]
            tempArray[i] = tempArray[j]
            tempArray[j] = temp
        }

    }

    if (shuffledState === false) {
        setShuffledState(true)
        tempArray = []
        shuffleAnswers()
        setShuffledArray(() => tempArray)
    }
    
    const handleClick = (e) => {
        if (currentQuestion < selectedQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setAnswered(false)
            setAnswerMsg(null)
            setShuffledState(false)
            selectedQuestions[currentQuestion].type === 'multiple choice' && setCheckedRadio(null)

        } else {
            console.log("QUIZ IS OVER!")
        }
    }



    return (
        <div>
            
            <h3>Your score: {score} / {selectedQuestions.length}</h3>
            {currentQuestion < selectedQuestions.length && selectedQuestions[currentQuestion].type === 'multiple choice' 
                && 
                <MultipleChoiceQuestion 
                    questionInfo={selectedQuestions[currentQuestion]} 
                    optionsOrder={shuffledArray} answered={answered} 
                    setAnswered={setAnswered} 
                    answerMsg={answerMsg} 
                    setAnswerMsg={setAnswerMsg} 
                    score={score} 
                    setScore={setScore}
                    checkedRadio={checkedRadio}
                    setCheckedRadio={setCheckedRadio}
                    /> 
            }

            {currentQuestion < selectedQuestions.length && selectedQuestions[currentQuestion].type === 'short answer' 
                &&
                <ShortAnswerQuestion
                    questionInfo={selectedQuestions[currentQuestion]} 
                    setAnswered={setAnswered} 
                    answerMsg={answerMsg} 
                    setAnswerMsg={setAnswerMsg} 
                    score={score} 
                    setScore={setScore}

                    /> 
            }


            <button onClick={( e => handleClick(e))} disabled={answered  === false ? true : false}>
                {currentQuestion === selectedQuestions.length - 1 ? `FINISH QUIZ` : `NEXT`}
            </button>
            {selectedQuestions[currentQuestion].desmosGraph.showGraph  && <DesmosGraph graphfunction={selectedQuestions[currentQuestion].desmosGraph.graphfunction} answered={answered} />}

        </div>
    )
}

export default Quiz