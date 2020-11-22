import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { InlineMath, BlockMath } from 'react-katex';
import '../css/ListQuestion.css'
import { Button, Box, Icon } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

function ListQuestion({
    questionInfo, 
    optionsOrder,
    answered, 
    setAnswered,
    answerMsg,
    setAnswerMsg,
    setScore,
    score,
    gameOver,
    
}) {



    const [listItems, updateListItems] = useState(questionInfo.answers);
    const [correctItems, setCorrectItems] = useState([])
    const [incorrectItems, setIncorrectItems]= useState([])

    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(listItems);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        updateListItems(items);
        console.log(listItems)
      }

    const handleClick = () => {
        const answerList = listItems.map(item => questionInfo.answers.findIndex(itm => itm.id === item.id))
        if (JSON.stringify(answerList) === JSON.stringify(optionsOrder)) {
            setAnswerMsg("Correct!")
            setScore(() => score + 1)
        } else {
            setAnswerMsg("Incorrect")
        }
        setAnswered(true)
        let tempCorrectList = []
        let tempIncorrectList = []
        for (let i = 0; i < answerList.length; i++) {
            if (answerList[i] === optionsOrder[i]) {
                tempCorrectList.push(i)
            } else {
                tempIncorrectList.push(i)
            }
        }
        setCorrectItems([...correctItems, ...tempCorrectList])
        setIncorrectItems([...incorrectItems, ...tempIncorrectList])

        console.log(correctItems, incorrectItems)
    }

    return (
        <div className={answered === false && 'questionContainer'}>
            {questionInfo.question}
            <div className="listsContainer">
                <div>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="items" isDropDisabled={answered}>
                        {(provided) => (
                        <ul className="items" {...provided.droppableProps} ref={provided.innerRef}>
                            {listItems.map((item, idx) => {
                                return (
                                <Draggable key={item.id} draggableId={item.id.toString()} index={idx} isDragDisabled={answered}>
                                    {(provided) => (
                                    <li className={`selectableListItem ${answered === true && correctItems.includes(idx) && `correctColor`}  ${answered === true && incorrectItems.includes(idx) && `incorrectColor`}`} key={item.id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}> 
                                        <div className="selectableListItem1">
                                            {item.definition}
                                        </div>
                                    </li>
                                    )}
                                </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                        )}
                    </Droppable>
                </DragDropContext>
                </div>

                <div>
                    <ul>
                        {optionsOrder.map((item, idx) => (
                            <li key={idx} className="unselectableListItem">
                                <ul>
                                    {questionInfo.answers[item].description.map((itm, idx) => (
                                        itm.type === "text" 
                                        ?
                                        <li key={idx}>{itm.content}</li>
                                        :
                                        <li key={idx}><InlineMath math={itm.content} /></li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="submitBtnContainer">
                <Button className="submitBtn" size="large" variant="contained" color="primary" endIcon={<SendIcon />} onClick={() => handleClick()} disabled={answered === true || gameOver === true ? true : false} >
                    SUBMIT
                </Button>
            </div>
            <h3>{answerMsg}</h3>
        </div>
    )
}



export default ListQuestion