import React, { useState } from 'react';
import './App.css';
import Quiz from './Components/Quiz'
import StartScreen from './Components/StartScreen'
import TestButton from './Components/TestButton'
import generateQuizQuestions  from './Components/QuestionSet'

function App() {

  const [gameStart, setGameStart] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState([])
  const [checkedTopics, setCheckedTopics] = useState([])
  const [gameType, setGameType] = useState("standard")
  const [QuestionSet, setQuestionSet] = useState(() => generateQuizQuestions())
  const [time, setTime] = useState(10)

  return (
    <div id="App" className="App">
      {gameStart === false && <StartScreen 
        gameStart={gameStart}
        setGameStart={setGameStart}
        quizQuestions={quizQuestions}
        setQuizQuestions={setQuizQuestions}
        checkedTopics={checkedTopics}
        setCheckedTopics={setCheckedTopics}
        gameType={gameType}
        setGameType={setGameType}
        QuestionSet={QuestionSet}
        setQuestionSet={setQuestionSet}
        time={time}
        setTime={setTime}
        setGameOver={setGameOver}
      />}

      {gameStart === true && <Quiz 
        gameOver={gameOver}
        setGameOver={setGameOver}
        quizQuestions={quizQuestions}
        setQuizQuestions={setQuizQuestions}
        setGameStart={setGameStart}
        checkedTopics={checkedTopics}
        setCheckedTopics={setCheckedTopics}
        gameType={gameType}
        QuestionSet={QuestionSet}
        setQuestionSet={setQuestionSet}
        time={time}
      />}

      {/* <TestButton /> */}
      <div className="credits">
        <p> Created by Wilson Fong </p>
      </div>
    </div>
  );
}

export default App;
