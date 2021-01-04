import { evaluate, parse, simplify, rationalize, e, pow, sqrt, asin, acos, atan, fraction, log } from 'mathjs'
import DesmosGraph from './DesmosGraph'
import algebra from 'algebra.js'

let QuestionSet

export default function generateQuizQuestions() {

// Question Types
const MULTIPLE_CHOICE = 'multiple choice'
const TRUE_OR_FALSE = 'true or false'
const SHORT_ANSWER = 'short answer'
const MULTIPLE_ANSWERS = 'multiple answers'
const SORT_LIST = 'sort list'

// Course Codes
const MPM1D = 'mpm1d'
const MPM2D = 'mpm2d'
const MCR3U = 'mcr3u'
const MHF4U = 'mhf4u'
const MCV4U = 'mcv4u'
const MDM4U = 'mdm4u'

// Short answer types
const CHECK_SETS = 'check sets'
const CHECK_EXPRESSION = 'check expression'
const CHECK_PERMUTATION = 'check permutation'

QuestionSet = []

class QuestionClass { 
    constructor(question, type, details=null, checkShortAnswer=null, desmosGraph = {}, desmosNumberLine = false) {
        this.question = question
        this.type = type
        this.details = details
        this.desmosGraph = desmosGraph === false ? false : desmosGraph
        this.desmosNumberLine = desmosNumberLine === false ? false : desmosNumberLine
        this.answers = []
        this.checkShortAnswer = checkShortAnswer
    }
}




// MPM2D

// Qudratic Relations
class quadraticQuestion extends QuestionClass {
    constructor(question, type, details, desmosGraph, answers) {
       super(question, type, details, desmosGraph, answers)
        this.a = Math.ceil(Math.random() * 20) - 10
        this.b = Math.ceil(Math.random() * 20) - 10
        this.c = Math.ceil(Math.random() * 20) - 10    
        this.x1 = Math.floor(Math.random() * 20) - 10
        this.x2 = Math.floor(Math.random() * 20) - 10
        this.coeff1 = Math.ceil(Math.random() * 5)
        this.coeff2 = Math.ceil(Math.random() * 5)
        this.negative = Math.floor(Math.random() * 2)
        this.expression = ""
    }
}

class simpleFactoredQuadraticQuestion extends quadraticQuestion {
    constructor(question, type, details, desmosGraph, answers) {
        super(question, type, details, desmosGraph, answers)
        this.generateExpression = (string = false) => {
            
            while (this.x1 === 0 || this.x2 === 0 || this.x1 === 1 || this.x2 === 1) {
                this.x1 = Math.floor(Math.random() * 20) - 20
                this.x2 = Math.floor(Math.random() * 20) - 20
            }
            if (string === true) {
                // make a string for the expression
                this.expression = ""
            }
            if (this.negative === 0) {
                this.expression = rationalize(`(x-${this.x1}) * (x-${this.x2})`).toString().replace("*", "")
            } else {
                this.expression = rationalize(`(x-${this.x1}) * (x-${this.x2}) * -1`).toString().replace("*", "")
            }
        }
    }
}


// MHF4U
class polynomialQuestion extends QuestionClass {
    constructor(question, type, details, desmosGraph, answers) {
        super(question, type, details, desmosGraph, answers)
        this.degree = Math.ceil(Math.random() * 2) + 2
    }
}

class expandedPolynomialQuestion extends polynomialQuestion {
    constructor(question, type, details, desmosGraph, answers) {
        super(question, type, details, desmosGraph, answers)
        this.xInts = []
        this.leadingCoeff = 0
        this.coeff = 0
        this.expression = ""
        this.generateExpression = (nonOneCoeff = false ) => {
            for (let i=0; i < this.degree; i++) {
                if (i === 0 && nonOneCoeff === true) {
                    while (this.leadingCoeff === 0) {
                        this.leadingCoeff = Math.floor(Math.random() * 8) - 4
                    }
                    const tempX = Math.ceil(Math.random() * 10 - 5)
                    const tempxInt = Number(rationalize(`${tempX} / ${this.leadingCoeff}`).toString())

                    this.xInts.push(tempxInt)
                    this.expression = this.expression + `(${this.leadingCoeff}x-${tempX})`
                } else {
                    this.xInts.push(Math.ceil(Math.random() * 10) - 5)
                    this.expression = this.expression + `(x-${this.xInts[i]})`
                }
            }
            this.expression = rationalize(this.expression).toString().replace(/\*/g, '')
        }
        this.constant = Math.floor(Math.random() * 2)
        this.exponents = []
        this.generateExpandedExpression = (degree) => {
                for (let i = 0; i < degree; i++) {
                    this.exponents.push(Math.ceil(Math.random() * degree))
                }
                let tempExpression = ""
                for (let j = 0; j < degree; j++) {
                    // tempExpression = "x"
                    tempExpression = tempExpression + `${Math.ceil(Math.random() * 7)}x^${this.exponents[j]} + `
                }
                tempExpression = tempExpression + this.constant
                this.expression = rationalize(tempExpression).toTex().replace(/\\cdot/g, "")
        }
        this.generateExpandedGraphFunction = () => {
            while (this.leadingCoeff === 0 || this.coeff === 0) {
                this.leadingCoeff = (Math.ceil(Math.random() * 4) - 2) * 0.5
                this.coeff = Math.ceil(Math.random() * 2)
            }
            this.degree = []
            let tempExpression = this.leadingCoeff
            for (let i = 0; i < 3; i++) {
                this.degree.push([1, 1, 1, 2, 2][Math.floor(Math.random() * 5)])
                let tempxInt
                if (i === 0) {
                    tempxInt = [-3, -1, 1, 3][Math.floor(Math.random() * 4)]
                } else {
                    tempxInt =  Math.ceil(Math.random() * 8) - 4
                }
                while (this.xInts.includes(tempxInt)) {
                    tempxInt =  Math.ceil(Math.random() * 10) - 5
                }
                this.xInts.push(tempxInt)
            }
            for (let j=0; j<3; j++) {
                if (j === 0) {
                    tempExpression = tempExpression + `(${this.coeff}x-${this.xInts[j]})^${this.degree[j]}`
                } else {
                    tempExpression = tempExpression + `(x-${this.xInts[j]})^${this.degree[j]}`
                }
            }
            console.log(tempExpression)
            this.expression = "\\text{}"
            this.shortAnswerSolution = tempExpression
        } 
    }
}

class rationalQuestion extends QuestionClass {
    constructor(question, type, details, desmosGraph, answers) {
        super(question, type, details, desmosGraph, answers)
        this.expression = ""
        this.shortAnswerSolution = ""
        this.k = 1
        this.a = 0
        this.b = 1
        this.c = 1
        this.d = 1
        this.generateExpression = (numeratorDegree, denominatorDegree, constantNumerator = false, quadraticZeros = 2) => {
            if (constantNumerator === true) {
                while (this.k === 1 || this.k === 0) {
                    this.k = Math.ceil(Math.random() * 10) - 5
                }
            }

            // generate a reciprocal of a linear function
            if (numeratorDegree === 0 && denominatorDegree === 1) {
                while (this.a === 0 || this.c === 0 || Math.abs(this.a) === Math.abs(this.c)) {
                    this.a = Math.ceil(Math.random() * 9)
                    this.c = Math.ceil(Math.random() * 20) - 10
                }
                this.expression = rationalize(`1/(${this.a} * x - ${this.c})`).toTex().replace('\\cdot', '')
                this.shortAnswerSolution = `1/${this.a}x-${this.c}`
            }
            // generate a linear over linear function
            if (numeratorDegree === 1 && denominatorDegree === 1) {
                while((this.a / this.c) === (this.b / this.d) || (this.a / this.c ) === -(this.b / this.a) || (this.b / this.d) === -(this.d / this.c) || this.a === 0 || this.b === 0 || this.c === 0 || this.d === 0) {
                    this.a = Math.ceil(Math.random() * 18 ) - 9
                    this.b = Math.ceil(Math.random() * 18 ) - 9
                    this.c = Math.ceil(Math.random() * 18 ) - 9
                    this.d = Math.ceil(Math.random() * 18 ) - 9
                }
                this.expression = rationalize(`(${this.a}x+${this.b}) / (${this.c}x+${this.d})`).toTex().replace(/\\cdot/g, '')
                this.shortAnswerSolution = `(${this.a}x+${this.b})/(${this.c}+${this.d})`
            }
            // generate a reciprocal of a quadratic function
            if (numeratorDegree === 0 && denominatorDegree === 2) {
                while (this.a === 0 || this.c === 0 ||  this.b === 0 || this.d === 0 || Math.abs((this.b / this.a)) === Math.abs((this.d / this.c))) {
                    this.a = Math.ceil(Math.random() * 3)
                    this.b = Math.ceil(Math.random() * 18 ) - 9
                    this.d = Math.ceil(Math.random() * 18) - 9
                }
                this.expression = rationalize(`${this.k} / ((${this.a}x - ${this.b})(${this.c}x - ${this.d}))`).toTex().replace(/\\cdot/g, '')
                this.shortAnswerSolution = `${this.k} / ((${this.a}-${this.b}})(${this.c}-${this.d}))`
            }
        }
    }
}

class graphRationalQuestion extends rationalQuestion{
    constructor(question, type, details, desmosGraph, answers) {
        super(question, type, details, desmosGraph, answers)
        this.generateExpression = (numeratorDegree, denominatorDegree, nonOneNumerator = false) => {
            if (nonOneNumerator === true) {
                while (this.k === 1 || this.k === 0) {
                    this.k = Math.ceil(Math.random() * 10)
                }
            }
            
            // generate a reciprocal of a linear function
            if (numeratorDegree === 0 && denominatorDegree === 1) {
                while (this.a === 0 || this.c === 0 || Math.abs(this.a) === 3 || (this.a / this.k) === (this.c / this.k) || this.k % 2 === 0 && this.a % 2 === 0 && this.c % 2 === 0 || this.k % 3 === 0 && this.a % 3 === 0 && this.c % 3 === 0 || this.k % 5 === 0 && this.a % 5 === 0 && this.c % 5 === 0) {
                    this.a = Math.ceil(Math.random() * 10) - 6
                    this.c = Math.ceil(Math.random() * 20) - 12
                }
                this.expression = rationalize(`${this.k}/(${this.a} * x - ${this.c})`).toTex().replace('\\cdot', '')
                this.shortAnswerSolution = `${this.k}/(${this.a}x-${this.c})`
            }
            // generate a linear over linear function
            if (numeratorDegree === 1 && denominatorDegree === 1) {
                while((this.a / this.c) === (this.b / this.d) || (this.a / this.c ) === (- this.d / this.c) || (this.b / this.d) === (-this.b / this.a) || this.a === 0 || this.b === 0 || this.c === 0 || this.d === 0) {
                    this.a = Math.ceil(Math.random() * 9 ) - 18
                    this.b = Math.ceil(Math.random() * 9 ) - 18
                    this.c = Math.ceil(Math.random() * 9 ) - 18
                    this.d = Math.ceil(Math.random() * 9 ) - 18
                }
                this.expression = rationalize(`(${this.a}x+${this.b}) / (${this.c}x+${this.d})`).toTex().replace('\\cdot', '')
                this.shortAnswerSolution = `(${this.a}x+${this.b})/(${this.c}x+${this.d})`
            }
        }

    }
}

class sinusoidalQuestion extends QuestionClass {
        constructor(question, type, details, desmosGraph, answers) {
            super(question, type, details, desmosGraph, answers)
        this.a = 1
        this.k = 1
        this.d = 0
        this.c = 0
        this.ratio = ""
        this.shortAnswerSolution = ""
        this.verticalStretch = Math.floor(Math.random() * 2)
        this.horizontalCompression = Math.floor(Math.random() * 2)
        this.expression = ""
        this.answers = []
        this.compoundAngleFormulas = [
            {
                id: 1,
                expression: 'sin(x+y)',
                formula: {
                    type: "math",
                    content: '\\sin x \\cos y + \\cos x \\sin y'
                }
            },
            {
                id: 2,
                expression: 'sin(x-y)',
                formula: {
                    type: "math",
                    content: '\\sin x \\cos y - \\cos x \\sin y'
                }
            },
            {
                id: 3,
                expression: 'cos(x+y)',
                formula: {
                    type: 'math',
                    content: '\\cos x \\cos y - \\sin x \\sin y'
                }
            },
            {
                id: 4,
                expression: 'cos(x-y)',
                formula: {
                    type: "math",
                    content: '\\cos x \\cos y + \\sin x \\sin y'
                }
            }
        ]
        this.list = [
            {
                id: 1,
                definition: "sin",
                description: [
                    {
                        type: "math",
                        content: "\\frac{y}{r}"
                    }
                ]
            },
            {
                id: 2,
                definition: "cos",
                description: [
                    {
                        type: "math",
                        content: "\\frac{x}{r}"
                    }
                ]
            },
            {
                id: 3,
                definition: "tan",
                description: [
                    {
                        type: "math",
                        content: "\\frac{y}{x}"
                    }
                ]
            },
            {
                id: 4,
                definition: "csc",
                description: [
                    {
                        type: "math",
                        content: "\\frac{r}{y}"
                    }
                ]
            },
            {
                id: 5,
                definition: "sec",
                description: [
                    {
                        type: "math",
                        content: "\\frac{r}{x}"
                    }
                ]
            },
            {
                id: 6,
                definition: "cot",
                description: [
                    {
                        type: "math",
                        content: "\\frac{x}{y}"
                    }
                ]
            },
        ]
        this.equationAngle = [
            {
                value: {
                    text: 0,
                    latex: 0
                },
                sin: {
                    text:  [0, "pi", "2pi"],
                    latex: [0, "\\pi", "2\\pi"]
                },
                cos: {
                    text: ["pi/2", "3pi/2"],
                    latex: ["\\frac{\\pi}{2}", "\\frac{3\\pi}{2}"]
                }
            },
            {
                value: {
                    text: "1/2",
                    latex: "\\frac{1}{2}"
                },
                sin: {
                    text: ["pi/6", "5pi/6"],
                    latex: ["\\frac{\\pi}{6}",  "\\frac{5\\pi}{6}"]
                },
                cos: {
                    text: ["pi/3", "5pi/3"],
                    latex: ["\\frac{\\pi}{3}", "\\frac{5\\pi}{3}"]
                }
            },
            {
                value: {
                    text: "sqrt(2)/2",
                    latex: "\\frac{\\sqrt{2}}{2}"
                },
                sin: {
                    text: ["pi/4", "3pi/4"],
                    latex: ["\\frac{\\pi}{4}", "\\frac{3\\pi}{4}"]
                },
                cos: {
                    text: ["pi/4", "7pi/4"],
                    latex: ["\\frac{\\pi}{4}", "\\frac{7\\pi}{4}"]
                }
            },
            {
                value: {
                    text: "sqrt(3)/2",
                    latex: "\\frac{\\sqrt{3}}{2}"
                },
                sin: {
                    text: ["pi/3", "2pi/3"],
                    latex: ["\\frac{\\pi}{3}", "\\frac{2\\pi}{3}"]
                },
                cos: {
                    text: ["pi/6", "11pi/6"],
                    latex: ["\\frac{\\pi}{6}", "\\frac{11\\pi}{6}"]
                }
            },
            {
                value: {
                    text: 1,
                    latex: 1
                },
                sin: {
                    text: ["pi/2"],
                    latex: ["\\frac{\\pi}{2}"]
                },
                cos: {
                    text: [0, "2pi"],
                    latex: [0, "2\\pi"]
                }
            },
            {
                value: {
                    text: "-1/2",
                    latex: "-\\frac{1}{2}"
                },
                sin: {
                    text: ["7pi/6", "11pi/6"],
                    latex: ["\\frac{7\\pi}{6}",  "\\frac{11\\pi}{6}"]
                },
                cos: {
                    text: ["2pi/3", "4pi/3"],
                    latex: ["\\frac{2\\pi}{3}", "\\frac{4\\pi}{3}"]
                }
            },
            {
                value: {
                    text: "-sqrt(2)/2",
                    latex: "-\\frac{\\sqrt{2}}{2}"
                },
                sin: {
                    text: ["5pi/4", "7pi/4"],
                    latex: ["\\frac{5\\pi}{4}", "\\frac{7\\pi}{4}"]
                },
                cos: {
                    text: ["3pi/4", "5pi/4"],
                    latex: ["\\frac{3\\pi}{4}", "\\frac{5\\pi}{4}"]
                }
            },
            {
                value: {
                    text: "-sqrt(3)/2",
                    latex: "-\\frac{\\sqrt{3}}{2}"
                },
                sin: {
                    text: ["4pi/3", "5pi/3"],
                    latex: ["\\frac{4\\pi}{3}", "\\frac{5\\pi}{3}"]
                },
                cos: {
                    text: ["5pi/6", "7pi/6"],
                    latex: ["\\frac{5\\pi}{6}", "\\frac{7\\pi}{6}"]
                }
            },
            {
                value: {
                    text: "-1",
                    latex: "-1"
                },
                sin: {
                    text: ["-3pi/2"],
                    latex: ["\\frac{3\\pi}{2}"]
                },
                cos: {
                    text: ["pi"],
                    latex: ["\\pi"]
                }
            }
        ]
        this.equationLeftSide = ""
        this.equationRightSide = ""
        this.equationConstant = 0
        this.equationFactor = 0
        this.chosenAngle = Math.floor(Math.random() * 9)
        
        this.generateSimpleEquation = (parameters = {}) => {
            this.ratio = ["sin", "cos"][Math.floor(Math.random() * 2)]
            while (this.equationConstant === 0 || this.equationFactor === 0) {
                this.equationConstant = Math.floor(Math.random() * 10) - 10
                this.equationFactor = Math.floor(Math.random() * 10) - 10
            }
            this.expression = `${Math.abs(this.equationFactor) !== 1 ? this.equationFactor : this.equationFactor === -1 ? "-" : ""}\\text{${this.ratio}}\\theta  ${this.equationConstant > 0 ? `+ ${this.equationConstant}` : `${this.equationConstant}`}=${rationalize(`${this.equationAngle[this.chosenAngle].value.text} * ${this.equationFactor} + ${this.equationConstant}`).toTex().slice(0, 8)} \\hspace{10px} \\theta\\in[0, 2\\pi]`
        }

        this.generateQuadraticEquation = (parameters = {}) => {
            while (this.a === 0 || this.k === 0 || this.d === 0 || this.c === 0 || (Math.abs(this.k / this.a) > 1 && Math.abs(this.c / this.d) > 1 && this.ratio !== "tan")  ) {
                this.a = Math.ceil(Math.random() * 10) - 5
                this.k = Math.ceil(Math.random() * 10) - 5
                this.d = Math.ceil(Math.random() * 10) - 5
                this.c = Math.ceil(Math.random() * 10) - 5
            }
            console.log(`a=${this.a}, k=${this.k}, d=${this.d}, c=${this.c}, ${Math.abs(this.k / this.a) > 1}, ${Math.abs(this.c / this.d) > 1}`)
            this.ratio = ["sin", "cos", "tan"][Math.floor(Math.random() * 3)]
            this.expression = `${rationalize(`(${this.a}x+${this.k})(${this.d}x+${this.c})`).toTex().replace("{ x}^{2}", `\\${this.ratio}^{2} \\theta `).replace("x", `\\${this.ratio} \\theta`).replace(/\\cdot/g, "")}=0 \\hspace{15px} \\theta \\in [0, 2\\pi]`        
            let pi = parseFloat(3.14159)
            let quadraticEquationAnswers = []
            console.log(Math.abs(this.a) === Math.abs(this.k), Math.abs(this.d) === Math.abs(this.c), ((this.a > 0 && this.k < 0) || (this.a < 0 && this.k > 0)), ((this.a > 0 && this.k > 0) || (this.a < 0 && this.k < 0)), ((this.c > 0 && this.d < 0) || (this.c < 0 && this.d > 0)), ((this.c > 0 && this.d > 0) || (this.c < 0 && this.d < 0)) )
            if (this.ratio === "sin") {
                if (Math.abs(this.k) === Math.abs(this.a)) {
                    // TODO: fix this if statement (MOVE it to the top of the main if statement)
                    if ((this.a > 0 && this.k < 0) || (this.a < 0 && this.k > 0)) {
                        console.log("sin of the first factor is equal to 1")
                        quadraticEquationAnswers = quadraticEquationAnswers.concat([1.57])
                    } else if ((this.a > 0 && this.k > 0) || (this.a < 0 && this.k < 0)) {
                        console.log("sin of the first factor is equal to -1")
                        quadraticEquationAnswers = quadraticEquationAnswers.concat([4.71])
                    }
                } 
                    else if (Math.abs(this.k / this.a) <= 1) {
                    let relatedAcuteAngle = Number(asin(Math.abs(this.k / this.a)))
                    console.log("relatedAcuteAngle for sin(-k/a)",  Number(relatedAcuteAngle.toFixed(2)) + pi)
                    if ((-this.k / this.a) < 0) {
                        let solution1 = (pi + Number(relatedAcuteAngle) ).toFixed(2)
                        let solution2 = (2 * pi - Number(relatedAcuteAngle)).toFixed(2)
                        console.log(solution1, typeof solution1, solution2, typeof solution2)
                        
                        quadraticEquationAnswers = quadraticEquationAnswers.concat([solution1, solution2])

                    } else if ((-this.k / this.a) > 0) {
                        let solution1 = Number(relatedAcuteAngle).toFixed(2)
                        let solution2 = (pi - Number(relatedAcuteAngle)).toFixed(2)
                        console.log(solution1, typeof solution1, solution2, typeof solution2)
                        
                        quadraticEquationAnswers = quadraticEquationAnswers.concat([solution1, solution2])
  
                    }  
                }

                if (Math.abs(this.c / this.d) <= 1) {
                    let relatedAcuteAngle = asin(Math.abs(this.c / this.d))
                    console.log("relatedAcuteAngle for sin(-c/d)",  (relatedAcuteAngle) + pi)    
                    if (Math.abs(this.c) === Math.abs(this.d)) {
                        // TODO: fix this if statement
                        if ((this.c > 0 && this.d < 0) || (this.c < 0 && this.d > 0)) {
                            console.log("sin of the second factor is equal to 1")
                            quadraticEquationAnswers = quadraticEquationAnswers.concat([1.57])
                        } else if ((this.c > 0 && this.d > 0) || (this.c < 0 && this.d < 0)) {
                            console.log("sin of the second factor is equal to -1")
                            quadraticEquationAnswers = quadraticEquationAnswers.concat([4.71])
                        }
                    } 
                    else if ((-this.c / this.d) < 0) {
                            let solution1 = (Number(relatedAcuteAngle) + pi).toFixed(2)
                            let solution2 = (2 * pi - Number(relatedAcuteAngle)).toFixed(2)
                            console.log(solution1, typeof solution1, solution2, typeof solution2)
                            
                            quadraticEquationAnswers = quadraticEquationAnswers.concat([solution1, solution2])

                        } else if ((-this.k / this.a) > 0) {
                            let solution1 = Number(relatedAcuteAngle).toFixed(2)
                            let solution2 = (pi - Number(relatedAcuteAngle)).toFixed(2)
                            console.log(solution1, typeof solution1, solution2, typeof solution2)
                            
                            quadraticEquationAnswers = quadraticEquationAnswers.concat([solution1, solution2])

                        }  
                }
                console.log(quadraticEquationAnswers)
                this.answers = quadraticEquationAnswers.map(item => Number(item))
            } 
            else if (this.ratio === "cos") {
                if (Math.abs(this.k / this.a) <= 1) {
                    let relatedAcuteAngle = acos(Math.abs(this.k / this.a))
                    console.log("relatedAcuteAngle for cos(-k/a)",  relatedAcuteAngle)
                    if (Math.abs(this.k) === Math.abs(this.a)) {
                        if ((this.a > 0 && this.k < 0) || (this.a < 0 && this.k > 0)) {
                            console.log("cos of the first factor is equal to 1")
                            quadraticEquationAnswers = quadraticEquationAnswers.concat([0, 6.28])
                        } else if ((this.a > 0 && this.k > 0) || (this.a < 0 && this.k < 0)) {
                            console.log("cos of the first factor is equal to -1")
                            quadraticEquationAnswers = quadraticEquationAnswers.concat([3.14])
                        }
                    } 
                    else if ((-this.k / this.a) < 0) {
                        let solution1 = (pi - parseFloat(relatedAcuteAngle)).toFixed(2)
                        let solution2 = (pi + parseFloat(relatedAcuteAngle)).toFixed(2)
                        console.log(solution1, typeof solution1, solution2, typeof solution2)
                        
                        quadraticEquationAnswers = quadraticEquationAnswers.concat([solution1, solution2])

                    } else if ((-this.k / this.a) > 0) {
                        let solution1 = parseFloat(relatedAcuteAngle).toFixed(2)
                        let solution2 = (2 * pi - parseFloat(relatedAcuteAngle)).toFixed(2)
                        console.log(solution1, typeof solution1, solution2, typeof solution2)
                        
                        quadraticEquationAnswers = quadraticEquationAnswers.concat([solution1, solution2])

                    }  

                }
                if (Math.abs(this.c / this.d) <= 1) {
                    let relatedAcuteAngle = parseFloat(acos(Math.abs(this.c / this.d))).toFixed(2)
                    console.log("relatedAcuteAngle for cos(-c/d)",  relatedAcuteAngle)
                    if (Math.abs(this.c) === Math.abs(this.d)) {
                        if ((this.c > 0 && this.d < 0) || (this.c < 0 && this.d > 0)) {
                            console.log("cos of the first factor is equal to 1")
                            quadraticEquationAnswers = quadraticEquationAnswers.concat([0, 6.28])
                        } else if ((this.c > 0 && this.d > 0) || (this.c < 0 && this.d < 0)) {
                            console.log("cos of the first factor is equal to -1")
                            quadraticEquationAnswers = quadraticEquationAnswers.concat([3.14])
                        }
                    } 
                    else if ((-this.c / this.d) < 0) {
                        let solution1 = (pi - parseFloat(relatedAcuteAngle)).toFixed(2)
                        let solution2 = (pi + parseFloat(relatedAcuteAngle)).toFixed(2)
                        console.log(solution1, typeof solution1, solution2, typeof solution2)
                        
                        quadraticEquationAnswers = quadraticEquationAnswers.concat([solution1, solution2])

                    } else if ((-this.c / this.d) > 0) {
                        let solution1 = parseFloat(relatedAcuteAngle).toFixed(2)
                        let solution2 = (2 * pi - parseFloat(relatedAcuteAngle)).toFixed(2)
                        console.log(solution1, typeof solution1, solution2, typeof solution2)
                        
                        quadraticEquationAnswers = quadraticEquationAnswers.concat([solution1, solution2])
                    }  

                }
                console.log(quadraticEquationAnswers)
                this.answers = quadraticEquationAnswers.map(item => Number(item))
            } 
            else if (this.ratio === "tan") {
                let relatedAcuteAngle1 = atan(Math.abs(this.c / this.d))
                let relatedAcuteAngle2 = atan(Math.abs(this.k / this.a))
                console.log("relatedAcuteAngle for tan(-k/a)",  relatedAcuteAngle2)
                console.log("relatedAcuteAngle for tan(-c/d)",  relatedAcuteAngle1)
                if (Math.abs(this.k) === Math.abs(this.a)) {
                    if ((this.a > 0 && this.k < 0) || (this.a < 0 && this.k > 0)) {
                        console.log("tan of the first factor is equal to 1")
                        quadraticEquationAnswers = quadraticEquationAnswers.concat([0.79, 3.92])
                    } else if ((this.a > 0 && this.k > 0) || (this.a < 0 && this.k < 0)) {
                        console.log("tan of the first factor is equal to -1")
                        quadraticEquationAnswers = quadraticEquationAnswers.concat([2.36, 5.50])
                    }
                } 

                else if ((-this.k / this.a) < 0) {
                    let solution1 = (pi - parseFloat(relatedAcuteAngle2)).toFixed(2)
                    let solution2 = (2 * pi - parseFloat(relatedAcuteAngle2)).toFixed(2)
                    console.log(solution1, typeof solution1, solution2, typeof solution2)
                    
                    quadraticEquationAnswers = quadraticEquationAnswers.concat([solution1, solution2])

                } else if ((-this.k / this.a) > 0) {
                    let solution1 = parseFloat(relatedAcuteAngle2).toFixed(2)
                    let solution2 = (pi + parseFloat(relatedAcuteAngle2)).toFixed(2)
                    console.log(solution1, typeof solution1, solution2, typeof solution2)
                    
                    quadraticEquationAnswers = quadraticEquationAnswers.concat([solution1, solution2])

                }  
                // 1 --> 0.79, 3.92; -1 --> 2.36, 5.50
                if (Math.abs(this.c) === Math.abs(this.d)) {
                    if ((this.c > 0 && this.d < 0) || (this.c < 0 && this.d > 0)) {
                        console.log("tan of the first factor is equal to 1")
                        quadraticEquationAnswers = quadraticEquationAnswers.concat([0.79, 3.92])
                    } else if ((this.c > 0 && this.d > 0) || (this.c < 0 && this.d < 0)) {
                        console.log("tan of the first factor is equal to -1")
                        quadraticEquationAnswers = quadraticEquationAnswers.concat([2.36, 5.50])
                    }
                } 
                else if ((-this.c / this.d) < 0) {
                    let solution1 = (pi - parseFloat(relatedAcuteAngle1)).toFixed(2)
                    let solution2 = (2 * pi - parseFloat(relatedAcuteAngle1)).toFixed(2)
                    console.log(solution1, typeof solution1, solution2, typeof solution2)
                    
                    quadraticEquationAnswers = quadraticEquationAnswers.concat([solution1, solution2])

                } else if ((-this.c / this.d) > 0) {
                    let solution1 = parseFloat(relatedAcuteAngle1).toFixed(2)
                    let solution2 = (pi + parseFloat(relatedAcuteAngle1)).toFixed(2)
                    console.log(solution1, typeof solution1, solution2, typeof solution2)
                    
                    quadraticEquationAnswers = quadraticEquationAnswers.concat([solution1, solution2])

                }  

                console.log(quadraticEquationAnswers)
                this.answers = quadraticEquationAnswers.map(item => Number(item))
            }
        }
        
            
        this.generateExpression = (ratio, d = false) => {
            if (ratio === "sin" || ratio === "cos" || ratio === "tan" || ratio === "csc" || ratio === "sec" || ratio === "cot") {
                this.ratio = ratio
                while (this.a === 0 || this.k === 0 || this.d === 0 || Math.abs(this.k) === 1 || Math.abs(this.a) === Math.abs(this.k) || Math.abs(this.k) === Math.abs(this.d) || Math.abs(this.d) === Math.abs(this.c) || Math.abs(this.a) === Math.abs(this.d) || Math.abs(this.k) === Math.abs(this.c) || Math.abs(this.a) === Math.abs(this.c)) {
                    this.a = Math.ceil(Math.random() * 10 ) - 5
                    this.k = Math.ceil(Math.random() * 6 ) 
                    this.d = Math.ceil(Math.random() * 10 ) - 5
                    this.c = Math.ceil(Math.random() * 10 ) - 5
                }
                this.expression = simplify(`${this.verticalStretch === 1 || Math.abs(this.a) === 1 ? this.a : `1/${this.a}`}`)
                                    .toTex()
                                    .concat(`{\\text{${this.ratio}}}`)
                                    .concat("(")
                                    .concat(simplify(`${this.horizontalCompression === 1 ? this.k : `(1/${this.k})`}`).toTex())
                                    .concat("(")
                                    .concat(`${d === true ? simplify(`x-${this.d}`).toTex() : simplify(`x`).toTex()}`)
                                    .concat("))")
                                    .concat(`${this.c !== 0 ? this.c > 0 ? `+${this.c}` : `${simplify(`${this.c}`)}` : ""}`)
                                    .replace('\\cdot', '')
                                    .replace("1{\\text{sin", "{\\text{sin")
                                    .replace("1{\\text{cos", "{\\text{cos")
                                    .replace("1{\\text{tan", "{\\text{tan")
                                    .replace("1{\\text{csc", "{\\text{csc")
                                    .replace("1{\\text{sec", "{\\text{sec")
                                    .replace("1{\\text{cot", "{\\text{cot")
                }
            }

        }
    }

class sinusoidalWordProblem extends sinusoidalQuestion {
    constructor(question, type, details, desmosGraph, answers) {
        super(question, type, details, desmosGraph, answers)
        this.max = 0
        this.min = 0
        this.eoa = 0
        this.start = ""
        this.direction = ""
        this.period = 0
        
        this.generateSinusoidalWordProblemExpression = (parameters = {}) => {
            this.min = Math.ceil(Math.random() * 5)
            this.max = Math.ceil(Math.random() * 5) + 20
            this.c = (this.max + this.min) / 2
            this.eoa = this.c
            this.a = (this.max - this.min) / 2
            this.start = ["bottom", "middle", "top"][Math.floor(Math.random() * 3)]
            
            if (this.start === "middle") {
                this.direction = ["up", "down"][Math.floor(Math.random() * 2)]
            } else if (this.start === "top") {
                this.direction = "down"
            } else if (this.start === "bottom") {
                this.direction = "up"
            }
            
            if (this.start === "middle") {
                this.ratio = "sin"
                if (this.direction === "down") {
                    this.a = this.a * -1
                }
            } else if (this.start === "bottom") {
                this.ratio = "cos"
                this.a = this.a * -1
            } else if (this.start === "top") {
                this.ratio = "cos"
            }

            this.period = Math.ceil(Math.random() * 3) + 3
            this.expression = "\\text{}"
            this.shortAnswerSolution = `${this.a}${this.ratio}(${simplify(`2 / ${this.period}`).toString()}pit)+${this.c}`
        }
    }
}

class discreteDistributionQuestion extends QuestionClass {
    constructor(question, type, details, desmosGraph, answers) {
        super(question, type, details, desmosGraph, answers)
        this.list = [
            {
                id: 0,
                definition: "Uniform",
                description: [
                    {
                        type: "text",
                        content: 'the probability of any outcome is equal'
                    },
                    {
                        type: "math",
                        content: 'E(X)=\\frac{1}{n}(x_{1}+x_{2}+...x_{n})'
                    }
                ]
            },
            {
                id: 1,
                definition: "Binomial",
                description: [
                    {
                        type: "text",    
                        content: "the random variable is the number of succcesses and the trials are independent"
                    },
                    {
                        type: "math",
                        content: "E(X)=np"
                    }
                ]
            },
            {
                id: 2,
                definition: "Hypergeometric",
                description: [
                    {
                        type: "text",    
                        content: "the random variable is the number of succcesses and the trials are dependent"
                    },
                    {
                        type: "math",
                        content: "E(X)=\\frac{ra}{n}"
                    }
                ]
            },
            {
                id: 3,
                definition: "Geometric",
                description: [
                    {
                        type: "text",    
                        content: "the random variable is the number the waiting time and the trials are independent"
                    },
                    {
                        type: "math",
                        content: "E(X)=\\frac{q}{p}"
                    }
                ]
            },
        ]
        this.expression = false
        this.list1 = []
        this.list2 = []
        this.distribution = []
        this.generateDistribution = () => {
            const xCount = Math.ceil(Math.random() * 2) + 2
            let xList = []
            let pList = []
            let totalProb = 1
            while (xList.length < xCount) {
                const num = Math.ceil(Math.random() * 20)
                if (xList.indexOf(num) === -1) {
                    xList.push(num)
                }
            }
            xList.sort((a, b) => a - b)
            for (let j = 0; j < xCount; j++) {
                const num2 = Math.ceil(Math.random() * 4) / 10
                if (j === (xCount - 1)) {
                    pList.push(Number(totalProb.toFixed(1)))
                }
                else if (totalProb - num2 > 0 ) {
                    pList.push(num2.toFixed(1))
                    totalProb = totalProb - num2
                } else if (totalProb !== 0) {
                    pList.push(totalProb.toFixed(1))
                    totalProb = 0
                } else {
                    pList.push(0)
                }
            }
            for (let k = 0; k < xCount; k++) {
                this.distribution.push({
                    xValue: xList[k],
                    yValue: pList[k]
                })
            }
        }
    }
}

class logarithmQuestion extends QuestionClass {
    constructor(question, type, details, desmosGraph, answers) {
        super(question, type, details, desmosGraph, answers)
        this.base = Math.ceil(Math.random() * 3) + 2
        this.power = 1
        this.exp = Math.ceil(Math.random() * 4)
        this.a = 1
        this.k = 1
        this.d = 0
        this.c = 0
        this.negative = [1, -1][Math.floor(Math.random() * 2)]
        this.base = 1
        this.exp = 1
        this.sideToSimplify = ["left", "right"][Math.floor(Math.random() * 2)]
        this.sideWithExp = ["left", "right"][Math.floor(Math.random() * 2)]
        this.expression = ""
        this.shortAnswerSolution = ""
        this.operator = ""
        this.moveLog = [true, false][Math.floor(Math.random() * 2)]
        this.addBothSides = [true, false][Math.floor(Math.random() * 2)]
        this.coeff = 0
        this.solution1 = 0
        this.solution2 = 0
        this.generateExpression = (parameters = {}) => {
            while (this.base === this.exp || this.exp === 1 || this.base === 1 || this.exp === 0) {
                this.base = Math.ceil(Math.random() * 5)
                if(parameters.negativeBase === true) {
                    this.exp = Math.ceil(Math.random() * 8) - 8
                } else {
                    this.exp = Math.ceil(Math.random() * 8)
                }
            }
            let powerRuleExp = ""
            if(parameters.powerRuleExp === true) {
                powerRuleExp = Math.ceil(Math.random() * 4) + 1  
            }
            if (this.exp > 0) { 
                this.expression = `x=\\log_{${this.base}}${pow(this.base, this.exp)}^{${powerRuleExp}}`
            }
        }
        this.generateExponentialEquation = (parameters = {changeBase: true}) => {
            this.a = [2, 3, 5, 6, 7, 10][Math.floor(Math.random() * 6)]
            this.c = Math.ceil(Math.random() * 8) - 8
            this.d = [1, 2, 4, 5, 8, 10][Math.floor(Math.random() * 6)]
            while (this.k === 0 || this.k === 1) {
                this.k = Math.ceil(Math.random() * 6)
            }
            this.exp = simplify(`${this.d}x+${this.c}`).toTex().replace("~", "").trim()
            if (this.sideToSimplify === "right") {
                if (this.negative === 1) {
                    if (this.sideWithExp === "right") {
                        this.expression = `${this.a}^{x} = ${pow(this.a, this.k)}^{${this.exp}}`
                        this.shortAnswerSolution = `${this.k * this.d - 1}/${- this.k * this.c}`
                    } else if (this.sideWithExp === "left") {
                        this.expression = `${this.a}^{${this.exp}} = ${pow(this.a, this.k)}^{x}`
                        this.shortAnswerSolution = `${- this.c} / ${this.d - this.k}`
                    }
                } else if (this.negative === -1) {
                    if (this.sideWithExp === "right") {
                        this.expression = `${this.a}^{x} = (\\frac{1}{${pow(this.a, this.k)}})^{${this.exp}}`
                        this.shortAnswerSolution = `${- this.k * this.c}/${this.k * this.d + 1}`
                    } else if (this.sideWithExp === "left") {
                        this.expression = `${this.a}^{${this.exp}} = (\\frac{1}{${pow(this.a, this.k)}})^{x}`
                        this.shortAnswerSolution = `${- this.c} / ${this.d + this.k}`
                    }
                }
            } else if (this.sideToSimplify === "left") {
                if (this.negative === 1) {
                    if (this.sideWithExp === "left") {
                        this.expression = `${pow(this.a, this.k)}^{${this.exp}} = ${this.a}^{x}`
                        this.shortAnswerSolution = `${- this.k} / ${this.k * this.d - 1}`
                    } else if (this.sideWithExp === "right") {
                        this.expression = `${pow(this.a, this.k)}^{x} = ${this.a}^{${this.exp}}`
                        this.shortAnswerSolution = `${- this.c} / ${this.d - this.k}`
                    }
                } else if (this.negative === -1) {
                    if (this.sideWithExp === "left") {
                        this.expression = `(\\frac{1}{${pow(this.a, this.k)}})^{${this.exp}} = ${this.a}^{x}`
                        this.shortAnswerSolution = `${this.k} * ${this.c} / ${- this.k * this.d - 1}`
                    } else if (this.sideWithExp === "right") {
                        this.expression = `(\\frac{1}{${pow(this.a, this.k)}})^{x} = ${this.a}^{${this.exp}}`
                        this.shortAnswerSolution = `${- this.c} / ${this.d + this.k}`
                    }
                }
            }
        }
        this.generateExponentialEquation2 = (parameters = {}) => {
            while (this.k === this.a) {
                this.k = [2, 3, 5, 6, 7, 10, 12][Math.floor(Math.random() * 6)]
                this.a = [2, 3, 5, 6, 7, 10, 12][Math.floor(Math.random() * 6)]
            }
            this.d = Math.ceil(Math.random() * 10) - 10
            this.expression = `${this.a}^{x}=${this.k}^{${simplify(`x+${this.d}`)}}`
            this.shortAnswerSolution = `${this.d}log${this.k}/(log${this.a}-log${this.k})`
        }
        this.generateExponentialEquation3 = (parameters = {}) => {
            this.base = [2, 3, 5][Math.floor(Math.random() * 3)]
            this.d = Math.floor(Math.random() * 4)
            if (this.base === 2) {
                this.exp = Math.ceil(Math.random() * 5)
            } else {
                this.exp = Math.ceil(Math.random() * 4)
            }
            this.operator = ["add", "minus"][Math.floor(Math.random() * 2)]
            this.addBothSides = [true, false][Math.floor(Math.random() * 2)]
            if (this.addBothSides === true) {
                this.c = Math.ceil(Math.random() * 10)
            }
            this.expression = `${rationalize(`(x-${pow(this.base, this.exp)})(x${this.operator === "add" ? `+` : `-`}${pow(this.base, this.d)}) + ${this.c}`).toTex().replace("\\cdot", "").replace(/\x/g, `(${this.base}^{x})`)}=${this.c}`

            if (this.operator === "minus") {
                this.shortAnswerSolution = [this.exp, this.d]
            } else {
                this.shortAnswerSolution = [this.exp]
            }
        }

        this.extraneousRoots = []
        this.generateLogarithmicEquation = (parameters = {}) => {
            while (this.k === this.a || this.k === 0 || this.d === 0 || this.d === this.exp) {
                this.k = Math.floor(Math.random() * 6) - 2
                this.a = Math.ceil(Math.random() * 8)
                this.d = Math.floor(Math.random() * 5) - 5
                this.exp = Math.ceil(Math.random() * 2) + 1
            }
            this.base = Math.ceil(Math.random() * 2) + 2
            this.coeff = Math.ceil(Math.random() * 3)
            // this.expression = `\\log_{${this.base}}{(${simplify(`x+${this.k}`).toTex()})}`
            if (parameters.type === "add") {
                this.operator = "add"
            } else {
                this.operator = "minus"
            }
            if (this.operator === "add") {
                if (this.addBothSides === true) {
                    if (this.moveLog === true) {
                        this.expression = `${this.d} + \\log_{${this.base}}{(${simplify(`(${this.coeff}x)+${this.a}`).toTex().replace("\\cdot", "")})} = ${simplify(`${this.exp} + ${this.d}`).toTex()} -\\log_{${this.base}}{(${simplify(`x+${this.k}`).toTex()})} `
                    }
                    else if (this.moveLog === false) {
                        this.expression = `${this.d} + \\log_{${this.base}}{(${simplify(`(${this.coeff}x)+${this.a}`).toTex().replace("\\cdot", "")})} + \\log_{${this.base}}{(${simplify(`x+${this.k}`).toTex()})} = ${simplify(`${this.exp} + ${this.d}`).toTex()}`
                    }
                } else if (this.addBothSides === false) {
                    if (this.moveLog === true) {
                        this.expression = `\\log_{${this.base}}{(${simplify(`(${this.coeff}x)+${this.a}`).toTex().replace("\\cdot", "")})} = ${this.exp} - \\log_{${this.base}}{(${simplify(`x+${this.k}`).toTex()})}`
                    }
                    else if (this.moveLog === false) {
                        this.expression = `\\log_{${this.base}}{(${simplify(`(${this.coeff}x)+${this.a}`).toTex().replace("\\cdot", "")})} + \\log_{${this.base}}{(${simplify(`x+${this.k}`).toTex()})} = ${this.exp}`
                    }
                }
            } else if (this.operator === "minus") {
                if (this.addBothSides === true) {
                    if (this.moveLog === true) {
                        this.expression = `${this.d} + \\log_{${this.base}}{(${simplify(`(${this.coeff}x)+${this.a}`).toTex().replace("\\cdot", "")})} = ${simplify(`${this.exp} + ${this.d}`).toTex()} + \\log_{${this.base}}{(${simplify(`x+${this.k}`).toTex()})}`
                    }
                    else if (this.moveLog === false) {
                        this.expression = `${this.d} + \\log_{${this.base}}{(${simplify(`(${this.coeff}x)+${this.a}`).toTex().replace("\\cdot", "")})} - \\log_{${this.base}}{(${simplify(`x+${this.k}`).toTex()})} = ${simplify(`${this.exp} + ${this.d}`).toTex()}`
                    }
                } else if (this.addBothSides === false) {
                    if (this.moveLog === true) {
                        this.expression = `\\log_{${this.base}}{(${simplify(`(${this.coeff}x)+${this.a}`).toTex().replace("\\cdot", "")})} = ${this.exp} + \\log_{${this.base}}{(${simplify(`x+${this.k}`).toTex()})}`
                    }
                    else if (this.moveLog === false) {
                        this.expression = `\\log_{${this.base}}{(${simplify(`(${this.coeff}x)+${this.a}`).toTex().replace("\\cdot", "")})} - \\log_{${this.base}}{(${simplify(`x+${this.k}`).toTex()})} = ${this.exp}`
                    }
                }
            }
            
            if (this.operator === "add") {
                this.shortAnswerSolution = []
                let a = 1 * this.coeff
                let b = this.a + (this.coeff * this.k)
                let c = this.a * this.k - pow(this.base, this.exp)
                console.log(`a: ${a}`, `b: ${b}`, `c: ${c}`)
                
                let solution1 = (-1 * b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a)
                this.solution1 = solution1.toFixed(2)
                if ((this.coeff * solution1 + this.k) <= 0 || (solution1 + this.a) <= 0) {
                    this.extraneousRoots.push(Number(solution1.toFixed(2)))
                } else {
                    this.shortAnswerSolution.push(Number(solution1.toFixed(2)))
                }
                let solution2 = (-1 * b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a)
                this.solution2 = solution2.toFixed(2)
                if ((this.coeff * solution2 + this.k) <= 0 || (solution2 + this.a) <= 0) {
                    this.extraneousRoots.push(Number(solution2.toFixed(2)))
                } else {
                    this.shortAnswerSolution.push(Number(solution2.toFixed(2)))
                }
            } else if (this.operator === "minus") {
                let numerator = this.a - (pow(this.base, this.exp) * this.k)
                let denominator = (pow(this.base, this.exp) - this.coeff)
                console.log(`numerator: ${numerator}, denominator: ${denominator}`)
                let solution1 = numerator / denominator
                this.solution1 = Number(solution1.toFixed(2))
                console.log(solution1)
                this.shortAnswerSolution = []
                if ((this.coeff * solution1 + this.a) <= 0 || (solution1 + this.k) <=0 ) {
                    this.extraneousRoots.push(Number(solution1.toFixed(2)))
                } else {               
                    this.shortAnswerSolution = [Number(solution1.toFixed(2))]
                }
            }
        }
        this.generateCompoundInterestQuestion = (parameters = {}) => {
            // let c be the compounding rate
            // let k be the final amount
            // let exp be the number of compounding periods per year
            // let a be the the initial amount
            // let d be the the interest rate
            this.a = Math.ceil(Math.random() * 4) * 1000
            this.k = Math.ceil(Math.random() * 4) * 1000 + 4000
            this.d = Number((Math.ceil(Math.random() * 3) * 5.2).toFixed(1))
            this.exp = [2, 4, 12, 52][Math.floor(Math.random() * 4)]
            if (this.exp === 2) {
                this.c = "semi-annually"
            } else if (this.exp === 4) {
                this.c = "quarterly"
            } else if (this.exp === 12) {
                this.c = "monthly"
            } else if (this.exp === 52) {
                this.c = "weekly"
            }
            this.expression = "\\hspace{0px}"
            let numerator = log( this.k / this.a , (1 + this.d * 0.01 / this.exp))
            let denominator = this.exp
            console.log(numerator, denominator)
            this.shortAnswerSolution =  (numerator / denominator).toFixed(2)
        }
        this.generateGraphFunction = (parameters = {}) => {
            let verticalCompression = [true, false][Math.floor(Math.random() * 2)]
            let horizontalStretch = [true, false][Math.floor(Math.random() * 2)]
    
            while (this.a === 0 || this.a === 1 || this.k === 0 || this.k === 1 ||this.d === 0 || this.c === 0) 
            
            {
                if (verticalCompression === false) {
                    this.a = Math.ceil(Math.random() * 6) - 3
                } else {
                    this.a = "\\frac{1}{2}"
                }

                if (horizontalStretch === false) {
                    this.k = Math.ceil(Math.random() * 6) - 3
                } else {
                    this.k = "\\frac{1}{2}"
                }

                this.d = Math.ceil(Math.random() * 8) - 4
                this.c = Math.ceil(Math.random() * 8) - 4
            }
            this.solution1 = Math.floor(Math.random() * 4) 
            this.expression = [
                `${this.a}\\log(x-${this.d})`, 
                `${this.a}\\log(x)+${this.c}`, 
                `\\log(${this.k}(x-${this.d}))`, 
                `\\log(${this.k}x)+${this.c}`][this.solution1]
        }
        this.generatePowerLawExpression = (parameters = {}) => {
            this.a = ["root", "exp"][Math.floor(Math.random() * 2)]
            this.base = Math.ceil(Math.random() * 4) + 1
            this.exp = Math.ceil(Math.random() * 3) + 1
            if (this.a === "exp") {
                this.expression = `\\log_{${this.base}}{${pow(this.base, this.exp)}^{x}}`
            } else if (this.a === "root") {
                this.expression = `\\sqrt[x]{\\log_${this.base}{${pow(this.base, this.exp)}}}`
            }
        }
        this.generateDecibelQuestion = (parameters = {}) => {
            // let a be the type of question
            // let k be the louder sound
            // let d be the quieter sound

            this.a = ["solveForI2I1", "solveForI2I1", "solveForHigherDecibels", "solveforLowerDecibels"][Math.floor(Math.random() * 4)]
            this.k = [
                {
                    type: "a rocket",
                    decibels: 200
                }, 
                {
                    type: "a jet engine", 
                    decibels: 160
                }, 
                {
                    type: "a rock concert speaker", 
                    decibels: 150
                },
                {
                    type: "a symphony (peak)", 
                    decibels: 120
                },
                {
                    type: "maximum stereo output",
                    decibels: 100
                }]
            this.d = [
                {
                    type: "Niagara Falls", 
                    decibels: 90
                },
                {
                    type: "normal city traffic", 
                    decibels: 85
                },
                {
                    type: "a shout", 
                    decibels: 80
                },
                {
                    type: "a normal conversation", 
                    decibels: 60
                },
                {
                    type:"a whisper", 
                    decibels: 30
                },
                {
                    type: "the rustle of leaves",
                    decibels: 10
                }]
            this.c = Math.floor(Math.random() * 30) * 2 + 20
            this.solution1 = Math.floor(Math.random() * 5)
            this.k = this.k[this.solution1]
            this.solution2 = Math.floor(Math.random() * 6)
            this.d = this.d[this.solution2]
            this.expression = "\\beta_{2} - \\beta_{1} = 10\\log{(\\frac{I_{2}}{I_{1}})}"
            if (this.a === "solveForI2I1") {
                let betaDifference = (this.k.decibels - this.d.decibels) / 10
                this.shortAnswerSolution = pow(10, betaDifference).toFixed(2)
            
            } else if (this.a === "solveForHigherDecibels") {
                this.shortAnswerSolution = Number((10 * log(this.c, 10) + this.d.decibels).toFixed(2))

            } else if (this.a === "solveforLowerDecibels") {
                this.shortAnswerSolution = Number((this.k.decibels - 10 * log(this.c, 10)).toFixed(2))
            }
        }
        this.generatepHQuestion = (parameters={}) =>{
            this.a = ["solveForpH", "solveForConcentration"][Math.floor(Math.random() * 2)]
            this.exp = Math.ceil(Math.random() * 14) * -1
            this.expression = "\\text{pH}=-\\log{[H^{+}]}"
            this.shortAnswerSolution = logarithmQuestion12.a === "solveForpH" ? logarithmQuestion12.exp * -1 : pow(10, logarithmQuestion12.exp).toFixed(logarithmQuestion12.exp * -1)
        }
    }
}


class matchDiscreteDistribution extends  QuestionClass {
    constructor(question, type, details, desmosGraph, answers) {
        super(question, type, details, desmosGraph, answers)
        this.list1 = this.list.map(item => item.distribution)
        this.list2 = this.list.map(item => item.characteristics.content)
    }
}

//  add response messages 
const addAnswers = (question, options=[], correct=[], desmosParameters = {showGraph: null, graphfunction: null}) => {
    if (options.length === correct.length && question.type === MULTIPLE_CHOICE || question.type === MULTIPLE_ANSWERS) {
        for (let i=0; i < options.length; i++) {
            question.answers.push({
                option: options[i],
                correct: correct[i]
            })
        }
    } else if (question.type === SHORT_ANSWER && question.details.checkAnswer === CHECK_SETS) {
        for (let i=0; i < options.length; i++) {
            question.answers.push(options[i])
        }
        question.answers = new Set(question.answers)
    }
    else if (question.type === SHORT_ANSWER && question.details.checkAnswer === CHECK_EXPRESSION || question.details.checkAnswer === CHECK_PERMUTATION) {
        question.answers = [options]
    }
    else if (question.type === SORT_LIST) {
        question.answers = options
    }
    question.desmosGraph.showGraph = desmosParameters.showGraph
    question.desmosGraph.graphfunction = desmosParameters.expression
    question.desmosGraph.xAxisStep = desmosParameters.xAxisStep
    
    QuestionSet.push(question)
}

const permutator = (inputArr) => {
    let result = [];
  
    const permute = (arr, m = []) => {
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = arr.slice();
          let next = curr.splice(i, 1);
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result.map(item => item.join(""));
  }

// ---------------------------------------------------------------------------
// Quadratic Questions

// Q0
let quadraticQuestion1 = new simpleFactoredQuadraticQuestion(
    'What are the x-intercept(s) of this function?',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_SETS,
        strand: 'Quadratic Relations',
        course: MPM2D,
        questionInfo: 'assess knowledge of x-intercepts of quadratics',
        label: '{\\text{x-intercepts:}}',
        hints: ['separate each x-intercept with a comma'],
    }, 
)

quadraticQuestion1.generateExpression();

quadraticQuestion1.details.solutionSteps = [
        {type: 'text', content: 'If the function is in the form', },
        {type: 'math', content: 'x^{2}+bx+c'},
        {type: 'text', content: 'then we can find two numbers that add to b and multiply to c'},
        {type: 'text', content: 'In this case, '},
        {type: 'text', content: `${quadraticQuestion1.negative === 1 ? "the function has leading coefficient of -1, so we can factor that out" : ""}`},
        {type: 'math', content: `b=${-quadraticQuestion1.x1 + -quadraticQuestion1.x2} \\hspace{20px} c=${quadraticQuestion1.x1 * quadraticQuestion1.x2}`},
        {type: 'text', content: 'We can see that'},
        {type: 'math', content: `${-quadraticQuestion1.x1} + ${-quadraticQuestion1.x2} = ${-quadraticQuestion1.x1 + (-quadraticQuestion1.x2)} \\hspace{20px} ${-quadraticQuestion1.x1} \\times ${-quadraticQuestion1.x2} = ${-quadraticQuestion1.x1 * -quadraticQuestion1.x2}`},
        {type: 'text', content: 'So in factored form, we have:'},
        {type: 'math', content: `(${simplify(`x-${quadraticQuestion1.x1}`).toString()} )( ${simplify(`x-${quadraticQuestion1.x2}`).toString()})`},
        {type: 'text', content: 'The x-intercepts are where the function equals zero, so:'},
        {type: 'math', content: `x=${quadraticQuestion1.x1}, ${quadraticQuestion1.x2}`},
    ]

addAnswers(
    quadraticQuestion1,
    [quadraticQuestion1.x1, quadraticQuestion1.x2]
)

// Q1
let quadraticQuestion2 = new simpleFactoredQuadraticQuestion(
    'What is the equation of this function in standard form?',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_EXPRESSION,
        strand: 'Quadratic Functions',
        course: MCR3U,
        questionInfo: 'assess ability to convert graph to equation',
        label: 'f(x)=',
        hints: ['type exponents using "^"'],
        solutionSteps: ['']
    }
)

