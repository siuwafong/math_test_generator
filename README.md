![gif](/math-quiz-game.gif)

# Math Test Generator

This is a math quiz generator designed to give grade 9-12 students practice questions to improve their knowledge and understanding of course material. The questions are based on the Ontario curriculum math courses (academic for grades 9-10 and university level for grades 11-12).

# Libraries/Frameworks

This webapp was developed with React. Mathjs was used to evaluate math expressions, React-beautiful-dnd was used for drag-and-drop functionality, and this webapp relies on the Desmos API for graphs of functions.

# Instructions

* Install all the project dependencies with `npm install`
* Start the development server with `npm start`

## How to Use

* The app opens with the settings where you can select topics from different courses. You will need to choose at least one topic
* There are two modes: standard and timed. Standard mode will go through all the questions in order for the chosen topics. Timed mode will go through the questions for the chosen topics in a random order for the time specified. You can change the amount of time from 1 to 20 minutes
* At the end of the quiz, you will receive a score. For standard mode this will be a percentage and for timed mode it will give you the total number of questions answered. The quiz also uses local storage to score high scores


