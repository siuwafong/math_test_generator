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
        this.verticalStretch = Math.floor(Math.random() * 2)
        this.horizontalCompression = Math.floor(Math.random() * 2)
        this.expression = ""
        this.generateExpression = (ratio, k = false) => {
            if (ratio === "sin" || ratio === "cos" || ratio === "tan" || ratio === "csc" || ratio === "sec") {
                this.ratio = ratio
                while (this.a === 0 || this.k === 0 || Math.abs(this.k) === 1 || Math.abs(this.a) === Math.abs(this.k) || Math.abs(this.k) === Math.abs(this.d) || Math.abs(this.d) === Math.abs(this.c) || Math.abs(this.a) === Math.abs(this.d) || Math.abs(this.k) === Math.abs(this.c) || Math.abs(this.a) === Math.abs(this.c)) {
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
// checking sets converts the expressions to numbers, which leads to an error


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



    
