import React, { useState, useEffect } from 'react'
import MultipleChoiceQuestion from './MultipleChoiceQuestion'
import ShortAnswerQuestion from './ShortAnswerQuestion'
import ListQuestion from './ListQuestion'
import DesmosGraph from './DesmosGraph'
import MultipleAnswerQuestion from './MultipleAnswerQuestion'
import Table from './Table'
import Image from './Image'
import Timer from './Timer'
import generateQuizQuestions  from './QuestionSet'


function Quiz({
    quizQuestions,
    setQuizQuestions,
    gameOver,
    setGameOver,
    setGameStart,
    checkedTopics, 
    setCheckedTopics, 
    gameType
}) {

    const [currentQuestion, setCurrentQuestion] = useState(gameType === "standard" ? 0 : Math.ceil(Math.random() * quizQuestions.length))
    const [answered, setAnswered] = useState(false)
    const [answerMsg, setAnswerMsg] = useState(null)
    const [score, setScore] = useState(0)
    const [shuffledArray, setShuffledArray] = useState([])
    const [shuffledState, setShuffledState] = useState(false)    
    const [checkedRadio, setCheckedRadio] = useState(null)
    const [answerValues, setAnswerValues] = useState(null)
    const [timedQuestions, setTimedQuestions] = useState([])



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
        if ((currentQuestion < quizQuestions.length - 1 && gameType === "standard") || gameType === "timed") {
            if (gameType === "standard") {
            setCurrentQuestion(currentQuestion + 1)
            } else if (gameType === "timed") {
                let currentNumber = currentQuestion
                let currentQuestions = [...timedQuestions, ...currentNumber]
                if (currentQuestions.length === quizQuestions.length) {
                    generateQuizQuestions();
                }
                setTimedQuestions([...timedQuestions, ...currentNumber])
                while (currentQuestions.includes(currentNumber)) {
                    currentNumber = Math.floor(Math.random() * quizQuestions.length)
                }
                setCurrentQuestion(currentNumber)
            }
            setAnswered(false)
            setAnswerMsg(null)
            setShuffledState(false)
            quizQuestions[currentQuestion].type === 'multiple choice' && setCheckedRadio(null)
            setAnswerValues(null)
        } else {
            if (gameType === "standard") {
                setGameOver(() => true)
            }
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
        setCheckedTopics([])
    }

    const setHighScore = () => {
        if (gameType === "standard") {
            (JSON.parse(localStorage.getItem('stdHighScore')) === "null" || Number(JSON.parse(localStorage.getItem('stdHighScore'))) < (score/quizQuestions.length).toFixed(2) ) && localStorage.setItem('stdHighScore', JSON.stringify((score/quizQuestions.length).toFixed(2)))
        } else if (gameType === "timed") {
            (JSON.parse(localStorage.getItem("timedHighScore")) === "null" || Number(JSON.parse(localStorage.getItem("timedHighScore"))) < score) && localStorage.setItem("timedHighScore", JSON.stringify(score))
        }
    }

    return (
        <div>
            
            {gameType === "timed" && <Timer setGameOver={setGameOver}/>}

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
                    gameOver={gameOver}
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
                    gameOver={gameOver}
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
                    gameOver={gameOver}
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
                    gameOver={gameOver}
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
                <h3>GAME OVER!...Your score on this quiz for: {checkedTopics.map((topic, idx) => <span className="checkedTopic" >{idx === checkedTopics.length - 1 ? `${topic}` : `${topic}, `}, </span>)}: {score} / {quizQuestions.length} ({(score/quizQuestions.length).toFixed(2) * 100}%)</h3>
                <button onClick={() => restartGame()}>Restart Game</button>
                
                    {setHighScore()}
                    
                    {gameType === "standard" 
                    ? 
                        Number(JSON.parse(localStorage.getItem('stdHighScore'))) < Number((score/quizQuestions.length).toFixed(2)) 
                        ? 
                        <p>{`You set a new high score for standard mode! You scored ${(score/quizQuestions.length).toFixed(2)}%` }</p>
                        :
                        <p>{`Your high score for standard mode is ${parseInt(JSON.parse(localStorage.getItem('stdHighScore')))*100}%`}</p>
                    :
                        Number(JSON.parse(localStorage.getItem('timedHighScore'))) < score
                        ?
                        <p>{`You set a new high score for timed mode! You scored ${score} questions correct in 10 minutes!` }</p>
                        :
                        <p>{`Your high score for timed mode is ${JSON.parse(localStorage.getItem('timedHighScore'))}`}</p>
                    }
            </div>
            :
            null    
            }

        </div>
    )
}

export default Quiz