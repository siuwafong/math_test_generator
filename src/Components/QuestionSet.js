import { evaluate, parse, simplify, rationalize } from 'mathjs'


// Question Types
const MULTIPLE_CHOICE = 'multiple choice'
const TRUE_OR_FALSE = 'true or false'
const SHORT_ANSWER = 'short answer'

// Course Codes
const MPM1D = 'mpm1d'
const MPM2D = 'mpm2d'
const MCR3U = 'mcr3u'
const MHF4U = 'mhf4u'
const MCV4U = 'mcv4u'
const MDM4U = 'mdm4u'

const CHECK_SETS = 'check sets'

let QuestionSet = []

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


// MPM1D

// Linear Systems
class lineQuestion extends QuestionClass {
    constructor(question, type, details, desmosGraph, answers) {
        super(question, type, details, desmosGraph, answers)
            this.frac =  Math.floor(Math.random() * 2)
            this.m = Math.floor(Math.random() * 20) - 10
            this.b = Math.floor(Math.random() * 20) - 10
            this.expression = ""
            this.slope = ""
            this.generateExpression = () => {
                
                // generate new values for m and b if both of them are equal to 0
                while (this.m === 0 && this.b === 0 || Math.abs(this.m) === Math.abs(this.b) || this.m === 0) {
                    console.log("m and b cannot both be zero. Regenerating values for a and b...")
                    this.m = Math.floor(Math.random() * 20) - 10
                    this.b = Math.floor(Math.random() * 20) - 10
                }

                this.slope = this.m

                let sign = ""
                if (this.b > 0 && this.m !== 0) {
                    sign = "+"
                }

                if (this.frac !== 0) {
                    while (this.frac === 1 || this.b === this.frac || this.frac === 0) {
                        this.frac = Math.ceil(Math.random() * 10) + 1
                    }
          

                    this.slope = simplify(`${this.m} / ${this.frac}`)
                    
                    console.log(this.m, this.frac, this.b, this.slope)
                    this.expression = `y=${Math.abs(this.m / this.frac) !== 1 ? `${this.slope.toTex()}x` : (this.m / this.frac) === 1 ? `x` : `-x`} ${this.b !== 0 ? `${sign}${this.b}` : ""}`
                }
                else {
                    console.log(this.m, this.frac, this.b, this.slope)
                    this.expression = `y=${this.m === 1 ? 'x' : `${this.m}x`} ${this.b !== 0 ? `${sign}${this.b}` : ""}`
                }
            }
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
        this.expression = ""
    }
}