quadraticQuestion2.generateExpression()

quadraticQuestion2.details.solutionSteps = [
    {type: 'text', content: 'We see that the x-intercepts are'},
    {type: 'math', content: `x_1=${quadraticQuestion2.x1} \\hspace{20px} x_2=${quadraticQuestion2.x2} `},
    {type: 'text', content: 'So the equation of the function can be in the form'},
    {type: 'math', content: `a(${simplify(`x-${quadraticQuestion2.x1}`).toString()} )( ${simplify(`x-${quadraticQuestion2.x2}`).toString()})`},
    {type: 'text', content: `We need one other point on the graph and we see that the y-intercept is ${quadraticQuestion2.negative === 0 ? (0, simplify(quadraticQuestion2.x1 * quadraticQuestion2.x2).toString()) : (0, simplify(-1 * quadraticQuestion2.x1 * quadraticQuestion2.x2).toString())}`},
    {type: 'text', content: `So if we substitute the x- and y-values of the y-intercept into the equation of the function, we find ${quadraticQuestion2.negative === 1 ? 'a=-1' : 'a=1'}`},
    {type: 'math', content: `\\therefore ${quadraticQuestion2.negative === 0 ? `f(x)=${rationalize(`(x-${quadraticQuestion2.x1})(x-${quadraticQuestion2.x2})`).toTex().replace("\\cdot", "")}` : `f(x)=${rationalize(`-1 * (x-${quadraticQuestion2.x1})(x-${quadraticQuestion2.x2})`).toTex().replace("\\cdot", "")}`}`}
]

