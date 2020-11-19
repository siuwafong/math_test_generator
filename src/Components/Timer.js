import React, { useState, useEffect } from 'react'
import '../css/Timer.css'

export default function Timer({setGameOver, time}) {

    const [timeLeft, setTimeLeft] = useState({
        minutes: time,
        seconds: 0
    })

    const calculateTimeLeft = () => {
        if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
            setTimeLeft(timeLeft)
            setGameOver(true)
        } else if (timeLeft.seconds === 0) {
            const newSeconds = 59
            const newMinutes = parseInt(timeLeft.minutes - 1)
            setTimeLeft({
                minutes: newMinutes,
                seconds: newSeconds
            })
        } else {
            const newSeconds = parseInt(timeLeft.seconds - 1)
            setTimeLeft({
                minutes: timeLeft.minutes,
                seconds: newSeconds
            })
        }
    }

    useEffect(() => {
       setTimeout(() => {
           calculateTimeLeft();
       }, 1000)
    })

    return (
        <div class="timerContainer">
             <span>Time Left: </span>   <span>{timeLeft.minutes} : </span> <span>{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
        </div>
    )
}
