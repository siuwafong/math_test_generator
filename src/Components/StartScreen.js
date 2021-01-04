import React, { useState, useEffect } from 'react'
import generateQuizQuestions from './QuestionSet'
import '../css/StartScreen.css'
import { Button, Box } from '@material-ui/core';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

function StartScreen({
    gameStart,
    setGameStart,
    quizQuestions,
    setQuizQuestions,
    checkedTopics,
    setCheckedTopics,
    gameType,
    setGameType,
    QuestionSet,
    setQuestionSet,
    time,
    setTime,
    setGameOver
}) {

        const coursesSet = [...new Set(QuestionSet.map(item => (item.details.course).toUpperCase()))]
        const courses =  Array.from(coursesSet)
        let topicsSet = new Set()
        let topics = {}
        for (let i = 0; i < courses.length; i++) {
        topicsSet = new Set(QuestionSet.filter(item => item.details.course === courses[i].toLowerCase()).map(itm => itm.details.strand))
            topics[courses[i]] =  Array.from(topicsSet)
        }


    
    const handleOptionChange = (e) => {
        if (checkedTopics.includes(e.target.value)) {
            setCheckedTopics(checkedTopics.filter(item => item !== e.target.value))
            } else { 
            setCheckedTopics(checkedTopics.concat(e.target.value))
            }
    }

    const handleClick = () => { 
            // TODO: input code for start screen animation
            setTimeout( () => {
            let tempQuizQuestions = []
            for (let i = 0; i < checkedTopics.length; i++) {
                const courseAndTopic = checkedTopics[i].split("-")
                const selectedCourse = courseAndTopic[0]
                const selectedTopic = courseAndTopic[1]
                const filteredQuestions = QuestionSet.filter(item => item.details.course.toUpperCase() === selectedCourse).filter(item => item.details.strand === selectedTopic)
                // ---testing questions code---
                setQuizQuestions([QuestionSet[7]])

                // ---actual code---
                // tempQuizQuestions = [...tempQuizQuestions, ...filteredQuestions]
            }
            // setQuizQuestions(() => tempQuizQuestions)
            setGameOver(false)
            setGameStart(true)
        }, 0)
        }
    

    const changeMode = (e) => {
        const choice = e.target.value
        setGameType(choice)
    }

    return (
        <div className={gameStart === true && 'slideup'} >
        <div className='gameStartContainer'>
            <div className="gameStartModal">
            <h2 className="gameTitle"> Math Quiz Generator</h2>
            <ul>
                {courses.map(course => 
                    <div className="modalText">
                        <li>{course}</li>
                        {topics[course].map((item, idx) => 
                        <div>
                            <input
                                className="courseCheckbox"
                                type="checkbox"
                                value={`${course}-${item}`}
                                key={idx}
                                onChange={e => handleOptionChange(e)}
                                checked={checkedTopics.includes(`${course}-${item}`)} 
                            > 
                            </input>
                            <span className="courseListing">{item}</span>
                        </div>
                            )}
                    </div>
                )}
            </ul>
            
            <div className="modalText options">
                <div>
                    <label for="standard">Standard Mode</label>
                    <input name="standard" type="radio" value="standard" checked={gameType === "standard"} onChange={(e) => changeMode(e)}></input>
                </div>
                <div>
                    <label for="timed">Timed Mode</label>
                    <input name="timed" type="radio" value="timed" checked={gameType === "timed"} onChange={(e) => changeMode(e)}></input>
                </div>
                <div>
                    <label for="timer">Minutes</label>
                    <input disabled={gameType !== "timed"} name="timer" type="number" min="1" max="20" step="1" value={time} onChange={(e) => setTime(e.target.value)}></input>
                </div>

            </div>
            
            <div className="startBtnContainer">
                <Button variant='contained' color="primary" endIcon={<PlayCircleFilledWhiteIcon />} onClick={() => handleClick()} disabled={checkedTopics.length === 0}>
                    Start Quiz
                </Button>
            </div>
        </div>
    </div>
    </div>
    )
}

export default StartScreen