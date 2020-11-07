import React, { useState, useEffect } from 'react'
import QuestionSet from './QuestionSet'
import MultipleChoiceQuestion from './MultipleChoiceQuestion'
import ShortAnswerQuestion from './ShortAnswerQuestion'
import DesmosGraph from './DesmosGraph'
import MultipleAnswerQuestion from './MultipleAnswerQuestion'


function Quiz({
    quizQuestions,
    setQuizQuestions,
    gameOver,
    setGameOver,
    setGameStart
}) {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answered, setAnswered] = useState(false)
    const [answerMsg, setAnswerMsg] = useState(null)
    const [score, setScore] = useState(0)
    const [shuffledArray, setShuffledArray] = useState([])
    const [shuffledState, setShuffledState] = useState(false)    
    const [checkedRadio, setCheckedRadio] = useState(null)
    const [answerValues, setAnswerValues] = useState(null)

    console.log(quizQuestions)

    let tempArray = []

    const shuffleAnswers = () => {
       
        if (quizQuestions[currentQuestion].details.checkAnswer !== 'check sets') {
            
            for (let k=0; k< quizQuestions[currentQuestion].answers.length; k++) {
                tempArray.push(k)
            }
            
            for(let i=0; i < tempArray.length; i++) {
                let j = Math.floor(Math.random() * tempArray.length);
                let temp = tempArray[i]
                tempArray[i] = tempArray[j]
                tempArray[j] = temp
            }
            console.log(tempArray)
        }
    
    }

    if (shuffledState === false && gameOver === false) {
        setShuffledState(true)
        // let tempArray = []
        shuffleAnswers()
        setShuffledArray(() => tempArray)
    }

    const handleClick = (e) => {
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
            setAnswered(false)
            setAnswerMsg(null)
            setShuffledState(false)
            quizQuestions[currentQuestion].type === 'multiple choice' && setCheckedRadio(null)
            setAnswerValues(null)
            console.log("onto the next question...")
        } else {
            console.log("game over...")
            setGameOver(() => true)
        }
    }

    const restartGame = () => {
        setGameOver(false)
        setQuizQuestions([])
        setScore(0)
        setCurrentQuestion(0)
        setAnswered(false)
        setAnswerMsg(null)
        setCheckedRadio(null)
        setAnswerValues(null)
        setGameStart(false)
    }


    return (
        <div>
            
            
            <div>
            {currentQuestion < quizQuestions.length && quizQuestions[currentQuestion].type === 'multiple choice' 
                && 
                <MultipleChoiceQuestion 
                    questionInfo={quizQuestions[currentQuestion]} 
                    optionsOrder={shuffledArray} 
                    answered={answered} 
                    setAnswered={setAnswered} 
                    answerMsg={answerMsg} 
                    setAnswerMsg={setAnswerMsg} 
                    score={score} 
                    setScore={setScore}
                    checkedRadio={checkedRadio}
                    setCheckedRadio={setCheckedRadio}
                    /> 
            }

            {currentQuestion < quizQuestions.length && quizQuestions[currentQuestion].type === 'short answer' 
                &&
                <ShortAnswerQuestion
                    questionInfo={quizQuestions[currentQuestion]} 
                    setAnswered={setAnswered} 
                    answerMsg={answerMsg} 
                    setAnswerMsg={setAnswerMsg} 
                    score={score} 
                    setScore={setScore}
                    answerValues={answerValues}
                    setAnswerValues={setAnswerValues}
                    /> 
            }

            {currentQuestion < quizQuestions.length && quizQuestions[currentQuestion].type === 'multiple answers' 
                &&
                <MultipleAnswerQuestion
                    questionInfo={quizQuestions[currentQuestion]} 
                    optionsOrder={shuffledArray} answered={answered} 
                    setAnswered={setAnswered} 
                    answerMsg={answerMsg} 
                    setAnswerMsg={setAnswerMsg} 
                    score={score} 
                    setScore={setScore}
                /> 
            }
            </div>
            

            <button onClick={( e => handleClick(e))} disabled={answered  === false || gameOver === true ? true : false}>
                {currentQuestion === quizQuestions.length - 1 ? `FINISH QUIZ` : `NEXT`}
            </button>
            {quizQuestions[currentQuestion].desmosGraph.showGraph  && <DesmosGraph graphfunction={quizQuestions[currentQuestion].desmosGraph.graphfunction} answered={answered} />}
            
            {gameOver === true ? 
            <div>
                <h3>GAME OVER!...Your score: {score} / {quizQuestions.length}</h3>
                <button onClick={() => restartGame()}>Restart Game</button>
            </div>
            :
            null    
            }

        </div>
    )
}

export default Quiz