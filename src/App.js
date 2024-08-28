// src/App.js
import React, { useState } from 'react';
import Inputs from './components/Inputs';
import Questions from './components/Questions';
import Answers from './components/Answers';
import { Container } from 'react-bootstrap';

const App = () => {
  const [config, setConfig] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  const handleInputsSubmit = (inputs) => {
    setConfig(inputs);
  };

  const handleSetComplete = () => {
    setShowAnswers(true);
  };

  return (
    <Container>
      {!config ? (
        <Inputs onSubmit={handleInputsSubmit} />
      ) : (
        <>
          <Questions
            digit={config.digit}
            time={config.time}
            rows={config.rows}
            questions={config.questions}
            onComplete={handleSetComplete}
            setAnswers={setAnswers}
          />
          {showAnswers && <Answers answers={answers} />}
        </>
      )}
    </Container>
  );
};

export default App;
