import React, { useState } from 'react'
import QuestionSet from './QuestionSet'

function StartScreen({
    gameStart,
    setGameStart,
    quizQuestions,
    setQuizQuestions
}) {

    const [checkedTopics, setCheckedTopics] = useState([])

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
        for (let i = 0; i < checkedTopics.length; i++) {
            const courseAndTopic = checkedTopics[i].split("-")
            const selectedCourse = courseAndTopic[0]
            const selectedTopic = courseAndTopic[1]
            const filteredQuestions = QuestionSet.filter(item => item.details.course.toUpperCase() === selectedCourse).filter(item => item.details.strand === selectedTopic)
            setQuizQuestions([...quizQuestions, ...filteredQuestions])
            // filteredQuestions.forEach(question => quizQuestions.push(question))
        }
        setGameStart(true)
    }

    return (
        <div>
            <ul>
                {courses.map(course => 
                    <div>
                        <li>{course}</li>

                        {topics[course].map((item, idx) => 
                        <div>
                            {item}
                            <input
                                type="checkbox"
                                value={`${course}-${item}`}
                                key={idx}
                                onChange={e => handleOptionChange(e)}
                                checked={checkedTopics.includes(`${course}-${item}`)} 
                            > 
                            </input>
                        </div>
                            )}
                    </div>
                )}
            </ul>
            <button onClick={() => handleClick()}>Start Quiz</button>
        </div>
    )
}

export default StartScreen