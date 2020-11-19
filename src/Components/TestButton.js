import React from 'react'
import { combinations } from 'mathjs'

export default function TestButton() {

    const testFunction = () => {
        console.log(combinations(8, 3))
    }

    return (
        <div>
            <button onClick={() => testFunction()}>
                TEST FUNCTION!
            </button>
        </div>
    )
}
