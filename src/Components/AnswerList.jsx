import React from "react"

export default function AnswerList({ answers, selectedAnswer, correctAnswer, onAnswerClick, gameEnded }) {
    return (
        <ul className="li-container">
            {answers.map((answer, idx) => (
                <li
                    key={idx}
                    className={`answer ${
                        gameEnded
                            ? (selectedAnswer === answer
                                ? (answer === correctAnswer ? 'correct' : 'wrong')
                                : (answer === correctAnswer ? 'correct' : ''))
                            : (selectedAnswer === answer ? 'selected' : '')
                    }`}
                    onClick={() => onAnswerClick(answer)}
                    dangerouslySetInnerHTML={{ __html: answer }}
                ></li>
            ))}
        </ul>
    )
}