addAnswers(
    quadraticQuestion2,
    simplify(quadraticQuestion2.expression).toTex().replace("+-", "-").replace(/\\cdot/g, "").replace("~", ""),
    [],
    {
        showGraph: true,
        expression: [
            {
                latex: quadraticQuestion2.expression
            }
        ]
    }
)

// Q2
let quadraticQuestion3 = new simpleFactoredQuadraticQuestion(
    'What is this quadratic expression in factored form?',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_PERMUTATION,
        strand: 'Quadratic Functions',
        course: MCR3U,
        questionInfo: 'assess ability to factor quadratic functions',
        label: 'f(x)=',
        hints: ['If the function has a negative leading coefficient, put a "-" sign in front']
    }
)

quadraticQuestion3.generateExpression();

quadraticQuestion3.details.solutionSteps = [
    {type: 'text', content: `${quadraticQuestion3.negative === 1 ? 'We see that the leading coefficient is -1, so we can factor that out, giving us:' : ""}`},
    {type: 'math', content: `${quadraticQuestion3.negative === 1 ? `-(${rationalize(`(x-${quadraticQuestion3.x1})(x-${quadraticQuestion3.x2})`).toTex().replace('\\cdot', "")})` : "\\thinspace"}`},
    {type: 'text', content: `We need to find two numbers that have a sum of ${-(quadraticQuestion3.x1 + quadraticQuestion3.x2)} and multiply to ${quadraticQuestion3.x1 * quadraticQuestion3.x2}`},
    {type: 'math', content: `x_1=${simplify(`-1 * ${quadraticQuestion3.x1}`).toString()} \\hspace{20px} x_2=${simplify(`-1 * ${quadraticQuestion3.x2}`).toString()}`},
    {type: 'math', content: `\\therefore ${quadraticQuestion3.negative === 0 ? `f(x)=${simplify(`(x-${quadraticQuestion3.x1})(x-${quadraticQuestion3.x2})`).toTex().replace("\\cdot", "")}` : `f(x)=${simplify(`(x-${quadraticQuestion3.x1})(x-${quadraticQuestion3.x2})`).toTex().replace("\\cdot", "").replace("((", "(").replace("))", ")")}` }`}
]

addAnswers(
    quadraticQuestion3,
    quadraticQuestion3.negative === 0 
    ? 
    permutator([`(x${quadraticQuestion3.x1 > 0 ? `-${quadraticQuestion3.x1}` : `+${quadraticQuestion3.x1}`.replace("-", "")})`, `(x${quadraticQuestion3.x2 > 0 ? `-${quadraticQuestion3.x2}` : `+${quadraticQuestion3.x2}`.replace("-", "")})`])
    :
    permutator([`(x${quadraticQuestion3.x1 > 0 ? `-${quadraticQuestion3.x1}` : `+${quadraticQuestion3.x1}`.replace("-", "")})`, `(x${quadraticQuestion3.x2 > 0 ? `-${quadraticQuestion3.x2}` : `+${quadraticQuestion3.x2}`.replace("-", "")})`]).map(item => `-${item}`)
    ,
    []
)


// -----------------------------------------------------------------------------------
// Polynomial Questions

// Q3
let polynomialQuestion1 = new expandedPolynomialQuestion(
    'What are the x-intercept(s) of this function?',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_SETS,
        strand: 'Polynomial Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of x-intercepts of polynomials',
        label: '{\\text{x-intercepts:}}',
        hints: ['separate the each x-intercept with a comma']
    }
)

polynomialQuestion1.generateExpression();

polynomialQuestion1.details.solutionSteps = [
    {type: 'math', content: `${polynomialQuestion1.xInts.map(xInt => `f(${xInt})=`).join("")}0` }
]

addAnswers(
    polynomialQuestion1, 
    polynomialQuestion1.xInts
)

// Q4
let polynomialQuestion2 = new expandedPolynomialQuestion(
    'What are the x-intercept(s) of this function?',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_SETS,
        strand: 'Polynomial Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of x-intercepts of polynomials',
        label: '{\\text{x-intercepts:}}',
        hints: ['separate the each x-intercept with a comma']
    }
)

polynomialQuestion2.generateExpression(true);

polynomialQuestion2.details.solutionSteps = [
    {type: 'math', content: `${polynomialQuestion2.xInts.map(xInt => `f(${xInt})=`).join("")}0` }
]

addAnswers(
    polynomialQuestion2,
    polynomialQuestion2.xInts
)

// Q5
let polynomialQuestion3 = new expandedPolynomialQuestion(
    'What is the end behaviour of this function?',
    MULTIPLE_CHOICE,
    {
        strand: 'Polynomial Functions',
        course: MHF4U,
        questionInfo: 'assess end behaviour of polynomial functions'
    }
)

polynomialQuestion3.generateExpression(true);

polynomialQuestion3.details.solutionSteps = [
    {type: "text", content: `The leading coefficient is ${polynomialQuestion3.leadingCoeff > 0 ? 'positive' : 'negative'} and the degree is ${polynomialQuestion3.degree % 2 === 0 ? 'even' : 'odd'}`},
]

addAnswers(
    polynomialQuestion3,
    [`Q2 \\rightarrow Q1`, `Q2 \\rightarrow Q4`, `Q3 \\rightarrow Q1`, `Q3 \\rightarrow Q4`],
    [
        polynomialQuestion3.leadingCoeff > 0 &&  polynomialQuestion3.degree % 2 === 0 ? true : false,  
        polynomialQuestion3.leadingCoeff < 0 &&  polynomialQuestion3.degree % 2 === 1 ? true : false, 
        polynomialQuestion3.leadingCoeff > 0 &&  polynomialQuestion3.degree % 2 === 1 ? true : false, 
        polynomialQuestion3.leadingCoeff < 0 &&  polynomialQuestion3.degree % 2 === 0 ? true : false, 
    ]
)

let polynomialQuestion4 = new expandedPolynomialQuestion (
    'Is this function odd, even, or neither?',
    MULTIPLE_CHOICE,
    {
        strand: 'Polynomial Functions',
        course: MHF4U,
        questionInfo: 'assess line or point symmetry of polynomial functions'
    }
)

// polynomialQuestion4.generateExpression(true)
polynomialQuestion4.generateExpandedExpression(3)

addAnswers(
    polynomialQuestion4,
    ["\\text{odd}", "\\text{even}", "\\text{neither odd nor even}"],
    [
        (polynomialQuestion4.exponents.filter(item => item % 2 === 1).length === polynomialQuestion4.exponents.length) && polynomialQuestion4.constant === 0, 
        (polynomialQuestion4.exponents.filter(item => item % 2 === 0).length === polynomialQuestion4.exponents.length) && polynomialQuestion4.constant !== 0,
        (polynomialQuestion4.exponents.filter(item => item % 2 === 0).length !== polynomialQuestion4.exponents.length) && (polynomialQuestion4.exponents.filter(item => item % 2 === 1).length !== polynomialQuestion4.exponents.length)
    ]
)

let polynomialQuestion5 = new expandedPolynomialQuestion(
    'What is the equation of this function in factored form?',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_EXPRESSION,
        parseExpression: function(expression) {
            return rationalize(expression).toTex().replace("~", "").replace('\\cdot', '').trim()
        },
        strand: 'Polynomial Functions',
        course: MHF4U,
        questionInfo: 'identify the equation of a logarithmic function from its graph',
        label: "f(x)=",
        hints: ["Write your answers as k(x-a)(x-b)(x-c)", "All numbers in the factors should be whole numbers. For example, write 2(2x+5) instead of 4(x+2.5)", "All zeros are of degree 1 or 2"]
    }
)

polynomialQuestion5.generateExpandedGraphFunction()

addAnswers(
    polynomialQuestion5,
    polynomialQuestion5.shortAnswerSolution,
    [],
    {
        showGraph: true,
        expression: [
                {
                    latex: polynomialQuestion5.shortAnswerSolution, 
                    style: 'solid'
                },
            ],
    }
)

polynomialQuestion5.details.solutionSteps = [
    {type: "text", content: `We can first identify the x-intercepts. They are ${polynomialQuestion5.coeff !== 1 ? `${polynomialQuestion5.xInts[0]}/2` : polynomialQuestion5.xInts[0]}, ${polynomialQuestion5.xInts[1]} and ${polynomialQuestion5.xInts[2]} `},
    {type: "text", content: `Next we can find the degree of each zero. If they go through the x-axis, then the degree is 1. If they bounce off the x-axis the degeree is 2`},
    {type: "text", content: `The degree for ${simplify(`(x-${polynomialQuestion5.xInts[0]})`).toTex()} is ${polynomialQuestion5.degree[0]}, for ${simplify(`(x-${polynomialQuestion5.xInts[1]})`).toTex()} is ${polynomialQuestion5.degree[1]} and for ${simplify(`(x-${polynomialQuestion5.xInts[2]})`).toTex()} is ${polynomialQuestion5.degree[2]} `},
    {type: "text", content: "So the equation of the function is"},
    {type: "math", content: `k${polynomialQuestion5.degree[0] === 1 ? `(${simplify(`${polynomialQuestion5.coeff}x-${polynomialQuestion5.xInts[0]}`).toTex()})` : `(${simplify(`x-${polynomialQuestion5.xInts[0]}`).toTex()})^{${polynomialQuestion5.degree[0]}}`}${polynomialQuestion5.degree[1] === 1 ? `(${simplify(`x-${polynomialQuestion5.xInts[1]}`).toTex()})` : `(${simplify(`x-${polynomialQuestion5.xInts[1]}`).toTex()})^{${polynomialQuestion5.degree[1]}}`}${polynomialQuestion5.degree[2] === 1 ? `(${simplify(`x-${polynomialQuestion5.xInts[2]}`).toTex()})` : `(${simplify(`x-${polynomialQuestion5.xInts[2]}`).toTex()})^{${polynomialQuestion5.degree[2]}}`} ` },
    {type: "text", content: "Lastly, we need to solve for k. We can do this by finding the y-intercept"},
    {type: "text", content: `We see that the y-intercept is (0, ${pow(polynomialQuestion5.xInts[0], polynomialQuestion5.degree[0]) * pow(polynomialQuestion5.xInts[1], polynomialQuestion5.degree[1]) * pow(polynomialQuestion5.xInts[2], polynomialQuestion5.degree[2]) * Number(polynomialQuestion5.leadingCoeff)}     )`},
    {type: "text", content: "We can substitute 0 for x and then solve"},
    {type: "math", content: `${pow(polynomialQuestion5.xInts[0], polynomialQuestion5.degree[0]) * pow(polynomialQuestion5.xInts[1], polynomialQuestion5.degree[1]) * pow(polynomialQuestion5.xInts[2], polynomialQuestion5.degree[2]) * Number(polynomialQuestion5.leadingCoeff)}=${pow(polynomialQuestion5.xInts[0], polynomialQuestion5.degree[0]) * pow(polynomialQuestion5.xInts[1], polynomialQuestion5.degree[1]) * pow(polynomialQuestion5.xInts[2], polynomialQuestion5.degree[2])}k` },
    {type: "math", content: `k=${polynomialQuestion5.leadingCoeff}`},
    {type: "math", content: `f(x)=${polynomialQuestion5.leadingCoeff}${polynomialQuestion5.degree[0] === 1 ? `(${simplify(`${polynomialQuestion5.coeff}x-${polynomialQuestion5.xInts[0]}`).toTex()})` : `(${simplify(`x-${polynomialQuestion5.xInts[0]}`).toTex()})^{${polynomialQuestion5.degree[0]}}`}${polynomialQuestion5.degree[1] === 1 ? `(${simplify(`x-${polynomialQuestion5.xInts[1]}`).toTex()})` : `(${simplify(`x-${polynomialQuestion5.xInts[1]}`).toTex()})^{${polynomialQuestion5.degree[1]}}`}${polynomialQuestion5.degree[2] === 1 ? `(${simplify(`x-${polynomialQuestion5.xInts[2]}`).toTex()})` : `(${simplify(`x-${polynomialQuestion5.xInts[2]}`).toTex()})^{${polynomialQuestion5.degree[2]}}`}`}
]


