// src/components/Inputs.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Inputs = ({ onSubmit }) => {
  const [digit, setDigit] = useState("");
  const [time, setTime] = useState("");
  const [rows, setRows] = useState("");
  const [questions, setQuestions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ digit, time, rows, questions });
  };

  return (
    <Form onSubmit={handleSubmit} className="container mt-4">
      <Form.Group controlId="formDigit">
        <Form.Label>Digit</Form.Label>
        <Form.Control
          type="number"
          value={digit}
          onChange={(e) => setDigit(Number(e.target.value))}
        />
      </Form.Group>

      <Form.Group controlId="formTime">
        <Form.Label>Time (seconds)</Form.Label>
        <Form.Control
          type="number"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
        />
      </Form.Group>

      <Form.Group controlId="formRows">
        <Form.Label>Rows</Form.Label>
        <Form.Control
          type="number"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
        />
      </Form.Group>

      <Form.Group controlId="formQuestions">
        <Form.Label>Questions</Form.Label>
        <Form.Control
          type="number"
          value={questions}
          onChange={(e) => setQuestions(Number(e.target.value))}
        />
      </Form.Group>

      <Button
        variant="success"
        type="submit"
        style={{ marginTop: '20px', backgroundColor: 'green' }}
      >
        Generate Questions
      </Button>
    </Form>
  );
};

export default Inputs;
