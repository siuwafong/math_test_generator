import React from 'react'
import '../css/Image.css'

function Image({imgSrc, imgDetails}) {

    return (
        <div className="container">
            <img className="image" src={imgSrc} alt='quizImage'/>
            {imgDetails.map(item => (
                <div style={item.position}>{item.text} </div>
            ))}
        </div>
    )
}

export default Image