// Q6
let rationalQuestion1 = new rationalQuestion(
    'What is the vertical asymptote of this function?',
    MULTIPLE_CHOICE,
    {
        strand: 'Rational Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of the reciprocal of a linear function'
    }
)

rationalQuestion1.generateExpression(0, 1)

rationalQuestion1.details.solutionSteps = [
    {type: "text", content: "The vertical asymptote exists at the values of x where the denominator is equal to zero, "},
    {type: "text", content: "which is when"},
    {type: "math", content: `x=${simplify(`${rationalQuestion1.c}/${rationalQuestion1.a}`).toTex()}`}
]

addAnswers(
    rationalQuestion1,
    [
        `x=${simplify(`${rationalQuestion1.a} / ${rationalQuestion1.c}`).toTex()}`, 
        `x=${simplify(`${rationalQuestion1.c} / ${rationalQuestion1.a}`).toTex()}`,
        `x=${simplify(`-${rationalQuestion1.a} / ${rationalQuestion1.c}`).toTex()}`,
        `x=${simplify(`-${rationalQuestion1.c} / ${rationalQuestion1.a}`).toTex()}`,
    ],
    [false, true, false, false]
)

// Q7
let rationalQuestion2 = new rationalQuestion(
    'What is the y-intercept of this function?',
    MULTIPLE_CHOICE,
    {
        strand: 'Rational Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of the reciprocal of a linear function'
    }
)

rationalQuestion2.generateExpression(0, 1)

rationalQuestion2.details.solutionSteps = [
    {type: "text", content: "The y-intercept exists where x is equal to zero"},
    {type: "math", content: `(0, ${simplify(`1/-${rationalQuestion2.c}`).toTex()} )`}
]

addAnswers(
    rationalQuestion2,
    [
        `(0, ${simplify(`- 1 / ${rationalQuestion2.c}`).toTex()})`,
        `(0, ${simplify(`- 1 / ${rationalQuestion2.a}`).toTex()})`,
        `(0, ${simplify(`${rationalQuestion1.a} / ${rationalQuestion1.c}`).toTex()})`, 
        `(0, ${simplify(`${rationalQuestion1.c} / ${rationalQuestion1.a}`).toTex()})`,
    ],
    [true, false, false, false]
)

// Q8
let rationalQuestion3 = new rationalQuestion(
    'What is the horizontal asymptote of this function?',
    MULTIPLE_CHOICE,
    {
        strand: 'Rational Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of linear over linear rational functions'
    }
)

rationalQuestion3.generateExpression(1, 1)

rationalQuestion3.details.solutionSteps = [
    {type: "text", content: "When a rational function is written in the form"},
    {type: "math", content: '\\frac{ax+b}{cx+d}'},
    {type: "text", content: "then the horizontal asymptote is where"},
    {type: "math", content: `y=\\frac{a}{c}`},
    {type: "math", content: `a=${rationalQuestion3.a} \\hspace{20px} c=${rationalQuestion3.c}`},
    {type: "text", content: "so the horizontal asymptote is"},
    {type: "math", content: `y=${simplify(`${rationalQuestion3.a}/${rationalQuestion3.c}`).toTex()}`}
]

addAnswers(
    rationalQuestion3,
    [
        `y=${simplify(`${rationalQuestion3.a} / ${rationalQuestion3.c}`).toTex()}`, 
        `y=${simplify(`-${rationalQuestion3.b} / ${rationalQuestion3.a}`).toTex()}`,
        `y=${simplify(`${rationalQuestion3.b} / ${rationalQuestion3.d}`).toTex()}`,
        `y=${simplify(`-${rationalQuestion3.d} / ${rationalQuestion3.c}`).toTex()}`,
    ],
    [true, false, false, false]
)

// Q9
let rationalQuestion4 = new rationalQuestion(
    'What is the vertical asymptote of this function?',
    MULTIPLE_CHOICE,
    {
        strand: 'Rational Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of linear over linear rational functions'
    }
)

rationalQuestion4.generateExpression(1, 1)

rationalQuestion4.details.solutionSteps = [
    {type: "text", content: "The vertical asymptote exists at the values of x where the denominator is equal to zero, "},
    {type: "text", content: "which is when"},
    {type: "math", content: `x=${simplify(`-${rationalQuestion4.d}/${rationalQuestion4.c}`).toTex()}`}
]

addAnswers(
    rationalQuestion4,
    [
        `x=${simplify(`${rationalQuestion4.a} / ${rationalQuestion4.c}`).toTex()}`, 
        `x=${simplify(`-${rationalQuestion4.b} / ${rationalQuestion4.a}`).toTex()}`,
        `x=${simplify(`${rationalQuestion4.b} / ${rationalQuestion4.d}`).toTex()}`,
        `x=${simplify(`-${rationalQuestion4.d} / ${rationalQuestion4.c}`).toTex()}`,
    ],
    [false, false, false, true]
)

// Q10
let rationalQuestion5 = new rationalQuestion(
    'What is the y-intercept of this function?',
    MULTIPLE_CHOICE,
    {
        strand: 'Rational Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of linear over linear rational functions'
    }
)

rationalQuestion5.generateExpression(1, 1)

rationalQuestion5.details.solutionSteps = [
    {type: "text", content: "The y-intercept exists where x is equal to zero"},
    {type: "math", content: `(0, ${simplify(`${rationalQuestion5.b}/${rationalQuestion5.d}`).toTex()} )`}
]

addAnswers(
    rationalQuestion5,
    [
        `(0, ${simplify(`${rationalQuestion5.a} / ${rationalQuestion5.c}`).toTex()})`, 
        `(0, ${simplify(`-${rationalQuestion5.b} / ${rationalQuestion5.a}`).toTex()})`,
        `(0, ${simplify(`${rationalQuestion5.b} / ${rationalQuestion5.d}`).toTex()})`,
        `(0, ${simplify(`-${rationalQuestion5.d} / ${rationalQuestion5.c}`).toTex()})`,
    ],
    [false, false, true, false]
)

// Q11
let rationalQuestion6 = new rationalQuestion(
    'What is the x-intercept of this function?',
    MULTIPLE_CHOICE,
    {
        strand: 'Rational Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of linear over linear functions'
    }
)

rationalQuestion6.generateExpression(1, 1)

rationalQuestion6.details.solutionSteps = [
    {type: "text", content: "The x-intercept is when the value of the denominator is equal to zero"},
    {type: "math", content: "ax+b=0"},
    {type: "text", content: `In this case a=${rationalQuestion6.a} and b=${rationalQuestion6.b}`},
    {type: "math", content: `(${simplify(`-${rationalQuestion6.b}/${rationalQuestion6.a}`).toTex()}, 0)`}
]

addAnswers(
    rationalQuestion6,
    [
        `(${simplify(`${rationalQuestion6.a} / ${rationalQuestion6.c}`).toTex()}, 0)`, 
        `(${simplify(`-${rationalQuestion6.b} / ${rationalQuestion6.a}`).toTex()}, 0)`,
        `(${simplify(`${rationalQuestion6.b} / ${rationalQuestion6.d}`).toTex()}, 0)`,
        `(${simplify(`-${rationalQuestion6.d} / ${rationalQuestion6.c}`).toTex()}, 0)`,
    ],
    [false, true, false, false]
)

// Q12
let rationalQuestion7 = new graphRationalQuestion(
    'What is the equation of this function?',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_EXPRESSION,
        parseExpression: function(expression) {
            return simplify(expression.trim()).toTex().replace("~", "").replace('\\cdot', '').trim().replace("+-", "-").replace("-(", "(").replace("x)", "x")
        },
        strand: 'Rational Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of the reciprocal of linear functions',
        label: 'f(x)=',
        hints: ['leave your numerator as a positive number', 'all numbers should be integers', 'use forward slashes ("/") to create a fraction', 'separate the numerator and denominator with brackets']
    }
)

rationalQuestion7.generateExpression(0, 1, true)

rationalQuestion7.details.solutionSteps = [
    {type: "text", content: "We see that the vertical asymptote is at"},
    {type: "math", content: `x=${simplify(`${rationalQuestion7.c}/${rationalQuestion7.a}`).toTex()}`},
    {type: "text", content: "so the denominator can be"},
    {type: "math", content: `${simplify(`${rationalQuestion7.a}x-${rationalQuestion7.c}`).toTex()}`},
    {type: "text", content: '(or any multiple of that)'},
    {type: "text", content: "We can then solve for k in "},
    {type: "math", content: `\\frac{k}{${simplify(`${rationalQuestion7.a}x-${rationalQuestion7.c}`).toTex().replace("\\cdot", "")}}` },
    {type: "text", content: `We can then substitute another point on the graph into the equation`},
    {type: "text", content: "Substituting the y-intercept, we get"},
    {type: "math", content: `${simplify(`-${rationalQuestion7.k}/${rationalQuestion7.c}`).toTex()}=\\frac{k}{${simplify(`-${rationalQuestion7.c}`).toTex()}}`},
    {type: "math", content: `k=${rationalQuestion7.k}`},
    {type: "math", content: `\\therefore f(x)=${simplify(`${rationalQuestion7.k}/(${rationalQuestion7.a}x-${rationalQuestion7.c})`).toTex().replace("\\cdot", "")} `}
]

addAnswers(
    rationalQuestion7,
    rationalQuestion7.expression,
    [],
    {
        showGraph: true,
        expression: [
            {
                latex: rationalQuestion7.expression, 
                style: 'solid'
            },
            {   
                latex: `x=${rationalQuestion7.c} / ${rationalQuestion7.a}`,
                style: 'dashed',
                color: "black"
            },

            ],
    }
)

// Q13
let rationalQuestion8 = new rationalQuestion(
    'What are the vertical asymptotes of this function?',
    MULTIPLE_ANSWERS,
    {
        strand: 'Rational Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of reciprocal of quadratic functions',
    }
)

rationalQuestion8.generateExpression(0, 2)

rationalQuestion8.details.solutionSteps = [
    {type: "text", content: "The vertical asymptotes are the values of x that make the denominator equal to zero"},
    {type: "text", content: "Factoring the denominator, we get"},
    {type: "math", content: `${simplify(`(${rationalQuestion8.a}x-${rationalQuestion8.b})(${rationalQuestion8.c}x-${rationalQuestion8.d})`).toTex()}`},
    {type: "text", content: "The vertical asymptotes are the values of x that make a factor equal to zero"},
    {type: "math", content: `\\therefore x=${simplify(`${rationalQuestion8.b}/${rationalQuestion8.a}`).toTex()}, ${simplify(`${rationalQuestion8.d}/${rationalQuestion8.c}`).toTex()}`}
]

addAnswers(
    rationalQuestion8,
    [
        `x=${simplify(`- ${rationalQuestion8.b} / ${rationalQuestion8.a}`).toTex()}`, 
        `x=${simplify(`- ${rationalQuestion8.d} / ${rationalQuestion8.c}`).toTex()}`, 
        `x=${simplify(`  ${rationalQuestion8.b} / ${rationalQuestion8.a}`).toTex()}`, 
        `x=${simplify(`  ${rationalQuestion8.d} / ${rationalQuestion8.c}`).toTex()}`, 
    ],
    [false, false, true, true]
)

// Sinusoidal Questions --------------------------------------------------------------

// Q14
let sinusoidalQuestion1 = new sinusoidalQuestion(
    'What is the amplitude of this function?',
    MULTIPLE_CHOICE,
    {
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of the equation of sinusoidal functions',
    }
)

sinusoidalQuestion1.generateExpression("sin", true) 

sinusoidalQuestion1.details.solutionSteps = [
    {type: "text", content: 'When a sinusoidal function is in the form of'},
    {type: "math", content: `f(x)=a\\sin(k(x-d)+c)`},
    {type: "text", content: 'then the amplitude is equal to |a|, so'},
    {type: "math", content: `|a|=${sinusoidalQuestion1.verticalStretch === 1 ? Math.abs(sinusoidalQuestion1.a) : `\\frac{1}{${Math.abs(sinusoidalQuestion1.a)}}`}`}
]

addAnswers(
    sinusoidalQuestion1,
    [
        sinusoidalQuestion1.verticalStretch ? Math.abs(sinusoidalQuestion1.a).toString() : simplify(`1/${Math.abs(sinusoidalQuestion1.a)}`).toTex(), sinusoidalQuestion1.horizontalCompression ? Math.abs(sinusoidalQuestion1.k).toString() : simplify(`1/${Math.abs(sinusoidalQuestion1.k)}`).toTex(), Math.abs(sinusoidalQuestion1.d).toString(), Math.abs(sinusoidalQuestion1.c).toString()
    ],
    [true, false, false, false]
)

// Q15
let sinusoidalQuestion2 = new sinusoidalQuestion(
    'What is the equation of axis of this function?',
    MULTIPLE_CHOICE,
    {
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equation of sinusoidal functions'
    }
)

sinusoidalQuestion2.generateExpression("cos", true) 

sinusoidalQuestion2.details.solutionSteps = [
    {type: "text", content: 'When a sinusoidal function is in the form of'},
    {type: "math", content: `f(x)=a\\cos(k(x-d))+c`},
    {type: "text", content: 'then the equation of the axis is equal to c, so the EoA is'},
    {type: "math", content: `y=${sinusoidalQuestion2.c}`}
]

addAnswers(
    sinusoidalQuestion2,
    [
        sinusoidalQuestion2.verticalStretch ? `y=${Math.abs(sinusoidalQuestion2.a).toString()}` : `y=${simplify(`1/${Math.abs(sinusoidalQuestion2.a)}`).toTex()}`, sinusoidalQuestion2.horizontalCompression ? `y=${Math.abs(sinusoidalQuestion2.k).toString()}` : `y=${simplify(`1/${Math.abs(sinusoidalQuestion2.k)}`).toTex()}`, `y=${Math.abs(sinusoidalQuestion2.d).toString()}`, `y=${sinusoidalQuestion2.c.toString()}`
    ],
    [false, false, false, true]
)

// Q16
let sinusoidalQuestion3 = new sinusoidalQuestion(
    'What is the period of this function?',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_EXPRESSION,
        parseExpression: function(expression) {
            return simplify(expression).toTex().replace("~", "").replace('\\cdot', '').trim()
        },
        label: "\\text{Period}=",
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equation of sinusoidal functions',
        hints: ["Type 'pi' instead of the symbol"]
    }
)

sinusoidalQuestion3.generateExpression("sin", true)

sinusoidalQuestion3.shortAnswerSolution = 
    sinusoidalQuestion3.horizontalCompression === 1 ? `2 * pi / ${Math.abs(sinusoidalQuestion3.k)}` : `2 * pi * ${Math.abs(sinusoidalQuestion3.k)}`


addAnswers(
    sinusoidalQuestion3,
    sinusoidalQuestion3.horizontalCompression === 1 ? simplify(`2 * pi / ${Math.abs(sinusoidalQuestion3.k)}`).toTex() : simplify(`2 * pi * ${Math.abs(sinusoidalQuestion3.k)}`).toTex(),
    []
)

sinusoidalQuestion3.details.solutionSteps = [
    {type: "text", content: 'When a sinusoidal function is in the form of'},
    {type: "math", content: `f(x)=a\\sin(k(x-d)+c)`},
    {type: "text", content: "the period of a sinusoidal can be found from the equation:"},
    {type: "math", content: "\\text{Period}=\\frac{2\\pi}{|k|}"},
    {type: "text", content: "So in this case the period is equal to"},
    {type: "math", content: `2\\pi \\div ${sinusoidalQuestion3.horizontalCompression === 1 ? Math.abs(sinusoidalQuestion3.k) : `\\frac{1}{${Math.abs(sinusoidalQuestion3.k)}}`}`},
    {type: "math", content:  sinusoidalQuestion3.horizontalCompression === 1 ? `=${simplify(`2 * pi / ${Math.abs(sinusoidalQuestion3.k)}`).toTex().replace("\\cdot", "")}` : `=${simplify(`2 * pi * ${Math.abs(sinusoidalQuestion3.k)}`).toTex().replace("\\cdot", "")}`}
]

// Q17
let sinusoidalQuestion4 = new sinusoidalQuestion (
    'What is the phase shift of this function?',
    MULTIPLE_CHOICE,
    {
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equation of sinusoidal functions'
    }   
)

sinusoidalQuestion4.generateExpression("cos", true) 

addAnswers(
    sinusoidalQuestion4,
    [sinusoidalQuestion4.d !== 0 ? `${Math.abs(sinusoidalQuestion4.d)} \\hspace{5px} \\text{unit(s) to left}` : `${Math.abs(sinusoidalQuestion4.c)} \\hspace{5px} \\text{unit(s) to left}`, sinusoidalQuestion4.d !== 0 ? `${Math.abs(sinusoidalQuestion4.d)} \\hspace{5px} \\text{unit(s) to right}` : `${Math.abs(sinusoidalQuestion4.c)} \\hspace{5px} \\text{unit(s) to right}`, `${Math.abs(sinusoidalQuestion4.k)} \\hspace{5px} \\text{unit(s) to right}`, `${Math.abs(sinusoidalQuestion4.k)} \\hspace{5px} \\text{unit(s) to left}`, '\\text{There is no phase shift}'],
    [sinusoidalQuestion4.d < 0 ? true : false, sinusoidalQuestion4.d > 0 ? true : false, false, false, true] 
)

sinusoidalQuestion4.details.solutionSteps = [
    {type: "text", content: 'When a sinusoidal function is in the form of'},
    {type: "math", content: `f(x)=a\\cos(k(x-d)+c)`},
    {type: "text", content: 'then the phase shift is equal to d'},
    {type: "math", content: `d=${sinusoidalQuestion4.d}`},
    {type: "text", content: "so the phase shift is"},
    {type: "math", content: sinusoidalQuestion4.d !== 0 ? sinusoidalQuestion4.d < 0 ? `${Math.abs(sinusoidalQuestion4.d)} \\hspace{5px} \\text{unit(s) to the left}` : `${Math.abs(sinusoidalQuestion4.d)} \\hspace{5px} \\text{unit(s) to the right}` : "0\\hspace{3px}\\text{(there is no phase shift)}"}
]

// Q18
let sinusoidalQuestion5 = new sinusoidalQuestion (
    'What is the equation of this function as a sine function?',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_EXPRESSION,
        parseExpression: function(expression) {
            return simplify(expression).toTex().replace("~", "").replace('\\cdot', '').trim()
        },
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equations of sinusoidal functions',
        label: "f(x)=",
        hints: ["Type your function as asin(kx)+c", "You can leave a or k blank if it is equal to 1", "You can leave c blank if it is equal to 0"]
    }
)

sinusoidalQuestion5.generateExpression("sin", false)

sinusoidalQuestion5.shortAnswerSolution = 
    `${sinusoidalQuestion5.verticalStretch === 1 ? sinusoidalQuestion5.a : simplify(`1/${sinusoidalQuestion5.a}`).toString()}sin(${sinusoidalQuestion5.horizontalCompression === 1 ? sinusoidalQuestion5.k : `${simplify(`1/${sinusoidalQuestion5.k}`).toString()}`}x)${sinusoidalQuestion5.c > 0 ? `+${sinusoidalQuestion5.c}` : sinusoidalQuestion5.c === 0 ? "" : `-${Math.abs(sinusoidalQuestion5.c)}`}`


addAnswers(
    sinusoidalQuestion5,
    sinusoidalQuestion5.expression,
    [],
    {
        showGraph: true,
        expression: [
            {
                latex: `y=${sinusoidalQuestion5.verticalStretch === 1 ? sinusoidalQuestion5.a : `1/${sinusoidalQuestion5.a}`}\\sin{${sinusoidalQuestion5.horizontalCompression === 1 ? sinusoidalQuestion5.k : `1/${sinusoidalQuestion5.k}`}x}+${sinusoidalQuestion5.c}`
            }
        ],
        xAxisStep: 'pi'
    }
)

sinusoidalQuestion5.details.solutionSteps = [
    {type: "text", content: `${sinusoidalQuestion5.a > 0 ? `We see that the function is increasing at x=0, so a is positive` : `We see that the function is decreasing at x=0, so a is negative`}`},
    {type: "text", content: `We see that the maximum of the function is`},
    {type: "math", content: `${sinusoidalQuestion5.verticalStretch === 1 ? Math.abs(sinusoidalQuestion5.a) + sinusoidalQuestion5.c : simplify(`1 / ${Math.abs(sinusoidalQuestion5.a)} + ${sinusoidalQuestion5.c}`).toTex()}`}, 
    {type: "text", content: `and the minimum is `},
    {type: "math", content: `${sinusoidalQuestion5.verticalStretch === 1 ? (Math.abs(sinusoidalQuestion5.a) * - 1) + sinusoidalQuestion5.c : simplify(`-1 / ${Math.abs(sinusoidalQuestion5.a)} + ${sinusoidalQuestion5.c}`).toTex()}`},
    {type: "text", content: 'Therefore the amplitude of the function, |a|, is:'},
    {type: "math", content: `\\vert \\frac{
        ${sinusoidalQuestion5.verticalStretch === 1 ? Math.abs(sinusoidalQuestion5.a) + sinusoidalQuestion5.c : simplify(`1 / ${Math.abs(sinusoidalQuestion5.a)} + ${sinusoidalQuestion5.c}`).toTex()} - 
        (${sinusoidalQuestion5.verticalStretch === 1 ? (Math.abs(sinusoidalQuestion5.a) * -1) + sinusoidalQuestion5.c : simplify(`-1 / ${Math.abs(sinusoidalQuestion5.a)} + ${sinusoidalQuestion5.c}`).toTex()})
        }{2} \\vert 
        = ${sinusoidalQuestion5.verticalStretch === 1 ? Math.abs(sinusoidalQuestion5.a) : simplify((`1 / ${Math.abs(sinusoidalQuestion5.a)}`)).toTex()}
        `},
    {type: "text", content: "The equation of the axis, c, is:"},
    {type: "math", content: `\\frac{
        ${sinusoidalQuestion5.verticalStretch === 1 ? Math.abs(sinusoidalQuestion5.a) + sinusoidalQuestion5.c : simplify(`1 / ${Math.abs(sinusoidalQuestion5.a)} + ${sinusoidalQuestion5.c}`).toTex()} + 
        (${sinusoidalQuestion5.verticalStretch === 1 ? (Math.abs(sinusoidalQuestion5.a) * -1) + sinusoidalQuestion5.c : simplify(`-1 / ${Math.abs(sinusoidalQuestion5.a)} + ${sinusoidalQuestion5.c}`).toTex()})
        }{2}
        = ${sinusoidalQuestion5.c}
        `},    
    {type: "text", content: "The period is can be found by calculating the distance between two consecutive minimum or two consecutive maximum values."},
    {type: "text", content: `So we see that the period is equal to `},
    {type: "math", content: simplify(` 2 * ${sinusoidalQuestion5.horizontalCompression === 0 ? sinusoidalQuestion5.k : `1/${sinusoidalQuestion5.k}`} * pi`).toTex().replace("\\cdot", "")},
    {type: "text", content: "k is equal to "},
    {type: "math", content: `\\frac{2\\pi}{\\text{period}}=\\frac{2\\pi}{${simplify(` 2 * ${sinusoidalQuestion5.horizontalCompression === 0 ? sinusoidalQuestion5.k : `1/${sinusoidalQuestion5.k}`} * pi`).toTex().replace("\\cdot", "")}}=${sinusoidalQuestion5.horizontalCompression === 1 ? simplify(sinusoidalQuestion5.k).toTex(): simplify(`1/${sinusoidalQuestion5.k}`).toTex()}`},  
]

