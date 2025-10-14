import React from 'react';
import { useLocation } from 'react-router';
import Board from '../components/Board';
import '../style/CounterDisplay.css';

function CounterDisplayPage() {
  const location = useLocation();
  const { counter } = location.state || {};

  // FIXME mock board
  const boardMock = {
    "counter 1": "Ticket #1",
    "counter 2": "Ticket #10",
    "counter 3": "Ticket #20"
  }

  return (
    <div className="counter-display-container">
      <div className="counter-info">
        <h2>Counter {counter.number}</h2>
        <p>{counter.service_name}</p>
      </div>
      <div>
        <Board board={boardMock} />
      </div>
    </div>
  );
}

export { CounterDisplayPage };
