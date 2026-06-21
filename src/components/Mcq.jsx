import React, { useState } from "react";

export default function MCQApp() {
  const questions = [
    {
      id: 1,
      question: "What is React?",
      options: ["Library", "Framework", "Language"],
      answer: "Library",
    },
    {
      id: 2,
      question: "What is useState?",
      options: ["Hook", "Component", "API"],
      answer: "Hook",
    },
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  // handle option change
  const handleChange = (qid, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qid]: option,
    }));
  };

  // handle submit
  const handleSubmit = () => {
    let correct = 0;

    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        correct++;
      }
    });

    setScore(correct);
  };

  return (
    <div className="container">
      <h1>MCQ Test</h1>

      {questions.map((q) => (
        <div key={q.id} className="question-block">
          <h3>
            {q.id}. {q.question}
          </h3>

          {q.options.map((option, index) => (
            <label key={index} style={{ display: "block" }}>
              <input
                type="radio"
                name={`q${q.id}`}
                value={option}
                // checked={selectedAnswers[q.id] === option}
                onChange={() => handleChange(q.id, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>

      {score !== null && (
        <div className="result">
          <h2>Result</h2>
          <p>
            Correct Answers: {score} / {questions.length}
          </p>
        </div>
      )}
    </div>
  );
}