// Q19
let sinusoidalQuestion6 = new sinusoidalQuestion (
    'What is the equation of this function as a cosine function?',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_EXPRESSION,
        parseExpression: function(expression) {
            return simplify(expression).toTex().replace("~", "").replace('\\cdot', '').trim()
        },
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equations of sinusoidal functions',
        label: "f(x)=",
        hints: ["Type your function as acos(kx)+c", "You can leave a or k blank if it is equal to 1", "You can leave c blank if it is equal to 0"]
    }
)

sinusoidalQuestion6.generateExpression("cos", false)

sinusoidalQuestion6.shortAnswerSolution = 
    `${sinusoidalQuestion6.verticalStretch === 1 ? sinusoidalQuestion6.a : simplify(`1/${sinusoidalQuestion6.a}`).toString()}cos(${sinusoidalQuestion6.horizontalCompression === 1 ? sinusoidalQuestion6.k : `${simplify(`1/${sinusoidalQuestion6.k}`).toString()}`}x)${sinusoidalQuestion6.c > 0 ? `+${sinusoidalQuestion6.c}` : sinusoidalQuestion6.c === 0 ? "" : `-${Math.abs(sinusoidalQuestion6.c)}`}`

addAnswers(
    sinusoidalQuestion6,
    [sinusoidalQuestion6.expression],
    [],
    {
        showGraph: true,
        expression: [
            {
                latex: `y=${sinusoidalQuestion6.verticalStretch === 1 ? sinusoidalQuestion6.a : `1/${sinusoidalQuestion6.a}`}\\cos{${sinusoidalQuestion6.horizontalCompression === 1 ? sinusoidalQuestion6.k : `1/${sinusoidalQuestion6.k}`}x}+${sinusoidalQuestion6.c}`
            }
        ],
        xAxisStep: 'pi'
    }
)

sinusoidalQuestion6.details.solutionSteps = [
    {type: "text", content: `${sinusoidalQuestion6.a > 0 ? `We see that the function is at the maximum at x=0, so a is positive` : `We see that the function is at the minimum at x=0, so a is negative`}`},
    {type: "text", content: `We see that the maximum of the function is`},
    {type: "math", content: `${sinusoidalQuestion6.verticalStretch === 1 ? Math.abs(sinusoidalQuestion6.a) + sinusoidalQuestion6.c : simplify(`1 / ${Math.abs(sinusoidalQuestion6.a)} + ${sinusoidalQuestion6.c}`).toTex()}`}, 
    {type: "text", content: `and the minimum is `},
    {type: "math", content: `${sinusoidalQuestion6.verticalStretch === 1 ? (Math.abs(sinusoidalQuestion6.a) * - 1) + sinusoidalQuestion6.c : simplify(`-1 / ${Math.abs(sinusoidalQuestion6.a)} + ${sinusoidalQuestion6.c}`).toTex()}`},
    {type: "text", content: 'Therefore the amplitude of the function, |a|, is:'},
    {type: "math", content: `\\vert \\frac{
        ${sinusoidalQuestion6.verticalStretch === 1 ? Math.abs(sinusoidalQuestion6.a) + sinusoidalQuestion6.c : simplify(`1 / ${Math.abs(sinusoidalQuestion6.a)} + ${sinusoidalQuestion6.c}`).toTex()} - 
        (${sinusoidalQuestion6.verticalStretch === 1 ? (Math.abs(sinusoidalQuestion6.a) * -1) + sinusoidalQuestion6.c : simplify(`-1 / ${Math.abs(sinusoidalQuestion6.a)} + ${sinusoidalQuestion6.c}`).toTex()})
        }{2} \\vert 
        = ${sinusoidalQuestion6.verticalStretch === 1 ? Math.abs(sinusoidalQuestion6.a) : simplify((`1 / ${Math.abs(sinusoidalQuestion6.a)}`)).toTex()}
        `},
    {type: "text", content: "The equation of the axis, c, is:"},
    {type: "math", content: `\\frac{
        ${sinusoidalQuestion6.verticalStretch === 1 ? Math.abs(sinusoidalQuestion6.a) + sinusoidalQuestion6.c : simplify(`1 / ${Math.abs(sinusoidalQuestion6.a)} + ${sinusoidalQuestion6.c}`).toTex()} + 
        (${sinusoidalQuestion6.verticalStretch === 1 ? (Math.abs(sinusoidalQuestion6.a) * -1) + sinusoidalQuestion6.c : simplify(`-1 / ${Math.abs(sinusoidalQuestion6.a)} + ${sinusoidalQuestion6.c}`).toTex()})
        }{2}
        = ${sinusoidalQuestion6.c}
        `},    
    {type: "text", content: "The period is can be found by calculating the distance between two consecutive minimum or two consecutive maximum values."},
    {type: "text", content: `So we see that the period is equal to `},
    {type: "math", content: simplify(` 2 * ${sinusoidalQuestion6.horizontalCompression === 0 ? sinusoidalQuestion6.k : `1/${sinusoidalQuestion6.k}`} * pi`).toTex().replace("\\cdot", "")},
    {type: "text", content: "k is equal to "},
    {type: "math", content: `\\frac{2\\pi}{\\text{period}}=\\frac{2\\pi}{${simplify(` 2 * ${sinusoidalQuestion6.horizontalCompression === 0 ? sinusoidalQuestion6.k : `1/${sinusoidalQuestion6.k}`} * pi`).toTex().replace("\\cdot", "")}}=${sinusoidalQuestion6.horizontalCompression === 1 ? simplify(sinusoidalQuestion6.k).toTex(): simplify(`1/${sinusoidalQuestion6.k}`).toTex()}`},  
]

// Q20
let sinusoidalQuestion7 = new sinusoidalQuestion (
    'What is the equation of this function as a cosine function?',
    MULTIPLE_CHOICE,
    {
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equations of sinusoidal functions',
    }
)

sinusoidalQuestion7.generateExpression("cos", true)

addAnswers(
    sinusoidalQuestion7,
    [sinusoidalQuestion7.expression, 
        simplify(`${sinusoidalQuestion7.verticalStretch === 1 || Math.abs(sinusoidalQuestion7.a) === 1 ? sinusoidalQuestion7.a : `1/${sinusoidalQuestion7.a}`}`)
                                    .toTex()
                                    .concat(`{\\text{${sinusoidalQuestion7.ratio}}}`)
                                    .concat("(")
                                    .concat(simplify(`${sinusoidalQuestion7.horizontalCompression === 1 ? sinusoidalQuestion7.k : `(1/${sinusoidalQuestion7.k})`}`).toTex())
                                    .concat("(")
                                    .concat(simplify(`x+${sinusoidalQuestion7.d}`).toTex())
                                    .concat("))")
                                    .concat(`${sinusoidalQuestion7.c !== 0 ? sinusoidalQuestion7.c > 0 ? `+${sinusoidalQuestion7.c}` : `${simplify(`${sinusoidalQuestion7.c}`)}` : ""}`)
                                    .replace('\\cdot', '')
                                    .replace("1{\\text{sin", "{\\text{sin")
                                    .replace("1{\\text{cos", "{\\text{cos")
                                    .replace("1{\\text{tan", "{\\text{tan")
                                    .replace("1{\\text{csc", "{\\text{csc")
                                    .replace("1{\\text{sec", "{\\text{sec")
                                    .replace("1{\\text{cot", "{\\text{cot"),
        simplify(`${sinusoidalQuestion7.verticalStretch === 1 || Math.abs(sinusoidalQuestion7.a) === 1 ? sinusoidalQuestion7.a : `1/${sinusoidalQuestion7.a}`}`)
                                    .toTex()
                                    .concat(`{\\text{${sinusoidalQuestion7.ratio}}}`)
                                    .concat("(")
                                    .concat(simplify(`${sinusoidalQuestion7.horizontalCompression === 0 ? sinusoidalQuestion7.k === 1 ? 2 : sinusoidalQuestion7.k : `(1/${sinusoidalQuestion7.k})`}`).toTex())
                                    .concat("(")
                                    .concat(simplify(`x+${sinusoidalQuestion7.d}`).toTex())
                                    .concat("))")
                                    .concat(`${sinusoidalQuestion7.c !== 0 ? sinusoidalQuestion7.c < 0 ? `+${Math.abs(sinusoidalQuestion7.c)}` : `-${simplify(`${sinusoidalQuestion7.c}`)}` : ""}`)
                                    .replace('\\cdot', '')
                                    .replace("1{\\text{sin", "{\\text{sin")
                                    .replace("1{\\text{cos", "{\\text{cos")
                                    .replace("1{\\text{tan", "{\\text{tan")
                                    .replace("1{\\text{csc", "{\\text{csc")
                                    .replace("1{\\text{sec", "{\\text{sec")
                                    .replace("1{\\text{cot", "{\\text{cot"),
        simplify(`${sinusoidalQuestion7.verticalStretch === 0 || Math.abs(sinusoidalQuestion7.a) === 1 ? sinusoidalQuestion7.a === 1 ? 2 : sinusoidalQuestion7.a : `1/${sinusoidalQuestion7.a}`}`)
                                    .toTex()
                                    .concat(`{\\text{${sinusoidalQuestion7.ratio}}}`)
                                    .concat("(")
                                    .concat(simplify(`${sinusoidalQuestion7.horizontalCompression === 1 ? sinusoidalQuestion7.k : `(1/${sinusoidalQuestion7.k})`}`).toTex())
                                    .concat("(")
                                    .concat(simplify(`x+${sinusoidalQuestion7.d}`).toTex())
                                    .concat("))")
                                    .concat(`${sinusoidalQuestion7.c !== 0 ? sinusoidalQuestion7.c < 0 ? `+${Math.abs(sinusoidalQuestion7.c)}` : `-${simplify(`${sinusoidalQuestion7.c}`)}` : ""}`)
                                    .replace('\\cdot', '')
                                    .replace("1{\\text{sin", "{\\text{sin")
                                    .replace("1{\\text{cos", "{\\text{cos")
                                    .replace("1{\\text{tan", "{\\text{tan")
                                    .replace("1{\\text{csc", "{\\text{csc")
                                    .replace("1{\\text{sec", "{\\text{sec")
                                    .replace("1{\\text{cot", "{\\text{cot"),
        simplify(`${Math.abs(sinusoidalQuestion7.c) === 0 ? 1 : sinusoidalQuestion7.c}`)
                                    .toTex()
                                    .concat(`{\\text{${sinusoidalQuestion7.ratio}}}`)
                                    .concat("(")
                                    .concat(simplify(`${sinusoidalQuestion7.horizontalCompression === 0 ? sinusoidalQuestion7.k === 1 ? 2 : sinusoidalQuestion7.k : `(1/${sinusoidalQuestion7.k})`}`).toTex())
                                    .concat("(")
                                    .concat(simplify(`x+${sinusoidalQuestion7.d}`).toTex())
                                    .concat("))")
                                    .concat(`${sinusoidalQuestion7.a === 0 ? "" : sinusoidalQuestion7.verticalStretch === 0 ? `+${Math.abs(sinusoidalQuestion7.a)}` : `+${simplify(`1/${Math.abs(sinusoidalQuestion7.a)}`).toTex()}` }`)
                                    .replace('\\cdot', '')
                                    .replace("1{\\text{sin", "{\\text{sin")
                                    .replace("1{\\text{cos", "{\\text{cos")
                                    .replace("1{\\text{tan", "{\\text{tan")
                                    .replace("1{\\text{csc", "{\\text{csc")
                                    .replace("1{\\text{sec", "{\\text{sec")
                                    .replace("1{\\text{cot", "{\\text{cot"),

    ],
    [true, false, false, false, false],
    {
        showGraph: true,
        expression: [
            {
                latex: `y=${sinusoidalQuestion7.verticalStretch === 1 ? sinusoidalQuestion7.a : `1/${sinusoidalQuestion7.a}`}\\cos(${sinusoidalQuestion7.horizontalCompression === 1 ? sinusoidalQuestion7.k : `1/${sinusoidalQuestion7.k}`}x ${sinusoidalQuestion7.d > 0 ? "-" : "+"} ${sinusoidalQuestion7.horizontalCompression === 1 ? sinusoidalQuestion7.k * Math.abs(sinusoidalQuestion7.d) : `${Math.abs(sinusoidalQuestion7.d)}/${sinusoidalQuestion7.k}`})+${sinusoidalQuestion7.c}`
            }
        ],
        xAxisStep: 'pi'
    }
)

sinusoidalQuestion7.details.solutionSteps = [
    {type: "text", content: `${sinusoidalQuestion7.a > 0 ? `We see that the function is at the maximum at x=${sinusoidalQuestion7.d}, so we can use a positive value for a and d can can equal ${sinusoidalQuestion7.d}` : `We see that the function is at the minimum at x=${sinusoidalQuestion7.d} so we can use a negtive value for a and d can can equal ${sinusoidalQuestion7.d}.`}`},
    {type: "text", content: `We see that the maximum of the function is`},
    {type: "math", content: `${sinusoidalQuestion7.verticalStretch === 1 ? Math.abs(sinusoidalQuestion7.a) + sinusoidalQuestion7.c : simplify(`1 / ${Math.abs(sinusoidalQuestion7.a)} + ${sinusoidalQuestion7.c}`).toTex()}`}, 
    {type: "text", content: `and the minimum is `},
    {type: "math", content: `${sinusoidalQuestion7.verticalStretch === 1 ? (Math.abs(sinusoidalQuestion7.a) * - 1) + sinusoidalQuestion7.c : simplify(`-1 / ${Math.abs(sinusoidalQuestion7.a)} + ${sinusoidalQuestion7.c}`).toTex()}`},
    {type: "text", content: 'Therefore the amplitude of the function, |a|, is:'},
    {type: "math", content: `\\vert \\frac{
        ${sinusoidalQuestion7.verticalStretch === 1 ? Math.abs(sinusoidalQuestion7.a) + sinusoidalQuestion7.c : simplify(`1 / ${Math.abs(sinusoidalQuestion7.a)} + ${sinusoidalQuestion7.c}`).toTex()} - 
        (${sinusoidalQuestion7.verticalStretch === 1 ? (Math.abs(sinusoidalQuestion7.a) * -1) + sinusoidalQuestion7.c : simplify(`-1 / ${Math.abs(sinusoidalQuestion7.a)} + ${sinusoidalQuestion7.c}`).toTex()})
        }{2} \\vert 
        = ${sinusoidalQuestion7.verticalStretch === 1 ? Math.abs(sinusoidalQuestion7.a) : simplify((`1 / ${Math.abs(sinusoidalQuestion7.a)}`)).toTex()}
        `},
    {type: "text", content: "The equation of the axis, c, is:"},
    {type: "math", content: `\\frac{
        ${sinusoidalQuestion7.verticalStretch === 1 ? Math.abs(sinusoidalQuestion7.a) + sinusoidalQuestion7.c : simplify(`1 / ${Math.abs(sinusoidalQuestion7.a)} + ${sinusoidalQuestion7.c}`).toTex()} + 
        (${sinusoidalQuestion7.verticalStretch === 1 ? (Math.abs(sinusoidalQuestion7.a) * -1) + sinusoidalQuestion7.c : simplify(`-1 / ${Math.abs(sinusoidalQuestion7.a)} + ${sinusoidalQuestion7.c}`).toTex()})
        }{2}
        = ${sinusoidalQuestion7.c}
        `},    
    {type: "text", content: "The period is can be found by calculating the distance between two consecutive minimum or two consecutive maximum values."},
    {type: "text", content: `So we see that the period is equal to `},
    {type: "math", content: simplify(` 2 * ${sinusoidalQuestion7.horizontalCompression === 0 ? sinusoidalQuestion7.k : `1/${sinusoidalQuestion7.k}`} * pi`).toTex().replace("\\cdot", "")},
    {type: "text", content: "k is equal to "},
    {type: "math", content: `\\frac{2\\pi}{\\text{period}}=\\frac{2\\pi}{${simplify(` 2 * ${sinusoidalQuestion7.horizontalCompression === 0 ? sinusoidalQuestion7.k : `1/${sinusoidalQuestion7.k}`} * pi`).toTex().replace("\\cdot", "")}}=${sinusoidalQuestion7.horizontalCompression === 1 ? simplify(sinusoidalQuestion7.k).toTex(): simplify(`1/${sinusoidalQuestion7.k}`).toTex()}`},  
]

// Q21
let sinusoidalQuestion8 = new sinusoidalQuestion (
    'What is the equation of this function as a sine function?',
    MULTIPLE_CHOICE,
    {
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equations of sinusoidal functions',
    }
)

sinusoidalQuestion8.generateExpression("sin", true)


addAnswers(
    sinusoidalQuestion8,
    [sinusoidalQuestion8.expression, 
        simplify(`${sinusoidalQuestion8.verticalStretch === 1 || Math.abs(sinusoidalQuestion8.a) === 1 ? sinusoidalQuestion8.a : `1/${sinusoidalQuestion8.a}`}`)
                                    .toTex()
                                    .concat(`{\\text{${sinusoidalQuestion8.ratio}}}`)
                                    .concat("(")
                                    .concat(simplify(`${sinusoidalQuestion8.horizontalCompression === 1 ? sinusoidalQuestion8.k : `(1/${sinusoidalQuestion8.k})`}`).toTex())
                                    .concat("(")
                                    .concat(simplify(`x+${sinusoidalQuestion8.d}`).toTex())
                                    .concat("))")
                                    .concat(`${sinusoidalQuestion8.c !== 0 ? sinusoidalQuestion8.c > 0 ? `+${sinusoidalQuestion8.c}` : `${simplify(`${sinusoidalQuestion8.c}`)}` : ""}`)
                                    .replace('\\cdot', '')
                                    .replace("1{\\text{sin", "{\\text{sin")
                                    .replace("1{\\text{cos", "{\\text{cos")
                                    .replace("1{\\text{tan", "{\\text{tan")
                                    .replace("1{\\text{csc", "{\\text{csc")
                                    .replace("1{\\text{sec", "{\\text{sec")
                                    .replace("1{\\text{cot", "{\\text{cot"),
        simplify(`${sinusoidalQuestion8.verticalStretch === 1 || Math.abs(sinusoidalQuestion8.a) === 1 ? sinusoidalQuestion8.a : `1/${sinusoidalQuestion8.a}`}`)
                                    .toTex()
                                    .concat(`{\\text{${sinusoidalQuestion8.ratio}}}`)
                                    .concat("(")
                                    .concat(simplify(`${sinusoidalQuestion8.horizontalCompression === 0 ? sinusoidalQuestion8.k === 1 ? 2 : sinusoidalQuestion8.k : `(1/${sinusoidalQuestion8.k})`}`).toTex())
                                    .concat("(")
                                    .concat(simplify(`x+${sinusoidalQuestion8.d}`).toTex())
                                    .concat("))")
                                    .concat(`${sinusoidalQuestion8.c !== 0 ? sinusoidalQuestion8.c < 0 ? `+${Math.abs(sinusoidalQuestion8.c)}` : `-${simplify(`${sinusoidalQuestion8.c}`)}` : ""}`)
                                    .replace('\\cdot', '')
                                    .replace("1{\\text{sin", "{\\text{sin")
                                    .replace("1{\\text{cos", "{\\text{cos")
                                    .replace("1{\\text{tan", "{\\text{tan")
                                    .replace("1{\\text{csc", "{\\text{csc")
                                    .replace("1{\\text{sec", "{\\text{sec")
                                    .replace("1{\\text{cot", "{\\text{cot"),
        simplify(`${sinusoidalQuestion8.verticalStretch === 0 || Math.abs(sinusoidalQuestion8.a) === 1 ? sinusoidalQuestion8.a === 1 ? 2 : sinusoidalQuestion8.a : `1/${sinusoidalQuestion8.a}`}`)
                                    .toTex()
                                    .concat(`{\\text{${sinusoidalQuestion8.ratio}}}`)
                                    .concat("(")
                                    .concat(simplify(`${sinusoidalQuestion8.horizontalCompression === 1 ? sinusoidalQuestion8.k : `(1/${sinusoidalQuestion8.k})`}`).toTex())
                                    .concat("(")
                                    .concat(simplify(`x+${sinusoidalQuestion8.d}`).toTex())
                                    .concat("))")
                                    .concat(`${sinusoidalQuestion8.c !== 0 ? sinusoidalQuestion8.c < 0 ? `+${Math.abs(sinusoidalQuestion8.c)}` : `-${simplify(`${sinusoidalQuestion8.c}`)}` : ""}`)
                                    .replace('\\cdot', '')
                                    .replace("1{\\text{sin", "{\\text{sin")
                                    .replace("1{\\text{cos", "{\\text{cos")
                                    .replace("1{\\text{tan", "{\\text{tan")
                                    .replace("1{\\text{csc", "{\\text{csc")
                                    .replace("1{\\text{sec", "{\\text{sec")
                                    .replace("1{\\text{cot", "{\\text{cot"),
        simplify(`${Math.abs(sinusoidalQuestion8.c) === 0 ? 1 : sinusoidalQuestion8.c}`)
                                    .toTex()
                                    .concat(`{\\text{${sinusoidalQuestion8.ratio}}}`)
                                    .concat("(")
                                    .concat(simplify(`${sinusoidalQuestion8.horizontalCompression === 0 ? sinusoidalQuestion8.k === 1 ? 2 : sinusoidalQuestion8.k : `(1/${sinusoidalQuestion8.k})`}`).toTex())
                                    .concat("(")
                                    .concat(simplify(`x+${sinusoidalQuestion8.d}`).toTex())
                                    .concat("))")
                                    .concat(`${sinusoidalQuestion8.a === 0 ? "" : sinusoidalQuestion8.verticalStretch === 0 ? `+${Math.abs(sinusoidalQuestion8.a)}` : `+${simplify(`1/${Math.abs(sinusoidalQuestion8.a)}`).toTex()}` }`)
                                    .replace('\\cdot', '')
                                    .replace("1{\\text{sin", "{\\text{sin")
                                    .replace("1{\\text{cos", "{\\text{cos")
                                    .replace("1{\\text{tan", "{\\text{tan")
                                    .replace("1{\\text{csc", "{\\text{csc")
                                    .replace("1{\\text{sec", "{\\text{sec")
                                    .replace("1{\\text{cot", "{\\text{cot"),

    ],
    [true, false, false, false, false],
    {
        showGraph: true,
        expression: [
            {
                latex: `y=${sinusoidalQuestion8.verticalStretch === 1 ? sinusoidalQuestion8.a : `1/${sinusoidalQuestion8.a}`}\\sin(${sinusoidalQuestion8.horizontalCompression === 1 ? sinusoidalQuestion8.k : `1/${sinusoidalQuestion8.k}`}x ${sinusoidalQuestion8.d > 0 ? "-" : "+"} ${sinusoidalQuestion8.horizontalCompression === 1 ? sinusoidalQuestion8.k * Math.abs(sinusoidalQuestion8.d) : `${Math.abs(sinusoidalQuestion8.d)}/${sinusoidalQuestion8.k}`})+${sinusoidalQuestion8.c}`
            }
        ],
        xAxisStep: 'pi'
    }
)

