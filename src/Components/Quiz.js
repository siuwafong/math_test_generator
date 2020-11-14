import React, { useState, useEffect } from 'react'
import MultipleChoiceQuestion from './MultipleChoiceQuestion'
import ShortAnswerQuestion from './ShortAnswerQuestion'
import ListQuestion from './ListQuestion'
import DesmosGraph from './DesmosGraph'
import MultipleAnswerQuestion from './MultipleAnswerQuestion'
import Table from './Table'
import Image from './Image'
import { falseDependencies } from 'mathjs'

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
                    optionsOrder={shuffledArray} 
                    answered={answered} 
                    setAnswered={setAnswered} 
                    answerMsg={answerMsg} 
                    setAnswerMsg={setAnswerMsg} 
                    score={score} 
                    setScore={setScore}
                /> 
            }

            {currentQuestion < quizQuestions.length && quizQuestions[currentQuestion].type === 'sort list' 
                &&
                <ListQuestion
                    questionInfo={quizQuestions[currentQuestion]} 
                    optionsOrder={shuffledArray} 
                    answered={answered} 
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
            {quizQuestions[currentQuestion].details.table && <Table questionInfo={quizQuestions[currentQuestion]} />}
            {quizQuestions[currentQuestion].details.img && <Image imgSrc={quizQuestions[currentQuestion].details.imgSrc} imgDetails={quizQuestions[currentQuestion].details.imgDetails} /> }

            {gameOver === true ? 
            <div>
                <h3>GAME OVER!...Your score: {score} / {quizQuestions.length}</h3>
                <button onClick={() => restartGame()}>Restart Game</button>
                {(JSON.parse(localStorage.getItem('highScore')) === "null" || parseInt(JSON.parse(localStorage.getItem('highScore'))) < score ) && localStorage.setItem('highScore', JSON.stringify(score))}
                {parseInt(JSON.stringify(localStorage.getItem('highScore'))) < score 
                ? 
                <p>{`You set a new high score! You scored ${score}` }</p>
                :
                <p>{`Your high score was ${parseInt(JSON.parse(localStorage.getItem('highScore')))}`}</p>
                }
            </div>
            :
            null    
            }

        </div>
    )
}

export default Quiz