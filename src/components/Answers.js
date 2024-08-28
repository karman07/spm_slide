// src/components/Answers.js
import React from 'react';

const Answers = ({ answers }) => {
  return (
    <div className="container mt-4" style={{color: 'black', padding: '20px', 
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
       }}>
      <h2>Answers</h2>
      <div>
        {answers.map((slideAnswers, slideIndex) => (
          <p key={slideIndex} style={{ fontSize: '2em' }}>
            Slide {slideIndex + 1}: {slideAnswers.map((answer, index) => (
              <span key={index}>{answer}{index < slideAnswers.length - 1 ? ', ' : ''}</span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Answers;