class simpleFactoredQuadraticQuestion extends quadraticQuestion {
    constructor(question, type, details, desmosGraph, answers) {
        super(question, type, details, desmosGraph, answers)
        this.generateExpression = () => {
            while (this.x1 === 0 && this.x2 === 0 || this.x1 === 1 && this.x2 === 1) {
                this.x1 = Math.floor(Math.random() * 20) - 20
                this.x2 = Math.floor(Math.random() * 20) - 20
            }
            this.expression = rationalize(`(x-${this.x1}) * (x-${this.x2})`).toString().replace("*", "")
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
        this.expression = ""
        this.generateExpression = () => {
            for (let i=0; i < this.degree; i++) {
                this.xInts.push(Math.ceil(Math.random() * 10) - 5)
                this.expression = this.expression + `(x-${this.xInts[i]})`
            }
            this.expression = rationalize(this.expression).toString().replace(/\*/g, '')
        } 
    }
}

//  add response messages 
function addAnswers(question, options=[], correct=[], desmosParameters = {showGraph: null, graphfunction: null}) {
    if (options.length === correct.length && question.type === MULTIPLE_CHOICE) {
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
        console.log(question.answers)
    }
    question.desmosGraph.showGraph = desmosParameters.showGraph
    question.desmosGraph.graphfunction = desmosParameters.expression
    
    QuestionSet.push(question)
}


// ------------------------------------------------------------
// Line Questions

let lineQuestion1 = new lineQuestion(
    'what is the slope of this line?',
    MULTIPLE_CHOICE,
    {
        strand: 'equation of lines',
        course: MPM1D,
        questionInfo: 'assess knowledge of slopes and y-intercepts'
    },
)

lineQuestion1.generateExpression();

addAnswers(
    lineQuestion1, 
    [`${simplify(lineQuestion1.slope).toTex()}`, `${lineQuestion1.b}`, simplify(`-${lineQuestion1.slope}`).toTex()], 
    [true, false, false]
)

let lineQuestion2 = new lineQuestion(
    'what is the y-intercept of this line?',
    MULTIPLE_CHOICE,
    {
        strand: 'equation of lines',
        course: MPM1D,
        questionInfo: 'assess knowledge of y-intercepts of lines'
    }
)

lineQuestion2.generateExpression();

addAnswers(
    lineQuestion2, 
    [`${simplify(lineQuestion2.slope).toTex()}`, `${lineQuestion2.b}`, simplify(`-${lineQuestion2.slope}`).toTex()], 
    [false, true, false]
)

let lineQuestion3 = new lineQuestion(
    'Is the slope of the line positive or negative?',
    MULTIPLE_CHOICE,
    {
        strand: 'equation of lines',
        course: MPM1D,
        questionInfo: 'assess knowledge of slopes'
    }
)

lineQuestion3.generateExpression();

addAnswers(
    lineQuestion3,
    ['{\\text{positive}}', '{\\text{negative}}', '{\\text{none of these}}'],
    [lineQuestion3.m > 0 ? true : false, lineQuestion3.m < 0 ? true : false, lineQuestion3.m === 0 ? true : false]
)

let lineQuestion4 = new lineQuestion(
    'What is the x-intercept of this line?',
    MULTIPLE_CHOICE,
    {
        strand: 'equation of lines',
        course: MPM1D,
        questionInfo: 'assess knowledge of slopes'
    },
)

lineQuestion4.generateExpression();

addAnswers(
    lineQuestion4,
    [`${simplify(lineQuestion4.slope).toTex()}`, lineQuestion4.b !== 0 ? `${lineQuestion4.b}` : `${simplify(lineQuestion4.m * 2)}`, lineQuestion4.frac === 0 ? simplify(`-${lineQuestion4.b} / ${lineQuestion4.m}`).toTex() : simplify(`-(${lineQuestion4.b} * ${lineQuestion4.frac} / ${lineQuestion4.m} )  `).toTex() ],
    [false, false, true],
    {
        showGraph: true,
        expression: `y=${lineQuestion4.slope.toString()}x+${lineQuestion4.b}`,
    }
)

let lineQuestion5 = new lineQuestion(
    'What is the y-intercept of this line?',
    MULTIPLE_CHOICE,
    {
        strand: 'equation of lines',
        course: MPM1D,
        questionInfo: 'assess knowledge of slopes'
    },
)

lineQuestion5.generateExpression();

addAnswers(
    lineQuestion5,
    [`${simplify(lineQuestion5.slope).toTex()}`, lineQuestion5.b !== 0 ? `${lineQuestion5.b}` : `${simplify(lineQuestion5.m * 2)}`, lineQuestion5.frac === 0 ? simplify(`-${lineQuestion5.b} / ${lineQuestion5.m}`).toTex() : simplify(`-(${lineQuestion5.b} * ${lineQuestion5.frac} / ${lineQuestion5.m} )  `).toTex() ],
    [false, true, false],
    {
        showGraph: true,
        expression: `y=${lineQuestion5.slope.toString()}x+${lineQuestion5.b}`,
    }
)
// ---------------------------------------------------------------------------
// Quadratic Questions

let quadraticQuestion1 = new simpleFactoredQuadraticQuestion(
    'What are the x-intercept(s) of this function?',
    SHORT_ANSWER,
    {
        checkAnswer: CHECK_SETS,
        strand: 'quadratic expressions',
        course: MPM2D,
        questionInfo: 'assess knowledge of x-intercepts of quadratics'
    }, 
)

quadraticQuestion1.generateExpression();

addAnswers(
    quadraticQuestion1,
    [quadraticQuestion1.x1, quadraticQuestion1.x2]
)

// -----------------------------------------------------------------------------------
// Polynomial Questions


// change to a short answer question
// Use the below function to check for equality of sets
// isSetsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));

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















// ----------------------------------------------------------------------------------
export default QuestionSet


    
