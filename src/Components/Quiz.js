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
import { InlineMath, BlockMath } from 'react-katex';
import '../css/Quiz.css'
import { Button, Box } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

function Quiz({
    quizQuestions,
    setQuizQuestions,
    gameOver,
    setGameOver,
    setGameStart,
    checkedTopics, 
    setCheckedTopics, 
    gameType,
    setQuestionSet,
    time
}) {

    const [currentQuestion, setCurrentQuestion] = useState(Math.floor(Math.random() * quizQuestions.length))
    // const [currentQuestion, setCurrentQuestion] = useState(gameType === "standard" ? 0 : Math.floor(Math.random() * quizQuestions.length))
    const [questionsRemaining, setQuestionsRemaining] = useState([...Array(quizQuestions.length).keys()].filter(item => item !== currentQuestion))
    const [answered, setAnswered] = useState(false)
    const [answerMsg, setAnswerMsg] = useState(null)
    const [score, setScore] = useState(0)
    const [shuffledArray, setShuffledArray] = useState([])
    const [shuffledState, setShuffledState] = useState(false)    
    const [checkedRadio, setCheckedRadio] = useState(null)
    const [answerValues, setAnswerValues] = useState(null)
    const [timedQuestions, setTimedQuestions] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)
    const [showSolution, setShowSolution] = useState(false)

    console.log(questionsRemaining)
    console.log("current question # is...", currentQuestion)

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
        // currentQuestion < quizQuestions.length - 1
        if (( questionsRemaining.length > 0 && gameType === "standard") || gameType === "timed") {
            if (gameType === "standard") {
            const tempNewQuestion = questionsRemaining[Math.floor(Math.random() * questionsRemaining.length)]
            console.log("tempNewQuestion is:", tempNewQuestion)
            setCurrentQuestion(tempNewQuestion)
            setQuestionsRemaining(() => questionsRemaining.filter(item => item !== tempNewQuestion))
            } else if (gameType === "timed") {
                let currentNumber = currentQuestion
                let currentQuestions = [...timedQuestions, currentNumber]
                console.log(currentQuestions.length, quizQuestions.length)
                if (currentQuestions.length === quizQuestions.length) {
                    console.log("regenerating new parameters")
                    let tempQuizQuestions = []
                    for (let i = 0; i < checkedTopics.length; i++) {
                        const courseAndTopic = checkedTopics[i].split("-")
                        const selectedCourse = courseAndTopic[0]
                        const selectedTopic = courseAndTopic[1]
                        const filteredQuestions = generateQuizQuestions().filter(item => item.details.course.toUpperCase() === selectedCourse).filter(item => item.details.strand === selectedTopic)
                        tempQuizQuestions = [...tempQuizQuestions, ...filteredQuestions]
                    }
                    console.log(tempQuizQuestions)
                    setQuizQuestions(() => tempQuizQuestions)
                }
                setTimedQuestions([...timedQuestions, currentNumber])

                if (currentQuestions.length !== quizQuestions.length) {
                while (currentQuestions.includes(currentNumber)) {
                    currentNumber = Math.floor(Math.random() * quizQuestions.length)
                }
                setCurrentQuestion(currentNumber)
                } else {
                    setTimedQuestions([])
                    setCurrentQuestion(Math.floor(Math.random() * quizQuestions.length))
                }
            }
            setAnswered(false)
            setAnswerMsg(null)
            setShuffledState(false)
            quizQuestions[currentQuestion].type === 'multiple choice' && setCheckedRadio(null)
            setAnswerValues(null)
            setErrorMsg("")
            setShowSolution(false)
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
        setQuestionSet(() => generateQuizQuestions())
    }

    const setHighScore = () => {
        if (gameType === "standard") {
            (JSON.parse(localStorage.getItem('stdHighScore')) === "null" || Number(JSON.parse(localStorage.getItem('stdHighScore'))) < (score/quizQuestions.length).toFixed(2) ) && localStorage.setItem('stdHighScore', JSON.stringify((score/quizQuestions.length).toFixed(2)))
        } else if (gameType === "timed") {
            (JSON.parse(localStorage.getItem("timedHighScore")) === "null" || Number(JSON.parse(localStorage.getItem("timedHighScore"))) < score) && localStorage.setItem("timedHighScore", JSON.stringify(score))
        }
    }

    const handleShowSolution = () => {
        setShowSolution(true);
    }

    return (
        <div className="quizContainer">
            
            {gameType === "timed" && <Timer setGameOver={setGameOver} time={time}/>}

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
                    errorMsg={errorMsg}
                    setErrorMsg={setErrorMsg}
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
            
            {quizQuestions[currentQuestion].desmosGraph.showGraph  && <DesmosGraph graphfunction={quizQuestions[currentQuestion].desmosGraph.graphfunction} answered={answered} />}
            {quizQuestions[currentQuestion].details.table && <Table questionInfo={quizQuestions[currentQuestion]} />}
            {quizQuestions[currentQuestion].details.img && <Image imgSrc={quizQuestions[currentQuestion].details.imgSrc} imgDetails={quizQuestions[currentQuestion].details.imgDetails} /> }

            <div className="buttonsContainer" >
                <Box mx={3} hidden={gameOver === true}>
                    <Button variant="contained"  color="primary" className="submitBtn" onClick={( e => handleClick(e))} disabled={answered  === false || gameOver === true ? true : false} hidden={gameOver === true}>
                        {questionsRemaining.length === 0  && gameType === "standard" ? `FINISH QUIZ` : `NEXT`}
                    </Button>
                </Box>
                <Box mx={3} hidden={gameOver === true}>
                    <Button variant="contained" color="secondary" className="solutionBtn" disabled={answered === false || gameOver === true} onClick={() => handleShowSolution()} hidden={gameOver === true}>
                        Show Solution
                    </Button>
                </Box>
            </div>

            <div hidden={gameOver === true} className={showSolution === true && "showSolutions"}>
                <ul >
                    {showSolution === true && quizQuestions[currentQuestion].details.solutionSteps.map(item => (
                        <li className={`solutionStep ${showSolution === true && `showSolutions`}`} >
                            {item.type === `text` ? item.content : <BlockMath math={item.content} />}
                        </li>
                    ))}
                </ul>
            </div>
                
            {gameOver === true ? 
            <div className="gameOverContainer">
                <h3>GAME OVER!...Your score on this quiz for: </h3>
                        <ul>
                        {checkedTopics.map((topic, idx) => <span className="checkedTopic" >{idx === checkedTopics.length - 1 ? `${topic}` : `${topic}, `} </span>)}  
                        </ul>
                {gameType === "standard"
                ?
                <p>{score} / {quizQuestions.length} ({(score/quizQuestions.length).toFixed(2) * 100}%)</p>
                :
                <p>{score}</p>
                }

            <Button onClick={() => restartGame()} variant="contained" color="secondary" endIcon={<RefreshIcon />}>
                        Restart Game
                    </Button>
                    
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
                        <p>{`You set a new high score for timed mode! You scored ${score} questions correct in ${time} minutes!` }</p>
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