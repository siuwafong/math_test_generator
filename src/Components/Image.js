import React from 'react'
import './Image.css'

function Image({imgSrc, imgDetails}) {

    console.log(imgDetails[0])

    return (
        <div className="container">
            <img src={imgSrc} alt='quizImage'/>
            {imgDetails.map(item => (
                <div style={item.position}>{item.text} </div>
            ))}
        </div>
    )
}

export default Image