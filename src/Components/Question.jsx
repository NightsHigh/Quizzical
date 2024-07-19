import React from "react"
import AnswerList from "./AnswerList"

export default function Question({ question, selectedAnswer, onAnswerClick, gameEnded }) {
    return (
        <div>
            <h2 dangerouslySetInnerHTML={{ __html: question.question }}></h2>
            <AnswerList 
                answers={question.answers}
                selectedAnswer={selectedAnswer}
                correctAnswer={question.correctAnswer}
                onAnswerClick={onAnswerClick}
                gameEnded={gameEnded}
            />
            <div className="line-break"></div>
        </div>
    );
}
