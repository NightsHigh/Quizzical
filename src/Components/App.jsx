import React from "react"
import ReactDOM from "react-dom"
import Question from "./Question"
import Result from "./Result"

export default function App() {
    const [questions, setQuestions] = React.useState([])
    const [gameStarted, setGameStarted] = React.useState(false)
    const [gameEnded, setGameEnded] = React.useState(false)
    const [selectedAnswers, setSelectedAnswers] = React.useState({})
    const [score, setScore] = React.useState(0)

    async function fetchQuestions() {
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
            const data = await response.json();
            const processedQuestions = data.results.map((question, index) => {
                const answers = shuffleArray([...question.incorrect_answers, question.correct_answer]);
                return {
                    id: index,
                    question: question.question,
                    correctAnswer: question.correct_answer,
                    answers: answers
                };
            });
            setQuestions(processedQuestions);
        } catch (error) {
            console.error('Error fetching questions:', error)
        }
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function startGame() {
        setGameStarted(true);
        fetchQuestions();
    }

    function startGameAgain() {
        setGameEnded(false);
        setSelectedAnswers({});
        setScore(0);
        fetchQuestions();
    }

    function handleAnswerClick(questionId, answer) {
        setSelectedAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: answer
        }));
    }

    function submit() {
        setGameEnded(true);
        checkQuestions();
    }

    function checkQuestions() {
        let newScore = 0;
        questions.forEach((question) => {
            if (selectedAnswers[question.id] === question.correctAnswer) {
                newScore += 1;
            }
        });
        setScore(newScore);
    }

    return (
        <main>
            {!gameStarted && (
                <div className="main-container">
                    <h1 className="title">Quizzical</h1>
                    <p className="instructions">
                        Pick the correct answer and check the answers to see your score!
                    </p>
                    <button className="start-quiz" onClick={startGame}>
                        Start Game
                    </button>
                </div>
            )}
            {gameStarted && (
                <div className="question-sheet">
                    {questions.map((question) => (
                        <Question 
                            key={question.id}
                            question={question}
                            selectedAnswer={selectedAnswers[question.id]}
                            onAnswerClick={(answer) => handleAnswerClick(question.id, answer)}
                            gameEnded={gameEnded}
                        />
                    ))}
                    {!gameEnded && <button onClick={submit}>Check results</button>}
                    {gameEnded && (
                        <Result score={score} onTryAgain={startGameAgain} />
                    )}
                </div>
            )}
        </main>
    );
}