sinusoidalQuestion8.details.solutionSteps = [
    {type: "text", content: `${sinusoidalQuestion8.a > 0 ? `We see that the function is at the equation of the axis and increasing at x=${sinusoidalQuestion8.d}, so we can use a positive value for a and d can can equal ${sinusoidalQuestion8.d}` : `We see that the function is at the equation of the axis and decreasing at x=${sinusoidalQuestion8.d} so we can use a negtive value for a and d can can equal ${sinusoidalQuestion8.d}.`}`},
    {type: "text", content: `We see that the maximum of the function is`},
    {type: "math", content: `${sinusoidalQuestion8.verticalStretch === 1 ? Math.abs(sinusoidalQuestion8.a) + sinusoidalQuestion8.c : simplify(`1 / ${Math.abs(sinusoidalQuestion8.a)} + ${sinusoidalQuestion8.c}`).toTex()}`}, 
    {type: "text", content: `and the minimum is `},
    {type: "math", content: `${sinusoidalQuestion8.verticalStretch === 1 ? (Math.abs(sinusoidalQuestion8.a) * - 1) + sinusoidalQuestion8.c : simplify(`-1 / ${Math.abs(sinusoidalQuestion8.a)} + ${sinusoidalQuestion8.c}`).toTex()}`},
    {type: "text", content: 'Therefore the amplitude of the function, |a|, is:'},
    {type: "math", content: `\\vert \\frac{
        ${sinusoidalQuestion8.verticalStretch === 1 ? Math.abs(sinusoidalQuestion8.a) + sinusoidalQuestion8.c : simplify(`1 / ${Math.abs(sinusoidalQuestion8.a)} + ${sinusoidalQuestion8.c}`).toTex()} - 
        (${sinusoidalQuestion8.verticalStretch === 1 ? (Math.abs(sinusoidalQuestion8.a) * -1) + sinusoidalQuestion8.c : simplify(`-1 / ${Math.abs(sinusoidalQuestion8.a)} + ${sinusoidalQuestion8.c}`).toTex()})
        }{2} \\vert 
        = ${sinusoidalQuestion8.verticalStretch === 1 ? Math.abs(sinusoidalQuestion8.a) : simplify((`1 / ${Math.abs(sinusoidalQuestion8.a)}`)).toTex()}
        `},
    {type: "text", content: "The equation of the axis, c, is:"},
    {type: "math", content: `\\frac{
        ${sinusoidalQuestion8.verticalStretch === 1 ? Math.abs(sinusoidalQuestion8.a) + sinusoidalQuestion8.c : simplify(`1 / ${Math.abs(sinusoidalQuestion8.a)} + ${sinusoidalQuestion8.c}`).toTex()} + 
        (${sinusoidalQuestion8.verticalStretch === 1 ? (Math.abs(sinusoidalQuestion8.a) * -1) + sinusoidalQuestion8.c : simplify(`-1 / ${Math.abs(sinusoidalQuestion8.a)} + ${sinusoidalQuestion8.c}`).toTex()})
        }{2}
        = ${sinusoidalQuestion8.c}
        `},    
    {type: "text", content: "The period is can be found by calculating the distance between two consecutive minimum or two consecutive maximum values."},
    {type: "text", content: `So we see that the period is equal to `},
    {type: "math", content: simplify(` 2 * ${sinusoidalQuestion8.horizontalCompression === 0 ? sinusoidalQuestion8.k : `1/${sinusoidalQuestion8.k}`} * pi`).toTex().replace("\\cdot", "")},
    {type: "text", content: "k is equal to "},
    {type: "math", content: `\\frac{2\\pi}{\\text{period}}=\\frac{2\\pi}{${simplify(` 2 * ${sinusoidalQuestion8.horizontalCompression === 0 ? sinusoidalQuestion8.k : `1/${sinusoidalQuestion8.k}`} * pi`).toTex().replace("\\cdot", "")}}=${sinusoidalQuestion8.horizontalCompression === 1 ? simplify(sinusoidalQuestion8.k).toTex(): simplify(`1/${sinusoidalQuestion8.k}`).toTex()}`},  
]

// Q22
let sinusoidalQuestion9 = new sinusoidalQuestion (
    'What is the equation of this function?',
    MULTIPLE_CHOICE,
    {
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equations of sinusoidal functions',
    }
)

sinusoidalQuestion9.generateExpression(["tan", "csc", "sec", "cot"][Math.floor(Math.random() * 4)], true)

addAnswers(
    sinusoidalQuestion9,
    ['f(x)=\\text{tan}(x)', 'f(x)=\\text{csc}(x)', 'f(x)=\\text{sec}(x)', 'f(x)=\\text{cot}(x)'],
    [
        sinusoidalQuestion9.ratio === "tan" ? true : false,
        sinusoidalQuestion9.ratio === "csc" ? true : false,
        sinusoidalQuestion9.ratio === "sec" ? true : false,
        sinusoidalQuestion9.ratio === "cot" ? true : false,
    ],
    {
        showGraph: true,
            expression: [
                {
                latex: `y=\\${sinusoidalQuestion9.ratio}{x}`
                }
            ],
            xAxisStep: "pi"
    }
)

sinusoidalQuestion9.details.solutionSteps = [
    {type: "text", content: "We see that the range of this function is:"},
    {type: "math", content: sinusoidalQuestion9.ratio === "cot" || sinusoidalQuestion9.ratio === "tan" ? `(-\\infty, \\infty)` : `(-\\infty, 1] \\cup [1, \\infty]`},
    {type: "text", content: sinusoidalQuestion9.ratio === "cot" || sinusoidalQuestion9.ratio === "tan" ? `so the function is tan or cot.` : `so the function is csc or csc.`},
    {type: "text", content: "There is a vertical asymptote at"},
    {type: "math", content: sinusoidalQuestion9.ratio === "tan" || sinusoidalQuestion9.ratio === "sec" ? `x=\\frac{\\pi}{2}` : `x=0`},
    {type: "text", content: "So the equation of the function is: "},
    {type: "math", content: `f(x)=\\text{${sinusoidalQuestion9.ratio}}(x)`}
]

let sinusoidalQuestion10 = new sinusoidalQuestion (
    'Match each trigonometric ratio with its definition',
    SORT_LIST,
    {
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equations of sinusoidal functions',
    }
)

addAnswers(
    sinusoidalQuestion10,
    sinusoidalQuestion10.list.map(item => new Object({id: item.id, definition: item.definition, description: [item.description[0]]}))
)

sinusoidalQuestion10.details.solutionSteps = [
    {type: "text", content: "The definitions of each trigonometric ratio are:"},
    {type: "math", content: "\\sin\\theta=\\frac{y}{r}"},
    {type: "math", content: "\\cos\\theta=\\frac{x}{r}"},
    {type: "math", content: "\\tan\\theta=\\frac{y}{x}"},
    {type: "math", content: "\\csc\\theta=\\frac{r}{y}"},
    {type: "math", content: "\\sec\\theta=\\frac{r}{x}"},
    {type: "math", content: "\\cot\\theta=\\frac{x}{y}"},
]

let sinusoidalQuestion11 = new sinusoidalQuestion (
    'Solve for the angle(s) in the equation',
    MULTIPLE_ANSWERS,
    {
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'sinusoidal equations',

    }, 
)

sinusoidalQuestion11.generateSimpleEquation()

addAnswers(
    sinusoidalQuestion11,
    ["0", "\\frac{\\pi}{6}", "\\frac{\\pi}{4}", "\\frac{\\pi}{3}", "\\frac{\\pi}{2}", "\\frac{2\\pi}{3}", "\\frac{3\\pi}{4}", "\\frac{5\\pi}{6}", "\\pi", "\\frac{7\\pi}{6}", "\\frac{5\\pi}{4}", "\\frac{4\\pi}{3}", "\\frac{3\\pi}{2}", "\\frac{5\\pi}{3}",  "\\frac{7\\pi}{4}", "\\frac{11\\pi}{6}", "2\\pi"],
    [
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("0"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{\\pi}{6}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{\\pi}{4}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{\\pi}{3}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{\\pi}{2}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{2\\pi}{3}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{3\\pi}{4}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{5\\pi}{6}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\pi"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{7\\pi}{6}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{5\\pi}{4}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{4\\pi}{3}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{3\\pi}{2}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{5\\pi}{3}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{7\\pi}{4}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("\\frac{11\\pi}{6}"),
        sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex.includes("2\\pi"),
    ]
)

sinusoidalQuestion11.details.solutionSteps = [
    {type: "text", content: "Isolating the trigonometric ratio, we get"},
    {type: "math", content: `\\${sinusoidalQuestion11.ratio}\\theta=${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle].value.latex}`},
    {type: "text", content: `${(sinusoidalQuestion11.chosenAngle >  4 && sinusoidalQuestion11.chosenAngle !== 8 ) ? "Next we get the related acute angle" : "Solving for the angle, we get"}`},
    {type: "math", content: (sinusoidalQuestion11.chosenAngle > 4 && sinusoidalQuestion11.chosenAngle !== 8) 
                            ?
                            `\\${sinusoidalQuestion11.ratio}^{-1}${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle % 4].value.latex}=${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle % 4][sinusoidalQuestion11.ratio].latex[0]}`
                            :
                            `\\${sinusoidalQuestion11.ratio}^{-1}${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle].value.latex}=${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex[0]}`

    },
    {type: "text", content: 
                            (sinusoidalQuestion11.chosenAngle !== 4 && sinusoidalQuestion11.chosenAngle !== 8)
                            ?
                                sinusoidalQuestion11.chosenAngle > 4 
                                ?
                                    sinusoidalQuestion11.ratio === "sin" 
                                    ?
                                    `sin is negative in the 3rd and 4th quadrants` 
                                    :
                                    `cos is negative in the 2nd and 3rd quadrants`
                                : 
                                    sinusoidalQuestion11.ratio === "sin"
                                    ?
                                    `sin is also positive in the 2nd quadrant`
                                    :
                                    `cos is also positive in the 4th quadrant`
                            :
                            ""
    },
    {type: "math", content: 
                            (sinusoidalQuestion11.chosenAngle !== 4 && sinusoidalQuestion11.chosenAngle !== 8)
                            ?
                                sinusoidalQuestion11.chosenAngle > 4 
                                ?
                                    sinusoidalQuestion11.ratio === "sin" 
                                    ?
                                    `\\theta = 2\\pi - ${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle % 4][sinusoidalQuestion11.ratio].latex[0]}=${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex[0]}, \\pi + ${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle % 4][sinusoidalQuestion11.ratio].latex[0]} = ${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex[1]}`
                                    :
                                    `\\theta = \\pi - ${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle % 4][sinusoidalQuestion11.ratio].latex[0]}=${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex[0]}, \\pi + ${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle % 4][sinusoidalQuestion11.ratio].latex[0]} = ${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex[1]}`
                                : 
                                    sinusoidalQuestion11.ratio === "sin"
                                    ?
                                    `\\theta = \\pi - ${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle % 4][sinusoidalQuestion11.ratio].latex[0]}=${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex[1]}`
                                    :
                                    `\\theta = 2\\pi - ${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle % 4][sinusoidalQuestion11.ratio].latex[0]}=${sinusoidalQuestion11.equationAngle[sinusoidalQuestion11.chosenAngle][sinusoidalQuestion11.ratio].latex[1]}`
                            :
                            ""
    }
]

let sinusoidalQuestion12 = new sinusoidalQuestion (
    'Match each compounded angle formula with its expanded form',
    SORT_LIST,
    {
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equations of sinusoidal functions',
    }
)

addAnswers(
    sinusoidalQuestion12,
    sinusoidalQuestion12.compoundAngleFormulas.map(item => new Object({id: item.id, definition: item.expression, description: [item.formula]}))
)

sinusoidalQuestion12.details.solutionSteps = [
    {type: "math", content: `\\sin(x+y)=\\sin x \\cos y + \\cos x \\sin y`},
    {type: "math", content: `\\sin(x-y)=\\sin x \\cos y - \\cos x \\sin y`},
    {type: "math", content: `\\cos(x+y)=\\cos x \\cos y - \\sin x \\sin y`},
    {type: "math", content: `\\cos(x-y)=\\cos x \\cos y + \\sin x \\sin y`}
]

let sinusoidalQuestion13 = new sinusoidalQuestion (
    'Solve for the angle(s) in the equation',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_SETS,
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equations of sinusoidal equations',
        label: "\\theta =",
        hints: ["Round your answers to two decimal places", "If the second decimal number is 0 after rounding, do not type it"]
    }
)

sinusoidalQuestion13.generateQuadraticEquation()

addAnswers(
    sinusoidalQuestion13,
    [...sinusoidalQuestion13.answers]
)

sinusoidalQuestion13.details.solutionSteps = [
    {type: "text", content: "Once we've isolated one side of the equation, we can factor it. Factoring, we get"},
    {type: "math", content: `${sinusoidalQuestion13.a < 0 && sinusoidalQuestion13.k < 0 && sinusoidalQuestion13.d < 0 && sinusoidalQuestion13.c < 0 
                            ?
                            `(${Math.abs(sinusoidalQuestion13.a) === 1 ? "" : Math.abs(sinusoidalQuestion13.a)} \\${sinusoidalQuestion13.ratio} \\theta +${Math.abs(sinusoidalQuestion13.k)})(${Math.abs(sinusoidalQuestion13.d) === 1 ? "" : Math.abs(sinusoidalQuestion13.d)} \\${sinusoidalQuestion13.ratio} \\theta +${Math.abs(sinusoidalQuestion13.c)})`
                            :
                            `(${Math.abs(sinusoidalQuestion13.a) === 1 ? sinusoidalQuestion13.a === -1 ? "-" : "" : sinusoidalQuestion13.a} \\${sinusoidalQuestion13.ratio} \\theta ${sinusoidalQuestion13.k > 0 ? `+${sinusoidalQuestion13.k}` : sinusoidalQuestion13.k})(${Math.abs(sinusoidalQuestion13.d) === 1 ? sinusoidalQuestion13.d === -1 ? "-" : "" : sinusoidalQuestion13.d} \\${sinusoidalQuestion13.ratio} \\theta ${sinusoidalQuestion13.c > 0 ? `+${sinusoidalQuestion13.c}` : sinusoidalQuestion13.c} )`
                            }`
    
    },
    {type: "text", content: `Isolating the ${sinusoidalQuestion13.ratio} ratio from each factor, we get`},
    {type: "math", content: `\\${sinusoidalQuestion13.ratio} \\theta = \\frac{${sinusoidalQuestion13.k > 0 ? `-${sinusoidalQuestion13.k}` : Math.abs(sinusoidalQuestion13.k)}}{${sinusoidalQuestion13.a}}  \\hspace{25px}  \\${sinusoidalQuestion13.ratio} \\theta = \\frac{${sinusoidalQuestion13.c > 0 ? `-${sinusoidalQuestion13.c}` : Math.abs(sinusoidalQuestion13.c)}}{${sinusoidalQuestion13.d}} `},
    {type: "text", content: `Next we can use the inverse ${sinusoidalQuestion13.ratio} to solve for the angle`},
    {type: "math", content: ` \\theta = \\${sinusoidalQuestion13.ratio}^{-1} \\frac{${sinusoidalQuestion13.k > 0 ? `-${sinusoidalQuestion13.k}` : Math.abs(sinusoidalQuestion13.k)}}{${sinusoidalQuestion13.a}}  \\hspace{25px}  \\theta = \\${sinusoidalQuestion13.ratio}^{-1} \\frac{${sinusoidalQuestion13.c > 0 ? `-${sinusoidalQuestion13.c}` : Math.abs(sinusoidalQuestion13.c)}}{${sinusoidalQuestion13.d}} `}, 
    {type: "math", content: `\\theta = ${[...sinusoidalQuestion13.answers].toString()}`}
]

let sinusoidalQuestion14 = new sinusoidalQuestion (
    'Convert the following angle from degrees to radians',
    MULTIPLE_CHOICE,
    {
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of radian measure'
    }
)

sinusoidalQuestion14.chosenAngle = Math.ceil(Math.random() * 340) + 20
sinusoidalQuestion14.expression = `${sinusoidalQuestion14.chosenAngle}^{\\circ}`

addAnswers(
    sinusoidalQuestion14,
    [`${(sinusoidalQuestion14.chosenAngle / 180).toFixed(2)}\\pi`, `${sinusoidalQuestion14.chosenAngle}\\pi`, `${(sinusoidalQuestion14.chosenAngle / 360).toFixed(2)}\\pi`, `${sinusoidalQuestion14.chosenAngle * 180}\\pi`],
    [true, false, false, false]
)

sinusoidalQuestion14.details.solutionSteps = [
    {type: "text", content: "To convert an angle from degrees to radians we take the angle and multiply by"},
    {type: "math", content: "\\frac{\\pi}{180}"},
    {type: "text", content: "Therefore, "},
    {type: "math", content: `${sinusoidalQuestion14.expression} \\times \\frac{\\pi}{180} = ${(sinusoidalQuestion14.chosenAngle / 180).toFixed(2)}\\pi \\hspace{20px} \\text{(when rounded to two decimal places)}`}
]

let sinusoidalQuestion15 = new sinusoidalQuestion (
    'Convert the following angle from radians to degrees',
    MULTIPLE_CHOICE,
    {
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of radian measure'
    }
)

sinusoidalQuestion15.chosenAngle = Math.ceil(Math.random() * 20) / 10
sinusoidalQuestion15.expression = `${sinusoidalQuestion15.chosenAngle}\\pi`

addAnswers(
    sinusoidalQuestion15,
    [`${parseInt(sinusoidalQuestion15.chosenAngle * 180)}^{\\circ}`, `${parseInt(sinusoidalQuestion15.chosenAngle * 360)}^{\\circ}`, `${parseInt(sinusoidalQuestion15.chosenAngle * 90)}^{\\circ}`, `${parseInt(sinusoidalQuestion15.chosenAngle * 2)}^{\\circ}`],
    [true, false, false, false]
)

sinusoidalQuestion15.details.solutionSteps = [
    {type: "text", content: "To convert an angle from radians to degrees we take the angle and multiply by"},
    {type: "math", content: "\\frac{180}{\\pi}"},
    {type: "text", content: "Therefore, "},
    {type: "math", content: `${sinusoidalQuestion15.expression} \\times \\frac{180}{\\pi} = ${parseInt(sinusoidalQuestion15.chosenAngle * 180)}^{\\circ}`}
]

let sinusoidalQuestion16 = new sinusoidalWordProblem (
    `A Ferris wheel...Write a ... function to model this situation`,
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_EXPRESSION,
        img: true,
        imgSrc: '/img/ferris-wheel.jpg',
        imgDetails: [],
        parseExpression: function(expression) {
            return simplify(expression).toTex().replace("~", "").replace('\\cdot', '').trim()
        },
        strand: 'Sinusoidal Functions',
        course: MHF4U,
        questionInfo: 'solve real-world problems modelled by sinusoidal functions',
        label: "h(t)=",
        hints: ["Write your function as asin(kt)+c (if the question asks for sin) or acos(kt)+c (if the question asks for cos)", "Use only decimal numbers for your values of a and c", "Type 'pi' instead of the symbol", "Write k as a fraction and do not put 'pi' in the numerator"]
    }
)

sinusoidalQuestion16.generateSinusoidalWordProblemExpression()
sinusoidalQuestion16.question = `
    A Ferris wheel ride ${[
        `reaches a maximum height of ${sinusoidalQuestion16.max} m and a minimum height of ${sinusoidalQuestion16.min} m.`, 
        `has a centre that is ${sinusoidalQuestion16.eoa} m above the ground and reaches a maximum height of ${sinusoidalQuestion16.max} m. `,
        `has a centre that is ${sinusoidalQuestion16.eoa} m above the ground and reaches a minimum height of ${sinusoidalQuestion16.min} m.`    
    ][Math.floor(Math.random() * 3)]}
    A person starts the ride at the ${sinusoidalQuestion16.start} and goes ${sinusoidalQuestion16.direction}. 
    It takes the rider 
    ${[`${sinusoidalQuestion16.period} min to go around the Ferris wheel once`, `${sinusoidalQuestion16.period / 2} min to go from the bottom to the top.`][Math.floor(Math.random() * 2)]}. 
    Write a ${sinusoidalQuestion16.ratio} function, h(t), to model the rider's height (h), in m, over time (t), in min.
    `

addAnswers(
    sinusoidalQuestion16,
    sinusoidalQuestion16.expression,
    [],
)

sinusoidalQuestion16.details.solutionSteps = [
    {type: "text", content: "|a| is the amplitude, which can be found by finding half of the difference between the maximum or minimum"},
    {type: "math", content: `|a|=\\frac{${sinusoidalQuestion16.max} - ${sinusoidalQuestion16.min}}{2}=${Math.abs(sinusoidalQuestion16.a)}`},
    {type: "text", content: "Alternatively, |a| can also be the distance between the maximum or minimum and the centre"},
    {type: "math", content: `|a|=|${sinusoidalQuestion16.max}-${sinusoidalQuestion16.eoa}| \\times 2 = |${sinusoidalQuestion16.min} - ${sinusoidalQuestion16.eoa}| \\times 2 = ${Math.abs(sinusoidalQuestion16.a)}`},
    {type: "text", content: `${sinusoidalQuestion16.a < 0 ? `If a sin function starts in the middle and goes down or if a cos function starts at the bottom and goes up then the value of a should be negative` : "`If a sin function starts in the middle and goes up or if a cos function starts at the top and goes down then the value of a should be positive"}`},
    {type: "math", content: `a=${sinusoidalQuestion16.a}`},
    {type: "text", content: `The equation of the axis, c, is the centre of the Ferris wheel, or the sum of the maximum or minimum, divided by 2`},
    {type: "math", content: `c=\\frac{${sinusoidalQuestion16.max}+${sinusoidalQuestion16.min}}{2}=${sinusoidalQuestion16.eoa}`},
    {type: "text", content: "The value of k is equal to"},
    {type: "math", content: `\\frac{2 \\pi }{\\text{period}}=\\frac{2 \\pi}{${sinusoidalQuestion16.period}}=${simplify(`2 / ${sinusoidalQuestion16.period}`).toTex()} `},
    {type: "text", content: "where the period is the time it takes for the Ferris wheel to make one full rotation, or two times the time it takes to go between the minimum and maximum."},
    {type: "text", content: "Therefore, the equation of the function is"},
    {type: "math", content: `${sinusoidalQuestion16.a} \\${sinusoidalQuestion16.ratio}(${simplify(`2 / ${sinusoidalQuestion16.period}`).toTex()} \\pi t)+${sinusoidalQuestion16.c}`}
]


// Q24
let logarithmQuestion1 = new logarithmQuestion (
    'Solve for x',
    MULTIPLE_CHOICE,
    {
        strand: 'Exponential and Logarithmic Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equations of logarithms',
    }
)


logarithmQuestion1.generateExpression()

addAnswers(
    logarithmQuestion1,
    [`x=${simplify(logarithmQuestion1.exp).toTex()}`, `x=${simplify(logarithmQuestion1.exp * logarithmQuestion1.base).toTex()}`, `x=${simplify(logarithmQuestion1.base * pow(logarithmQuestion1.base, logarithmQuestion1.exp)).toTex()}`, logarithmQuestion1.exp === 2 ? `x=${simplify("1 + 0").toTex()}` : `x=${simplify(pow(logarithmQuestion1.base, logarithmQuestion1.exp - 1)).toTex()}`],
    [true, false, false, false]
)

logarithmQuestion1.details.solutionSteps = [
    {type: "text", content: "Rearranging to exponential form, we get"},
    {type: "math", content: `${logarithmQuestion1.base}^{x}=${pow(logarithmQuestion1.base, logarithmQuestion1.exp)}`},
    {type: "text", content: `This means we need to solve for the exponent x for a power with a base of ${logarithmQuestion1.base} that simplifies to ${pow(logarithmQuestion1.base, logarithmQuestion1.exp).toString()}`},
    {type: "text", content: `So x=${logarithmQuestion1.exp}`}
]

let logarithmQuestion2 = new logarithmQuestion (
    'What is the following in exponential form?',
    MULTIPLE_CHOICE,
    {
        strand: 'Exponential and Logarithmic Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equations of logarithms'
    }
)

logarithmQuestion2.generateExpression()

addAnswers(
    logarithmQuestion2,
    [`${logarithmQuestion2.base}^{x}=${pow(logarithmQuestion2.base, logarithmQuestion2.exp)}`, `${logarithmQuestion2.exp}^{x}=${pow(logarithmQuestion2.base, logarithmQuestion2.exp)}`, `${pow(logarithmQuestion2.base, logarithmQuestion2.exp)}^{x}=${logarithmQuestion2.exp}`, `${logarithmQuestion2.base}=x^{${pow(logarithmQuestion2.base, logarithmQuestion2.exp)}}`],
    [true, false, false, false]
)

logarithmQuestion2.details.solutionSteps = [
    {type: "text", content: "To convert to exponential form, x is the exponent, the small number in the logarithm is the base, and the large number in the logarithm is the simplified power."},
    {type: "text", content: "Rearranging to exponential form, we get"},
    {type: "math", content: `${logarithmQuestion2.base}^{x}=${pow(logarithmQuestion2.base, logarithmQuestion2.exp)}`},
]

let logarithmQuestion3 = new logarithmQuestion (
    'Solve for x',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_EXPRESSION,
        parseExpression: function(expression) {
            return simplify(expression).toTex().replace("~", "").replace('\\cdot', '').trim()
        },
        label: "x=",
        strand: 'Exponential and Logarithmic Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equations of logarithms',
        hints: ["Write your answer as a fraction using '/' if your answer is a recurring decimal number."]
    }
)

