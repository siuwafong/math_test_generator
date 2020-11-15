import React, { useState } from 'react';
import './App.css';
import Quiz from './Components/Quiz'
import StartScreen from './Components/StartScreen'
import TestButton from './Components/TestButton'

function App() {

  const [gameStart, setGameStart] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState([])
  const [checkedTopics, setCheckedTopics] = useState([])
  const [gameType, setGameType] = useState("standard")

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
      />}

      <TestButton />
    </div>
  );
}

export default App;
