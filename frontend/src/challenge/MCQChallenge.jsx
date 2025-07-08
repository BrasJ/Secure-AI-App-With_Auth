import "react"
import {useState} from "react";

export function MCQChallenge({challenge, showExplantaion = false}) {
    const [selectedOption, setSelectedOption] = useState(null)
    const [shouldShowExplanation, setShouldShowExplanation] = useState(showExplantaion)


    // Ensures options are in JSON
    const options = typeof challenge.options === "string"
        ? JSON.parse(challenge.options)
        : challenge.options

    // Handles selecting an option
    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return;
        setSelectedOption(index)
        setShouldShowExplanation(true)
    }

    // Handles highlighting answers
    // - correct in green
    // - incorrect in red
    const getOptionClass = (index) => {
        if (selectedOption === null) return "option"
        if (index === challenge.correct_answer_id) {
            return "option correct"
        }
        if (selectedOption === index && index !== challenge.correct_answer_id) {
            return "option incorrect"
        }

        return "option"
    }

    return <div className="challenge-display">
        <p><strong>Difficulty</strong>: {challenge.difficulty}</p>
        <p className="challenge-title">{challenge.title}</p>
        <div className="options">
            {options.map((option, index) => (
                <div
                    className={getOptionClass(index)}
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                >
                    {option}
                </div>
            ))}
        </div>
        {shouldShowExplantaion && selectedOption !== null && (
            <div className="explanation">
                <h4>Explanation</h4>
                <p>{challenge.explanation}</p>
            </div>
        )}
    </div>
}