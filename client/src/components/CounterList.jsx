import { selectCounter } from '../API/API.mjs';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function CounterList({ counters, setSelectedCounter }) {
  const [selectedCounter, setSelectedCounterState] = useState(null);
  const navigate = useNavigate();

  const handleCounterSelect = async (counter) => {
    try {
      const employeeId = 1; // FIXME hardcoded employee id

      const result = await selectCounter(counter.id, employeeId);
      setSelectedCounterState(counter);
      setSelectedCounter(counter);
      console.log('Selected counter:', counter);
      navigate('/counter-display', { state: { counter } });
    } catch (error) {
      console.error('Failed to select counter:', error);
      alert('Failed to select counter. Please try again.');
    }
  };

  return (
    <div className="employee-container">
      <h2 className="employee-title">Select Counter</h2>

      {!counters || counters.length === 0 ? (
        <p className="no-counters">No counters available.</p>
      ) : (
        <div className="counters-grid">
          {counters.map(counter => (
            <div
              key={counter.id}
              className={`counter-card ${selectedCounter?.id === counter.id ? 'selected' : ''} ${counter.is_busy ? 'busy' : ''}`}
              onClick={counter.is_busy ? undefined : () => handleCounterSelect(counter)}
            >
              <div className="counter-number">{counter.number}</div>
              <h3 className="counter-service">{counter.service_name} ({counter.service_tag})</h3>
              <div className={`counter-status ${counter.is_busy ? 'busy' : 'available'}`}>
                <i className="bi bi-circle-fill"></i>
                <span>{counter.is_busy ? "Busy" : "Available"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { CounterList };
