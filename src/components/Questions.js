// src/components/Questions.js
import React, { useState, useEffect } from 'react';

const generateRandomNumber = (digit, isFirstNumber = false) => {
  const min = isFirstNumber ? 1 : -Math.pow(10, digit - 1);
  const max = Math.pow(10, digit) - 1;
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  
  // Avoid zero by adding or subtracting 1
  if (number === 0) {
    number = number + (Math.random() < 0.5 ? 1 : -1);
  }

  return number;
};

const getRandomColor = () => {
  const colors = ['#006400', '#800080']; // Dark green and purple
  return colors[Math.floor(Math.random() * colors.length)];
};

const Questions = ({ digit, time, rows, questions, onComplete, setAnswers }) => {
  const [questionSets, setQuestionSets] = useState([]);
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [timeLeft, setTimeLeft] = useState(time);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const generateQuestionSets = () => {
      const sets = [];
      const allAnswers = [];
      for (let i = 0; i < Math.ceil(questions / 5); i++) {
        const set = [];
        const setAnswers = [];
        for (let j = 0; j < 5; j++) {
          const numbers = [];
          let sum = 0;

          for (let k = 0; k < rows; k++) {
            const isFirstNumber = k === 0;
            let num;
            
            do {
              num = generateRandomNumber(digit, isFirstNumber);
            } while (sum + num < 0);
            
            numbers.push(num);
            sum += num;
          }

          set.push(numbers);
          setAnswers.push(sum);
        }
        sets.push(set);
        allAnswers.push(setAnswers);
      }
      setQuestionSets(sets);
      setBgColor(getRandomColor());
      setAnswers(allAnswers);
    };

    generateQuestionSets();
  }, [digit, rows, questions, setAnswers]);

  useEffect(() => {
    if (questionSets.length > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      const slideInterval = setInterval(() => {
        setCurrentSetIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % questionSets.length;
          if (nextIndex === 0 && currentSetIndex === questionSets.length - 1) {
            clearInterval(slideInterval);
            clearInterval(interval);
            setIsComplete(true);
            onComplete(); // Trigger the display of answers
          } else {
            setBgColor(getRandomColor());
            setTimeLeft(time); // Reset time left for the next slide
          }
          return nextIndex;
        });
      }, time * 1000);

      return () => {
        clearInterval(slideInterval);
        clearInterval(interval);
      };
    }
  }, [questionSets, time, currentSetIndex, onComplete]);

  return (
    !isComplete && (
      <div className="container mt-4">
        <div style={{ textAlign: 'right', color: 'red', fontSize: '1.5em', marginBottom: '10px' }}>
          Time left: {timeLeft}s
        </div>
        <div
          style={{
            backgroundColor: bgColor,
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            color: 'white',
          }}
        >
          {questionSets.length > 0 ? (
            <div className="d-flex justify-content-between">
              {questionSets[currentSetIndex].map((question, index) => (
                <div key={index} className="text-center">
                  <h4>Q{currentSetIndex * 5 + index + 1}</h4>
                  {question.map((num, idx) => (
                    <p key={idx} style={{ fontSize: '2em' }}>{num}</p>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div>Generating questions...</div>
          )}
        </div>
      </div>
    )
  );
};

export default Questions;
