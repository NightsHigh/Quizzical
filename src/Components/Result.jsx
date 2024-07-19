import React from "react"

export default function Result({ score, onTryAgain }) {
    return (
        <div>
            <h3>Your score: {score}</h3>
            <button onClick={onTryAgain}>Try again</button>
        </div>
    );
}
