import React from 'react'
import '../css/Table.css'

function Table({questionInfo}) {
    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        {questionInfo.details.tableHeadings.map(item => <th>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {questionInfo.details.tableValues.map(item => (
                        <tr>
                            <td>{item.xValue}</td>
                            <td>{item.yValue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table