logarithmQuestion3.generateExponentialEquation()

addAnswers(
    logarithmQuestion3,
    logarithmQuestion3.shortAnswerSolution,
    []
)

logarithmQuestion3.details.solutionSteps = [
    {type: "text", content: `We see that the ${logarithmQuestion3.sideToSimplify} side of the equation can be rewritten as a power with the same base as the ${logarithmQuestion3.sideToSimplify === "left" ? "right" : "left"} side.`},
    {type: "math", content: `${
                                logarithmQuestion3.sideToSimplify === "left" 
                                ? 
                                    logarithmQuestion3.sideWithExp === "left"
                                    ?
                                    `${logarithmQuestion3.a}^{${simplify(`${logarithmQuestion3.k} * ${logarithmQuestion3.negative}`).toTex().replace("\\cdot", "")}(${logarithmQuestion3.exp})}=${logarithmQuestion3.a}^{x}`
                                    :
                                    `${logarithmQuestion3.a}^{${simplify(`${logarithmQuestion3.k} * ${logarithmQuestion3.negative}x`).toTex().replace("\\cdot", "")}}=${logarithmQuestion3.a}^{${logarithmQuestion3.exp}}`
                                :
                                    logarithmQuestion3.sideWithExp === "right"
                                    ?
                                    `${logarithmQuestion3.a}^{x}=${logarithmQuestion3.a}^{${simplify(`${logarithmQuestion3.k} * ${logarithmQuestion3.negative}`).toTex().replace("\\cdot", "")}(${logarithmQuestion3.exp})}`
                                    :
                                    `${logarithmQuestion3.a}^{${logarithmQuestion3.exp}}=${logarithmQuestion3.a}^{${simplify(`${logarithmQuestion3.k} * ${logarithmQuestion3.negative}x`).toTex().replace("\\cdot", "")}}`
                            }`},
    {type: "text", content: "Once we've rewritten the equation so that the bases are the same, we can solve for x by equating the exponents"},
    {type: "math", content: `${
        logarithmQuestion3.sideToSimplify === "left" 
        ? 
            logarithmQuestion3.sideWithExp === "left"
            ?
            `${simplify(`${logarithmQuestion3.k} * ${logarithmQuestion3.negative} * (${logarithmQuestion3.exp})`).toTex().replace("\\cdot", "")}=x`
            :
            `${simplify(`${logarithmQuestion3.k} * ${logarithmQuestion3.negative}x`).toTex().replace("\\cdot", "")}=${logarithmQuestion3.exp}`
        :
            logarithmQuestion3.sideWithExp === "right"
            ?
            `x=${simplify(`${logarithmQuestion3.k} * ${logarithmQuestion3.negative} * (${logarithmQuestion3.exp})`).toTex().replace("\\cdot", "")}`
            :
            `${logarithmQuestion3.exp}=${simplify(`${logarithmQuestion3.k} * ${logarithmQuestion3.negative}x`).toTex().replace("\\cdot", "")}`
                            }`},
    {type: "math", content: `x=${simplify(logarithmQuestion3.shortAnswerSolution).toTex()}`}
]

let logarithmQuestion4 = new logarithmQuestion (
    'Solve for x. Leave your answer exact',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_EXPRESSION,
        parseExpression: function(expression) {
            return rationalize(expression).toTex().replace("~", "").replace('\\cdot', '').trim()
        },
        label: "x=",
        strand: 'Exponential and Logarithmic Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of equations of logarithms',
        hints: ["Write your answer as a fraction using '/'", "If the numerator or denominator contains more than one term, use brackets '()'", "If a log is multiplied by 1, you need to write '1' in front of the logarithm"]
    }
)

logarithmQuestion4.generateExponentialEquation2();

addAnswers(
    logarithmQuestion4,
    logarithmQuestion4.shortAnswerSolution,
    []
)

logarithmQuestion4.details.solutionSteps = [
    {type: "text", content: "Since we cannot rewrite the base of one side to a power with the same base as the other side, we need to get the logarithm of both sides"},
    {type: "math", content: `\\log${logarithmQuestion4.a}^{x}=\\log${logarithmQuestion4.k}^{${simplify(`x+${logarithmQuestion4.d}`)}}`},
    {type: "text", content: "Next we can use the power rule to bring the exponents to the front of the logarithms"},
    {type: "math", content: `x\\log${logarithmQuestion4.a}=(${simplify(`x+${logarithmQuestion4.d}`).toTex()})\\log ${logarithmQuestion4.k}`},
    {type: "text", content: "Expanding the right side of the equation, we get"},
    {type: "math", content: `x\\log${logarithmQuestion4.a}=x\\log${logarithmQuestion4.k}${Math.abs(logarithmQuestion1.d) === 1 ? logarithmQuestion1.d === 1 ? "" : `-` : logarithmQuestion4.d > 0 ? `+${logarithmQuestion4.d}` : `${logarithmQuestion4.d}`}\\log ${logarithmQuestion4.k}`},
    {type: "text", content: "Next we need to isolate x"},
    {type: "math", content: `x\\log${logarithmQuestion4.a}-x\\log${logarithmQuestion4.k}=${Math.abs(logarithmQuestion1.d) === 1 ? logarithmQuestion1.d === 1 ? "" : `-` : logarithmQuestion4.d > 0 ? `+${logarithmQuestion4.d}` : `${logarithmQuestion4.d}`}\\log ${logarithmQuestion4.k}`},
    {type: "math", content: `x(\\log${logarithmQuestion4.a}-\\log${logarithmQuestion4.k})=${Math.abs(logarithmQuestion1.d) === 1 ? logarithmQuestion1.d === 1 ? "" : `-` : logarithmQuestion4.d > 0 ? `+${logarithmQuestion4.d}` : `${logarithmQuestion4.d}`}\\log ${logarithmQuestion4.k}`},
    {type: "math", content: `x=\\frac{${Math.abs(logarithmQuestion1.d) === 1 ? logarithmQuestion1.d === 1 ? "" : `-` : logarithmQuestion4.d > 0 ? `+${logarithmQuestion4.d}` : `${logarithmQuestion4.d}`}\\log ${logarithmQuestion4.k}}{\\log${logarithmQuestion4.a}-\\log${logarithmQuestion4.k}}`}
]

let logarithmQuestion5 = new logarithmQuestion (
    'Solve for x. Ignore extraneous roots',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_SETS,
        parseExpression: function(expression) {
            return rationalize(expression).toTex().replace("~", "").replace('\\cdot', '').trim()
        },
        label: "x=",
        strand: 'Exponential and Logarithmic Functions',
        course: MHF4U,
        questionInfo: 'solve logarithmic equations',
        hints: ["If all the solutions are extraneous roots, type 'none' as your answer", "Round answers to two decimal places"]
    }
)

logarithmQuestion5.generateLogarithmicEquation({type: "add"})

addAnswers(
    logarithmQuestion5,
    logarithmQuestion5.shortAnswerSolution.filter(item => !isNaN(item)).length === 0 ? "none" : logarithmQuestion5.shortAnswerSolution.filter(item => !isNaN(item)),
    []
)

logarithmQuestion5.details.solutionSteps = [
    {type: "text", content: (logarithmQuestion5.moveLog === true || logarithmQuestion5.addBothSides === true) ? `We first need to isolate the logarithm expressions` : ""},
    {type: "text", content: logarithmQuestion5.addBothSides === true ? logarithmQuestion5.d > 0 ? `We need to subtract both sides by ${Math.abs(logarithmQuestion5.d)}` : `We need to add both sides by ${Math.abs(logarithmQuestion5.d)}` : ""},
    {type: "math", content: logarithmQuestion5.addBothSides === true ? logarithmQuestion5.moveLog === true ? `\\log_{${logarithmQuestion5.base}}{(${simplify(`${logarithmQuestion5.coeff}x+${logarithmQuestion5.a}`).toTex()})} = ${logarithmQuestion5.exp} - \\log_{${logarithmQuestion5.base}}{(${simplify(`x+${logarithmQuestion5.k}`).toTex()})}` : `\\log_{${logarithmQuestion5.base}}{(${simplify(`${logarithmQuestion5.coeff}x+${logarithmQuestion5.a}`).toTex()})} + \\log_{${logarithmQuestion5.base}}{(${simplify(`x+${logarithmQuestion5.k}`).toTex()})} = ${logarithmQuestion5.exp}` : "\\text{}"},
    {type: "text", content: logarithmQuestion5.moveLog === true ? `We need to add both sides by ` : ""},
    {type: "math", content: logarithmQuestion5.moveLog === true ? `\\log_{${logarithmQuestion5.base}}{(${simplify(`x+${logarithmQuestion5.k}`).toTex()})}` : "\\text{}"},
    // {type: "math", content: `\\log_{${logarithmQuestion5.base}}{(${simplify(`(${logarithmQuestion5.coeff}x)+${logarithmQuestion5.a}`).toTex().replace("\\cdot", "")})} + \\log_{${logarithmQuestion5.base}}{(${simplify(`x+${logarithmQuestion5.k}`).toTex()})} = ${logarithmQuestion5.exp}`},
    {type: "text", content: "Once the logarithms are isolated, we can apply the product law of logarithms and multiply the powers"},
    {type: "math", content: `\\log_{${logarithmQuestion5.base}}{(${rationalize(`(${logarithmQuestion5.coeff}x+${logarithmQuestion5.a})(x+${logarithmQuestion5.k})`).toTex().replace(/\\cdot/g, "")})} = ${logarithmQuestion5.exp}`},
    {type: "text", content: "Next, we need to convert the logarithmic equation to exponential form"},
    {type: "math", content: `${rationalize(`((${logarithmQuestion5.coeff}x)+${logarithmQuestion5.a})(x+${logarithmQuestion5.k})`).toTex().replace(/\\cdot/g, "")}=${pow(logarithmQuestion5.base, logarithmQuestion5.exp)}`},
    {type: "text", content: `Then we can rewrite the equation so that one side is equal to zero`},
    {type: "math", content: `${rationalize(`((${logarithmQuestion5.coeff}x)+${logarithmQuestion5.a})(x+${logarithmQuestion5.k}) - ${logarithmQuestion5.base}^${logarithmQuestion5.exp}`).toTex().replace(/\\cdot/g, "")}=0`},
    {type: "text", content: "We can now use the quadratic formula to solve for x"},
    {type: "math", content: `x=\\frac{-(${logarithmQuestion5.a + (logarithmQuestion5.coeff * logarithmQuestion5.k)}) \\pm \\sqrt{(${logarithmQuestion5.a + (logarithmQuestion5.coeff * logarithmQuestion5.k)})^{2}-4(${logarithmQuestion5.coeff})(${logarithmQuestion5.a * logarithmQuestion5.k - pow(logarithmQuestion5.base, logarithmQuestion5.exp)})}}{2(${logarithmQuestion5.coeff})} \\approx ${logarithmQuestion5.solution1}, ${logarithmQuestion5.solution2}`},
    {type: "text", content: "Lastly, we should check for extraneous roots"},
    {type: "math", content: `${logarithmQuestion5.coeff !== 1 ? logarithmQuestion5.coeff : ""}(${logarithmQuestion5.solution1})${logarithmQuestion5.a < 0 ? logarithmQuestion5.coeff : `+${logarithmQuestion5.coeff}`} ${(logarithmQuestion5.coeff * logarithmQuestion5.solution1) + logarithmQuestion5.a > 0 ? `> 0` : ` <= 0` } \\hspace{20px}  (${logarithmQuestion5.solution1})${logarithmQuestion5.k < 0 ? logarithmQuestion5.k : `+${logarithmQuestion5.k}`} ${logarithmQuestion5.solution1 + logarithmQuestion5.k > 0 ? `> 0` : ` < 0` }`},
    {type: "math", content: `${logarithmQuestion5.coeff !== 1 ? logarithmQuestion5.coeff : ""}(${logarithmQuestion5.solution2})+${logarithmQuestion5.a < 0 ? logarithmQuestion5.coeff : `+${logarithmQuestion5.coeff}`} ${(logarithmQuestion5.coeff * logarithmQuestion5.solution2) + logarithmQuestion5.a > 0 ? `> 0` : ` <= 0` } \\hspace{20px}  (${logarithmQuestion5.solution2})+${logarithmQuestion5.k < 0 ? logarithmQuestion5.k : `+${logarithmQuestion5.k}`} ${logarithmQuestion5.solution2 + logarithmQuestion5.k > 0 ? `> 0` : ` < 0` }`},
    {type: "text", content: `${logarithmQuestion5.shortAnswerSolution.length > 0 ? `Therefore, the solution(s) is/are x=${logarithmQuestion5.shortAnswerSolution}` : "The solutions resolve to a negative power for at least one of the logarithmic expressions, so there are no solutions"}` },
    {type: "text", content: `${logarithmQuestion5.extraneousRoots.length > 0 ? `The extraneous root(s) is/are x=${logarithmQuestion5.extraneousRoots}` : "All the questions lead to powers greater than 0 in the logarithmic expressions, so there are no  extraneous roots."}`}
]

let logarithmQuestion6 = new logarithmQuestion (
    'Solve for x. Ignore extraneous roots',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_SETS,
        parseExpression: function(expression) {
            return rationalize(expression).toTex().replace("~", "").replace('\\cdot', '').trim()
        },
        label: "x=",
        strand: 'Exponential and Logarithmic Functions',
        course: MHF4U,
        questionInfo: 'solve logarithmic equations',
        hints: ["If all the solutions are extraneous roots, type 'none' as your answer", "Round answers to two decimal places"]
    }
)

logarithmQuestion6.generateLogarithmicEquation({type: "minus"})

addAnswers(
    logarithmQuestion6,
    logarithmQuestion6.shortAnswerSolution.filter(item => !isNaN(item)).length === 0 ? ["none"] : logarithmQuestion6.shortAnswerSolution.filter(item => !isNaN(item)),
    []
)

logarithmQuestion6.details.solutionSteps = [
    {type: "text", content: (logarithmQuestion6.moveLog === true || logarithmQuestion6.addBothSides === true) ? `We first need to isolate the logarithm expressions` : ""},
    {type: "text", content: logarithmQuestion6.addBothSides === true ? logarithmQuestion6.d > 0 ? `We need to subtract both sides by ${Math.abs(logarithmQuestion6.d)}` : `We need to add both sides by ${Math.abs(logarithmQuestion6.d)}` : ""},
    {type: "math", content: logarithmQuestion6.addBothSides === true ? logarithmQuestion6.moveLog === true ? `\\log_{${logarithmQuestion6.base}}{(${simplify(`${logarithmQuestion6.coeff}x+${logarithmQuestion6.a}`).toTex()})} = ${logarithmQuestion6.exp} - \\log_{${logarithmQuestion6.base}}{(${simplify(`x+${logarithmQuestion6.k}`).toTex()})}` : `\\log_{${logarithmQuestion6.base}}{(${simplify(`${logarithmQuestion6.coeff}x+${logarithmQuestion6.a}`).toTex()})} - \\log_{${logarithmQuestion6.base}}{(${simplify(`x+${logarithmQuestion6.k}`).toTex()})} = ${logarithmQuestion6.exp}` : "\\text{}"},
    {type: "text", content: logarithmQuestion6.moveLog === true ? `We need to add both sides by ` : ""},
    {type: "math", content: logarithmQuestion6.moveLog === true ? `\\log_{${logarithmQuestion6.base}}{(${simplify(`x+${logarithmQuestion6.k}`).toTex()})}` : "\\text{}"},
    // {type: "math", content: `\\log_{${logarithmQuestion6.base}}{(${simplify(`(${logarithmQuestion6.coeff}x)+${logarithmQuestion6.a}`).toTex().replace("\\cdot", "")})} - \\log_{${logarithmQuestion6.base}}{(${simplify(`x+${logarithmQuestion6.k}`).toTex()})} = ${logarithmQuestion6.exp}`},
    {type: "text", content: "Once the logarithms are isolated, we can apply the quotient law of logarithms and divide the powers"},
    {type: "math", content: `\\log_{${logarithmQuestion6.base}}{(\\frac{${simplify(`(${logarithmQuestion6.coeff}x)+${logarithmQuestion6.a}`).toTex().replace("\\cdot", "")}}{${simplify(`x+${logarithmQuestion6.k}`).toTex()}})}=${logarithmQuestion6.exp}`},
    {type: "text", content: "Next, we need to convert the logarithmic equation to exponential form"},
    {type: "math", content: `\\frac{${simplify(`(${logarithmQuestion6.coeff}x)+${logarithmQuestion6.a}`).toTex().replace("\\cdot", "")}}{${simplify(`x+${logarithmQuestion6.k}`).toTex()}}=${logarithmQuestion6.base}^${logarithmQuestion6.exp}`},
    {type: "text", content: "We can now algebraically solve for x"},
    {type: "math", content: `${simplify(`(${logarithmQuestion6.coeff}x)+${logarithmQuestion6.a}`).toTex().replace("\\cdot", "")}= ${rationalize(`(${logarithmQuestion6.base}^${logarithmQuestion6.exp}x)+ (${logarithmQuestion6.base}^${logarithmQuestion6.exp}) * ${logarithmQuestion6.k}`).toTex().replace('\\cdot', "")}`},
    {type: "math", content: `${logarithmQuestion6.coeff - pow(logarithmQuestion6.base, logarithmQuestion6.exp)}x = ${(pow(logarithmQuestion6.base, logarithmQuestion6.exp) * logarithmQuestion6.k) - logarithmQuestion6.a}`},
    {type: "math", content: `x \\approx ${logarithmQuestion6.solution1}`},
    {type: "text", content: "Lastly, we need to check for extraneous roots"},
    {type: "math", content: `${logarithmQuestion6.coeff !== 1 ? logarithmQuestion6.coeff : ""}(${logarithmQuestion6.solution1})${logarithmQuestion6.a < 0 ? logarithmQuestion6.a : `+${logarithmQuestion6.a}`} ${(logarithmQuestion6.coeff * logarithmQuestion6.solution1 + logarithmQuestion6.a) > 0 ? `> 0` : `<= 0`} `},
    {type: "math", content: `(${logarithmQuestion6.solution1})${logarithmQuestion6.k < 0 ? logarithmQuestion6.k : `+${logarithmQuestion6.k}`} ${logarithmQuestion6.solution1 + logarithmQuestion6.k > 0 ? `> 0` : `<= 0`} `},
    {type: "text", content: `${logarithmQuestion6.shortAnswerSolution.length !== 0 ? `Therefore, x=${logarithmQuestion6.solution1}` : `Therefore, ${logarithmQuestion6.solution1} is an extraneous root.`}`}
]

let logarithmQuestion7 = new logarithmQuestion (
    'Solve for x',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_SETS,
        parseExpression: function(expression) {
            return rationalize(expression).toTex().replace("~", "").replace('\\cdot', '').trim()
        },
        label: "x=",
        strand: 'Exponential and Logarithmic Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of exponential equations',
        hints: ["Round answers to two decimal places if necessary. Sepeate each answer with a comma"]
    }
)

logarithmQuestion7.generateExponentialEquation3()

addAnswers (
    logarithmQuestion7,
    logarithmQuestion7.shortAnswerSolution,
    []
)

logarithmQuestion7.details.solutionSteps = [
    {type: "text", content: `${logarithmQuestion7.addBothSides === true ? `We need to first isolate all the terms by subtracting both sides by ${logarithmQuestion7.c}` : ""}`},
    {type: "math", content: `${logarithmQuestion7.addBothSides === true ? `${rationalize(`(x-${pow(logarithmQuestion7.base, logarithmQuestion7.exp)})(x${logarithmQuestion7.operator === "add" ? `+` : `-`}${pow(logarithmQuestion7.base, logarithmQuestion7.d)})`).toTex().replace("\\cdot", "").replace(/\x/g, `(${logarithmQuestion7.base}^{x})`)}=0` : "\\text{}"}`},
    {type: "text", content: `We can factor the left side. We need to find two numbers that add to ${logarithmQuestion7.operator === "minus" ? (pow(logarithmQuestion7.base, logarithmQuestion7.exp) + pow(logarithmQuestion7.base, logarithmQuestion7.d)) * -1 : pow(logarithmQuestion7.base, logarithmQuestion7.d) - pow(logarithmQuestion7.base, logarithmQuestion7.exp)} and multiply to
        ${logarithmQuestion7.operator === "minus" ? pow(logarithmQuestion7.base, logarithmQuestion7.exp) * pow(logarithmQuestion7.base, logarithmQuestion7.d) : `-${pow(logarithmQuestion7.base, logarithmQuestion7.exp) * pow(logarithmQuestion7.base, logarithmQuestion7.d)}`}
        `},
    {type: "text", content: `These numbers are -${pow(logarithmQuestion7.base, logarithmQuestion7.exp)} and ${logarithmQuestion7.operator === "add" ? pow(logarithmQuestion7.base, logarithmQuestion7.d) : -1 * (pow(logarithmQuestion7.base, logarithmQuestion7.d))}. So when we factor the left side, we get`},
    {type: "math", content: `(
        ${logarithmQuestion7.base}^{x} - ${pow(logarithmQuestion7.base, logarithmQuestion7.exp)})(${logarithmQuestion7.base}^{x} ${logarithmQuestion7.operator === "add" ? "+" : "-"} ${pow(logarithmQuestion7.base, logarithmQuestion7.d)}) `},
    {type: "text", content: "Isolating the powers for each factor, we get"},
    {type: "math", content: `${logarithmQuestion7.base}^{x}=${pow(logarithmQuestion7.base, logarithmQuestion7.exp)} \\hspace{20px} ${logarithmQuestion7.base}^{x}= ${logarithmQuestion7.operator === "add" ? `-${pow(logarithmQuestion7.base, logarithmQuestion7.d)}` : pow(logarithmQuestion7.base, logarithmQuestion7.d) }
        `},
    {type: "text", content: logarithmQuestion7.operator === "add" ? `The equation on the right has no solution because there is no exponent with a positive base that will result in a negative power` : "" },
    {type: "text", content: "We can now convert to logarithmic form and solve"},
    {type: "math", content: `x=\\log_{${logarithmQuestion7.base}}{${pow(logarithmQuestion7.base, logarithmQuestion7.exp)}}=${logarithmQuestion7.exp} \\hspace{20px} ${logarithmQuestion7.operator === "add" ? "\\hspace{0px}" : `x=\\log_{${logarithmQuestion7.base}}{${pow(logarithmQuestion7.base, logarithmQuestion7.d)}}=${logarithmQuestion7.d}`}`},
    {type: "text", content: `${logarithmQuestion7.operator === "add" || (logarithmQuestion7.exp === logarithmQuestion7.d) ? `Therefore the solution to the equation is x=${logarithmQuestion7.exp}` : `Therefore the solutions to the equation are x=${logarithmQuestion7.exp}, ${logarithmQuestion7.d} `}`}
]

