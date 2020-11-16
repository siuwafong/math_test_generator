import { evaluate, parse, simplify, rationalize, e } from 'mathjs'
import DesmosGraph from './DesmosGraph'

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
                this.expression = rationalize(`(${this.a}x+${this.b}) / (${this.c}x+${this.d})`).toTex().replace('\\cdot', '')
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
                while (this.a === 0 || this.c === 0 || Math.abs(this.a) === 3 || (this.a / this.k) === (this.c / this.k) ) {
                    this.a = Math.ceil(Math.random() * 10) - 5
                    this.c = Math.ceil(Math.random() * 20) - 10
                }
                this.expression = rationalize(`${this.k}/(${this.a} * x - ${this.c})`).toTex().replace('\\cdot', '')
                this.shortAnswerSolution = `${this.k}/(${this.a}x-${this.c})`
            }
            // generate a linear over linear function
            if (numeratorDegree === 1 && denominatorDegree === 1) {
                while((this.a / this.c) === (this.b / this.d) || (this.a / this.c ) === (this.a / this.b) || (this.b / this.d) === (this.a / this.b) || this.a === 0 || this.b === 0 || this.c === 0 || this.d === 0) {
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
        this.verticalStretch = Math.floor(Math.random() * 2)
        this.horizontalCompression = Math.floor(Math.random() * 2)
        this.expression = ""
        this.generateExpression = (ratio, k = false) => {
            if (ratio === "sin" || ratio === "cos" || ratio === "tan" || ratio === "csc" || ratio === "sec") {
                this.ratio = ratio
                while (this.a === 0 || this.k === 0 || Math.abs(this.k) === 1 || this.a === this.k || this.k === this.d || this.d === this.c || this.a === this.d || this.k === this.c || this.a === this.c) {
                    this.a = Math.ceil(Math.random() * 10 ) - 5
                    this.k = Math.ceil(Math.random() * 10 ) - 5
                    this.d = Math.ceil(Math.random() * 10 ) - 5
                    this.c = Math.ceil(Math.random() * 10 ) - 5
                }
                this.expression = simplify(`${this.verticalStretch === 1 || Math.abs(this.a) === 1 ? this.a : `1/${this.a}`}`)
                                    .toTex()
                                    .concat(`{\\text{${this.ratio}}}`)
                                    .concat("(")
                                    .concat(simplify(`${k === true ? this.horizontalCompression === 1 ? this.k : `(1/${this.k})` : ""}`).toTex())
                                    .concat("(")
                                    .concat(simplify(`x-${this.d}`).toTex())
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
        strand: 'quadratic relations',
        course: MPM2D,
        questionInfo: 'assess knowledge of x-intercepts of quadratics'
    }, 
)

quadraticQuestion1.generateExpression();

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
        strand: 'quadratic functions',
        course: MCR3U,
        questionInfo: 'assess ability to convert graph to equation'
    }
)

quadraticQuestion2.generateExpression()

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
        strand: 'quadratic functions',
        course: MCR3U,
        questionInfo: 'assess ability to factor quadratic functions'
    }
)

quadraticQuestion3.generateExpression();

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
// checking sets converts the expressions to numbers, which leads to an error


// -----------------------------------------------------------------------------------
// Polynomial Questions

// Q3
let polynomialQuestion1 = new expandedPolynomialQuestion(
    'What are the x-intercept(s) of this function?',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_SETS,
        strand: 'polynomial functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of x-intercepts of polynomials'
    }
)

polynomialQuestion1.generateExpression();

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
        strand: 'polynomial functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of x-intercepts of polynomials'
    }
)

polynomialQuestion2.generateExpression(true);

addAnswers(
    polynomialQuestion2,
    polynomialQuestion2.xInts
)

// Q5
let polynomialQuestion3 = new expandedPolynomialQuestion(
    'What is the end behaviour of this function?',
    MULTIPLE_CHOICE,
    {
        strand: 'polynomial functions',
        course: MHF4U,
        questionInfo: 'assess end behaviour of polynomial functions'
    }
)

polynomialQuestion3.generateExpression(true);

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

// Q6
let rationalQuestion1 = new rationalQuestion(
    'What is the vertical asymptote of this function?',
    MULTIPLE_CHOICE,
    {
        strand: 'rational functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of the reciprocal of a linear function'
    }
)

rationalQuestion1.generateExpression(0, 1)

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
        strand: 'rational functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of the reciprocal of a linear function'
    }
)

rationalQuestion2.generateExpression(0, 1)

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
        strand: 'rational functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of linear over linear rational functions'
    }
)

rationalQuestion3.generateExpression(1, 1)

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
        strand: 'rational functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of linear over linear rational functions'
    }
)

rationalQuestion4.generateExpression(1, 1)

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
        strand: 'rational functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of linear over linear rational functions'
    }
)

rationalQuestion5.generateExpression(1, 1)

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
        strand: 'rational functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of linear over linear functions'
    }
)

rationalQuestion6.generateExpression(1, 1)

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
        strand: 'rational functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of the reciprocal of linear functions',
        hints: ['leave your numerator as a positive number', 'all numbers should be integers', 'use forward slashes ("/") to create a fraction', 'separate the numerator and denominator with brackets']
    }
)

rationalQuestion7.generateExpression(0, 1, true)

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
        strand: 'rational functions',
        course: MHF4U,
        questionInfo: 'assess knowledge of reciprocal of quadratic functions',
    }
)

rationalQuestion8.generateExpression(0, 2)

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

addAnswers(
    sinusoidalQuestion1,
    [
        sinusoidalQuestion1.verticalStretch ? Math.abs(sinusoidalQuestion1.a).toString() : simplify(`1/${Math.abs(sinusoidalQuestion1.a)}`).toTex(), sinusoidalQuestion1.horizontalCompression ? Math.abs(sinusoidalQuestion1.k).toString() : simplify(`1/${Math.abs(sinusoidalQuestion1.k)}`).toTex(), Math.abs(sinusoidalQuestion1.d).toString(), Math.abs(sinusoidalQuestion1.c).toString()
    ],
    [true, false, false, false]
)

// Discrete Probability Distribution Questions -----------------------------------------

// Q15
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

addAnswers(
    discreteDistributionQuestion1,
    discreteDistributionQuestion1.list.map(item => new Object({id: item.id, definition: item.definition, description: [item.description[0]]}))
)

// Q16
let discreteDistributionQuestion2 = new discreteDistributionQuestion(
    'Match each probability distribution with its expectation formula',
    SORT_LIST,
    {
        strand: 'Discrete Probability Distributions',
        course: MDM4U,
        questionInfo: 'Assess knowledge of characteristics of discrete probability disributions'
    }
) 

addAnswers(
    discreteDistributionQuestion2,
    discreteDistributionQuestion2.list.map(item => new Object({id: item.id, definition: item.definition, description: [item.description[1]]}))
)

// Q17
let discreteDistributionQuestion3 = new discreteDistributionQuestion(
    'What is the expected value for this probability distribution?',
    SHORT_ANSWER,
    {
        table: true,
        tableHeadings: ['x', 'P(x)'],
        checkAnswer: CHECK_EXPRESSION,
        strand: 'Discrete Probability Distributions',
        course: MDM4U,
        questionInfo: 'Assess knowledge of characteristics of discrete probability disributions'
    }
)

discreteDistributionQuestion3.generateDistribution()

discreteDistributionQuestion3.details.tableValues = discreteDistributionQuestion3.distribution

// discreteDistributionQuestion3.expression = "E(X)="

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



    