let logarithmQuestion8 = new logarithmQuestion (
    ``,
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_EXPRESSION,
        parseExpression: function(expression) {
            return rationalize(expression).toTex().replace("~", "").replace('\\cdot', '').trim()
        },
        label: "t=",
        strand: 'Exponential and Logarithmic Functions',
        course: MHF4U,
        questionInfo: 'solve for the exponent in an exponential function word problem',
        hints: ["Write your answer as a decimal number and round to two decimal places"]
    }
)

logarithmQuestion8.generateCompoundInterestQuestion()
logarithmQuestion8.question = `
    A person invests $${logarithmQuestion8.a} in an investment that pays ${logarithmQuestion8.d}% interest, compounded ${logarithmQuestion8.c}. Solve for t where t is the number of years it will take for the investment to reach $${logarithmQuestion8.k}.
`

addAnswers(
    logarithmQuestion8,
    logarithmQuestion8.shortAnswerSolution,
    []
)

logarithmQuestion8.details.solutionSteps = [
    {type: "text", content: "First, we should write the function to model this situation. The function can be written as"},
    {type: "math", content: "A(t)=P(1+\\frac{i}{n})^{nt}"},
    {type: "text", content: "Where P is the principal, i is the interest rate, n is the number of compounding periods per year, and A(t) is the future value in t years"},
    {type: "math", content: `${logarithmQuestion8.k}=${logarithmQuestion8.a}(1+\\frac{${(logarithmQuestion8.d * 0.01).toFixed(3)}}{${logarithmQuestion8.exp}})^{${logarithmQuestion8.exp}t}`},
    {type: "text", content: `First we need to isolate the power. We can divide both sides by ${logarithmQuestion8.a}`},
    {type: "math", content: `${simplify(`${logarithmQuestion8.k} / ${logarithmQuestion8.a}`).toTex()}=(${(1+(logarithmQuestion8.d * 0.01 / logarithmQuestion8.exp)).toFixed(3)})^{${logarithmQuestion8.exp}t}`},
    {type: "text", content: "Lastly we can rewrite the equation to logarithmic form and solve for t"},
    {type: "math", content: `${logarithmQuestion8.exp}t=\\log_{${(1+(logarithmQuestion8.d * 0.01 / logarithmQuestion8.exp)).toFixed(3)}}{(    ${simplify(`${logarithmQuestion8.k} / ${logarithmQuestion8.a}`).toTex()}
    )}`},
    {type: "math", content: `t=\\frac{\\log_{${(1+(logarithmQuestion8.d * 0.01 / logarithmQuestion8.exp)).toFixed(3)}}{(    ${simplify(`${logarithmQuestion8.k} / ${logarithmQuestion8.a}`).toTex()}
    )}}{${logarithmQuestion8.exp}} \\approx ${logarithmQuestion8.shortAnswerSolution}`}
]

let logarithmQuestion9 = new logarithmQuestion(
    'Simplify the logarithm',
    MULTIPLE_CHOICE,
    {
        strand: 'Exponential and Logarithmic Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of the laws of logarithms'
    }
)

logarithmQuestion9.generatePowerLawExpression()

addAnswers(
    logarithmQuestion9,
    [
        `${logarithmQuestion9.exp}x`, 
        `\\frac{${logarithmQuestion9.exp}}{x}`, 
        `x^{${logarithmQuestion9.exp}}`, 
        `\\frac{x}{${logarithmQuestion9.exp}}`
    ],
    [
        logarithmQuestion9.a === "exp" ? true : false, 
        logarithmQuestion9.a === "root" ? true : false, 
        false, 
        false
    ]
)

logarithmQuestion9.details.solutionSteps = [
    {type: "text", content: "Recall the power law of logarithms"},
    {type: "math", content: "\\log_{b}{P^{x}} = x\\log_{b}{P}"},
    {type: "text", content: `${logarithmQuestion9.a === "root" ? `The xth root of an expression is the same as raising it to the power of 1/x` : `The exponent in this case is x`}`},
    {type: "text", content: "So the simplified expression is equal to "},
    {type: "math", content: `${logarithmQuestion9.a === "exp" ? `x \\times \\log_{${logarithmQuestion9.base}}{${pow(logarithmQuestion9.base, logarithmQuestion9.exp)}}=${logarithmQuestion9.exp}x` : 
        `\\frac{1}{x} \\times \\log_{${logarithmQuestion9.base}}{${pow(logarithmQuestion9.base, logarithmQuestion9.exp)}}=\\frac{${logarithmQuestion9.exp}}{x}`
    }`},
]

let logarithmQuestion10 = new logarithmQuestion (
    'What is the equation of this transformed function?',
    MULTIPLE_CHOICE,
    {
        parseExpression: function(expression) {
            return simplify(expression.trim()).toTex().replace("~", "").replace('\\cdot', '').trim().replace("+-", "-").replace("-(", "(").replace("x)", "x")
        },
        strand: 'Rational Functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of the reciprocal of linear functions',
        label: 'f(x)=',
        hints: ['The base of the logarithmic function is 10', 'Write your function as alog(k(x-d))+c']
    }  
)

logarithmQuestion10.generateGraphFunction()

addAnswers(
    logarithmQuestion10,
    [
        `f(x)=${logarithmQuestion10.a === -1 ? "-" : logarithmQuestion10.a}\\log(x${logarithmQuestion10.d > 0 ? `-${logarithmQuestion10.d}` : logarithmQuestion10.d === 0 ? "" : `+${Math.abs(logarithmQuestion10.d)}`})`, 
        `f(x)=${logarithmQuestion10.a === -1 ? "-" : logarithmQuestion10.a}\\log(x)${logarithmQuestion10.c > 0 ? `+${logarithmQuestion10.c}` : `${logarithmQuestion10.c}`}`, 
        `f(x)=\\log(${logarithmQuestion10.k === -1 ? "-" : logarithmQuestion10.k}(x${logarithmQuestion10.d > 0 ? `-${logarithmQuestion10.d}` : logarithmQuestion10.d === 0 ? "" : `+${Math.abs(logarithmQuestion10.d)}`}))`, 
        `f(x)=\\log(${logarithmQuestion10.k === -1 ? "-" : logarithmQuestion10.k}x)${logarithmQuestion10.c > 0 ? `+${logarithmQuestion10.c}` : `${logarithmQuestion10.c}`}`,
        `f(x)=${logarithmQuestion10.a === -1 ? "-" : logarithmQuestion10.a}\\log(x${logarithmQuestion10.d > 0 ? `+${logarithmQuestion10.d}` : logarithmQuestion10.d === 0 ? "" : `-${Math.abs(logarithmQuestion10.d)}`})`,
        `f(x)=${logarithmQuestion10.a === -1 ? "-" : logarithmQuestion10.a}\\log(x)${logarithmQuestion10.c > 0 ? `-${logarithmQuestion10.c}` : `+${Math.abs(logarithmQuestion10.c)}`}`,
        `f(x)=${logarithmQuestion10.a === "\\frac{1}{2}" ? 2 : "\\frac{1}{2}"}\\log(x${logarithmQuestion10.d > 0 ? `-${logarithmQuestion10.d}` : logarithmQuestion10.d === 0 ? "" : `+${Math.abs(logarithmQuestion10.d)}`})`,
        `f(x)=\\log(${logarithmQuestion10.k === "\\frac{1}{2}" ? 2 : "\\frac{1}{2}"}x)${logarithmQuestion10.c > 0 ? `+${logarithmQuestion10.c}` : `${logarithmQuestion10.c}`}`, 
    ],
    [
        logarithmQuestion10.solution1 === 0 ? true : false,
        logarithmQuestion10.solution1 === 1 ? true : false,
        logarithmQuestion10.solution1 === 2 ? true : false,
        logarithmQuestion10.solution1 === 3 ? true : false,
        false,
        false,
        false,
        false
    ],
    {
        showGraph: true,
        expression: [
            {
                latex: logarithmQuestion10.expression,
                style: "solid"
            },
            {
                latex: `x=${logarithmQuestion10.d}`,
                style: 'dashed',
                color: 'black'
            }
        ]
    }
)

logarithmQuestion10.details.solutionSteps = [
    {type: "text", content: (logarithmQuestion10.solution1 === 0 || logarithmQuestion10.solution1 === 2) ? `We see that the vertical asymptote is x=${logarithmQuestion10.d}, so d=${logarithmQuestion10.d}` : ""},
    {type: "text", content: (logarithmQuestion10.solution1 === 2 || logarithmQuestion10.solution1 === 3) ? logarithmQuestion10.k < 0 ? `The graph is to the left of the vertical asymptote, so k is negative` : `The graph is to the right of the vertical asymptote, so k is positive` : ""},
    {type: "text", content: (logarithmQuestion10.solution1 === 2 || logarithmQuestion10.solution1 === 3) ? logarithmQuestion10.k === "\\frac{1}{2}" ? `There is a horizontal stretch by a factor of 2, so k=1/2` : `There is a horizontal compression by a factor of ${Math.abs(logarithmQuestion10.k)} so k=${logarithmQuestion10.k}` : ""},
    {type: "text", content: (logarithmQuestion10.solution1 === 0 || logarithmQuestion10.solution1 === 1) ? logarithmQuestion10.a === "\\frac{1}{2}" ? `There is a vertical compression by a factor of 2, so a=1/2` : `There is a vertical stretch by a factor of ${Math.abs(logarithmQuestion10.a)} so a=${logarithmQuestion10.a}` : ""},
    {type: "text", content: (logarithmQuestion10.solution1 === 1 || logarithmQuestion10.solution1 === 3) ? `The graph is shifted ${Math.abs(logarithmQuestion10.c)} units ${logarithmQuestion10.c > 0 ? "up" : "down"}, so c=${logarithmQuestion10.c}` : ""},
    {type: "text", content: `Therefore the equation of the function is `},
    {type: "math", content: [
        `f(x)=${logarithmQuestion10.a === -1 ? "-" : logarithmQuestion10.a}\\log(x${logarithmQuestion10.d > 0 ? `-${logarithmQuestion10.d}` : logarithmQuestion10.d === 0 ? "" : `+${Math.abs(logarithmQuestion10.d)}`})`, 
        `f(x)=${logarithmQuestion10.a === -1 ? "-" : logarithmQuestion10.a}\\log(x)${logarithmQuestion10.c > 0 ? `+${logarithmQuestion10.c}` : `${logarithmQuestion10.c}`}`, 
        `f(x)=\\log(${logarithmQuestion10.k === -1 ? "-" : logarithmQuestion10.k}(x${logarithmQuestion10.d > 0 ? `-${logarithmQuestion10.d}` : logarithmQuestion10.d === 0 ? "" : `+${Math.abs(logarithmQuestion10.d)}`}))`, 
        `f(x)=\\log(${logarithmQuestion10.k === -1 ? "-" : logarithmQuestion10.k}x)${logarithmQuestion10.c > 0 ? `+${logarithmQuestion10.c}` : `${logarithmQuestion10.c}`}`][logarithmQuestion10.solution1]
    }
]

let logarithmQuestion11 = new logarithmQuestion (
    "", 
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_EXPRESSION,
        img: true,
        imgSrc: '/img/decibel_graph.png',
        imgDetails: [],
        parseExpression: function(expression) {
            return rationalize(expression).toTex().replace("~", "").replace('\\cdot', '').trim()
        },
        label: "",
        strand: 'Exponential and Logarithmic Functions',
        course: MHF4U,
        questionInfo: 'solve real-world application problems involving logarithms',
        hints: ["Use the formula for comparing decibels above to help you solve the problem", "Write your answer as a decimal number and round to two decimal places", "'Beta1' is the number of decibels of the louder sound", "'Beta2' is the number of decibels of the quieter sound", "(I2/I1) is the relative intensity of the sound"]
    }
)

logarithmQuestion11.generateDecibelQuestion()
logarithmQuestion11.details.label = logarithmQuestion11.a === "solveForI2I1" ? "\\frac{I_2}{I_1}=" : logarithmQuestion11.a === "solveForHigherDecibels" ? "\\beta_{2}=" : "\\beta_{1}="
logarithmQuestion11.question = logarithmQuestion11.a === "solveForI2I1" 
                                                            ? `How many times as intense is ${logarithmQuestion11.k.type} compared to ${logarithmQuestion11.d.type}?`
                                                            : logarithmQuestion11.a === "solveForHigherDecibels"
                                                                ? `How loud (in decibels) is a sound that is ${logarithmQuestion11.c} times louder than ${logarithmQuestion11.d.type}?`
                                                                : `How loud (in decibels) is a sound that is ${logarithmQuestion11.c} times quieter than ${logarithmQuestion11.k.type}?`
    
addAnswers(
    logarithmQuestion11,
    logarithmQuestion11.shortAnswerSolution,
    []
)

logarithmQuestion11.details.solutionSteps = 
    logarithmQuestion11.a === "solveForI2I1" 
    ?
    // Steps for solving for relative intensity
    [
        {type: "text", content: "We are given the decibels for both sounds, so we need to solve for the relative density"},
        {type: "math", content: "\\frac{I_{2}}{I_{1}}"},
        {type: "text", content: "First we can simplify the left side"},
        {type: "math", content: `\\beta_{2} - \\beta_{1} = ${logarithmQuestion11.k.decibels} - ${logarithmQuestion11.d.decibels} = ${logarithmQuestion11.k.decibels - logarithmQuestion11.d.decibels}`},
        {type: "text", content: "Then we can solve for the relative intensity. First divide both sides by 10"},
        {type: "math", content: `${((logarithmQuestion11.k.decibels - logarithmQuestion11.d.decibels) / 10).toFixed(1)}= \\log{\\frac{I_{2}}{I_{1}}}`},
        {type: "text", content: "then we can rewrite the equation in exponential form and solve for the relative intensity"},
        {type: "math", content: `\\frac{I_{2}}{I_{1}} = 10^{${((logarithmQuestion11.k.decibels - logarithmQuestion11.d.decibels) / 10).toFixed(1)}} = ${pow(10, ((logarithmQuestion11.k.decibels - logarithmQuestion11.d.decibels) / 10).toFixed(1))}`}
    ]
    :
        logarithmQuestion11.a === "solveForHigherDecibels"
        ?
        // Steps for solving for B_2
        [
            {type: "text", content: "We are given the decibels for the quieter sound and the relative intensity, so we need to solve for"},
            {type: "math", content: "\\beta_{2}"},
            {type: "text", content: "First we can substitute the values into the formula"},
            {type: "math", content: `\\beta_{2}- ${logarithmQuestion11.d.decibels} = 10 \\log{${logarithmQuestion11.c}}`},
            {type: "text", content: `Next we can add both sides by ${logarithmQuestion11.d.decibels}`},
            {type: "math", content: `\\beta_{2} = 10 \\log{${logarithmQuestion11.c} + ${logarithmQuestion11.d.decibels}}`},
            {type: "math", content: `\\beta_{2} \\approx ${Number((10 * log(logarithmQuestion11.c, 10) + logarithmQuestion11.d.decibels).toFixed(2))}`}
        ]
        :
        // Steps for solving for B_1
        [
            {type: "text", content: "We are given the decibels for the louder sound and the relative intensity, so we need to solve for"},
            {type: "math", content: "\\beta_{1}"},
            {type: "text", content: "First we can substitute the values into the formula"},
            {type: "math", content: `${logarithmQuestion11.k.decibels}- \\beta_{1} = 10 \\log{${logarithmQuestion11.c}}`},
            {type: "text", content: `Next we can isolate the term we need to solve for and solve for the number of deibels for the quieter sound`},
            {type: "math", content: `\\beta_{1} = ${logarithmQuestion11.k.decibels} - 10 \\log{${logarithmQuestion11.c}} \\approx ${Number((logarithmQuestion11.k.decibels - 10 * log(logarithmQuestion11.c, 10)).toFixed(2))}`}
        ]

let logarithmQuestion12 = new logarithmQuestion(
    "xxx", 
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_EXPRESSION,
        img: true,
        imgSrc: '/img/pH_scale.png',
        imgDetails: [],
        parseExpression: function(expression) {
            return rationalize(expression).toTex().replace("~", "").replace('\\cdot', '').trim()
        },
        label: "",
        strand: 'Exponential and Logarithmic Functions',
        course: MHF4U,
        questionInfo: 'solve real-world application problems involving logarithms',
        hints: ["use the formula above to help you solve the problem", "type your answer as a decimal number", "round to two decimal places if necessary"]
    }
)

logarithmQuestion12.generatepHQuestion()
logarithmQuestion12.details.label = 
    logarithmQuestion12.a === "solveForpH" ? "\\text{pH}=" : "H^{+}=" 
logarithmQuestion12.question = 
    logarithmQuestion12.a === "solveForpH" 
        ?
        `A substance has a hydronium ion concentration of approximately ${pow(10, logarithmQuestion12.exp).toFixed(logarithmQuestion12.exp * -1)}. What is its pH?`
        :
        `A substance has has a pH of approximately ${logarithmQuestion12.exp * -1}. What is the concentration of hydronium ions of this substance?` 

addAnswers(
    logarithmQuestion12,
    logarithmQuestion12.shortAnswerSolution,
    []
)

logarithmQuestion12.details.solutionSteps = 
        logarithmQuestion12.a === "solveForpH"
    ?
        [
            {type: "text", content: "We can susbstitute the hydronimum ion concentration in the formula to solve for the pH"},
            {type: "math", content: `\\text{pH}=-\\log[${pow(10, logarithmQuestion12.exp).toFixed(logarithmQuestion12.exp * -1)}]=${logarithmQuestion12.exp * -1}`}
        ]
    :
        [
            {type: "text", content: "We can susbstitute the hydronimum ion concentration in the formula to solve for the pH"},
            {type: "math", content: `${logarithmQuestion12.exp * -1} = -\\log[H^{+}]`},
            {type: "text", content: "Next we can convert the equation to exponential form to solve for the hydronimum ion concentration"},
            {type: "math", content: `H^{+}=10^{${logarithmQuestion12.exp}}= ${pow(10, logarithmQuestion12.exp).toFixed(logarithmQuestion12.exp * -1)}`}
        ]

// Discrete Probability Distribution Questions -----------------------------------------

// Q17
let discreteDistributionQuestion1 = new discreteDistributionQuestion(
    'Match each probability distribution with its definition',
    SORT_LIST,
    {
        // img: true,
        // imgSrc: '/img/triangle_obtuse.png',
        // imgDetails: [{
        //     text: "Random Text",
        //     position: {
        //         position: 'absolute',
        //         top: 20,
        //         left: 16,
        //         color: 'red',
        //     }
        // }],
        strand: 'Discrete Probability Distributions',
        course: MDM4U,
        questionInfo: 'Assess knowledge of characteristics of discrete probability disributions'
    }
) 

discreteDistributionQuestion1.details.solutionSteps = [
    {type: "text", content: "The definitions of the probability distributions are:"},
    {type: "text", content: "Uniform: the probability of any outcome is equal"},
    {type: "text", content: "Geometric: the random variable is the number the waiting time and the trials are independent"},
    {type: "text", content: "Binomial: the random variable is the number of succcesses and the trials are independent"},
    {type: "text", content: "Hypergeometric: the random variable is the number of succcesses and the trials are dependent"}
]

addAnswers(
    discreteDistributionQuestion1,
    discreteDistributionQuestion1.list.map(item => new Object({id: item.id, definition: item.definition, description: [item.description[0]]}))
)

// Q18
let discreteDistributionQuestion2 = new discreteDistributionQuestion(
    'Match each probability distribution with its expectation formula',
    SORT_LIST,
    {
        strand: 'Discrete Probability Distributions',
        course: MDM4U,
        questionInfo: 'Assess knowledge of characteristics of discrete probability disributions'
    }
) 

discreteDistributionQuestion2.details.solutionSteps = [
    {type: "text", content: "The expected value formulas for the probability distributions are:"},
    {type: "text", content: "Uniform:"},
    {text: "math", content: 'E(X)=\\frac{1}{n}(x_{1}+x_{2}+...x_{n})'},
    {type: "text", content: "Geometric:"},
    {text: "math", content: "E(X)=\\frac{q}{p}"},
    {type: "text", content: "Binomial:"},
    {text: "math", content: "E(X)=np"},
    {type: "text", content: "Hypergeometric:"},
    {text: "math", content: "E(X)=\\frac{ra}{n}"},
]

addAnswers(
    discreteDistributionQuestion2,
    discreteDistributionQuestion2.list.map(item => new Object({id: item.id, definition: item.definition, description: [item.description[1]]}))
)

// Q19
let discreteDistributionQuestion3 = new discreteDistributionQuestion(
    'What is the expected value for this probability distribution?',
    SHORT_ANSWER,
    {
        table: true,
        tableHeadings: ['x', 'P(x)'],
        checkAnswer: CHECK_EXPRESSION,
        strand: 'Discrete Probability Distributions',
        course: MDM4U,
        questionInfo: 'Assess knowledge of characteristics of discrete probability disributions',
        label: 'E(X)='
    }
)

discreteDistributionQuestion3.generateDistribution()

discreteDistributionQuestion3.details.tableValues = discreteDistributionQuestion3.distribution

discreteDistributionQuestion3.details.solutionSteps = [
    {type: "text", content: "To calculate the expected value of a probability distribution, we find"},
    {type: "math", content: "\\displaystyle\\sum x \\cdot P(x)"},
    {type: "math", content: `${discreteDistributionQuestion3.distribution.map(item => `${item.xValue} \\cdot ${item.yValue}+`).join(" ").slice(0, -1)}`},
    {type: "math", content: `=${simplify(discreteDistributionQuestion3.distribution.reduce((acc, cur) => {
        return acc + (cur.xValue * cur.yValue)
    }, 0).toFixed(1)).toTex()}`},
]

addAnswers(
    discreteDistributionQuestion3,
    simplify(discreteDistributionQuestion3.distribution.reduce((acc, cur) => {
        return acc + (cur.xValue * cur.yValue)
    }, 0).toFixed(1)).toTex()
)





// ----------------------------------------------------------------------------------
return QuestionSet

}
// ----------------------------------------------------------------------------------

generateQuizQuestions()



    
