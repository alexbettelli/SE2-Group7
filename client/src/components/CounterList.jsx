import { selectCounter } from '../API/API.mjs';
import { useState } from 'react';
function CounterList({ counters, setSelectedCounter, refreshCounters }) {
  const [selectedCounter, setSelectedCounterState] = useState(null);


  const handleCounterSelect = async (counter) => {
    try {
      const employeeId = 1; // FIXME hardcoded employee id

      const result = await selectCounter(counter.id, employeeId);
      setSelectedCounterState(counter);
      setSelectedCounter(counter);
      console.log('Selected counter:', counter);
      if (refreshCounters) await refreshCounters();
    } catch (error) {
      console.error('Failed to select counter:', error);
      alert('Failed to select counter. Please try again.');
    }
  };

  return (
    <div className="counter-list-wrapper">
      <h2 className="employee-title">Select Counter</h2>

      {!counters || counters.length === 0 ? (
        <p className="no-counters">No counters available.</p>
      ) : (
        <div className="counters-grid">
          {counters.map(counter => (
            <CounterChoice key={counter.id} counter={counter} selectedCounter={selectedCounter} handleCounterSelect={handleCounterSelect}/>            
          ))}
        </div>
      )}
    </div>
  );
}

function CounterChoice(props){
  return(
    <div key={props.counter.id} 
         className={`counter-card ${props.selectedCounter?.id === props.counter.id ? 'selected' : ''} ${props.counter.is_busy ? 'busy' : ''}`}
         onClick={props.counter.is_busy ? undefined : () => props.handleCounterSelect(props.counter)}
    >    
      <div className="counter-number">{props.counter.number}</div>
      <h3 className="counter-service">{props.counter.service_name} ({props.counter.service_tag})</h3>
      <div className={`counter-status ${props.counter.is_busy ? 'busy' : 'available'}`}>
        <i className="bi bi-circle-fill"></i>
        <span>{props.counter.is_busy ? "Busy" : "Available"}</span>
      </div>
    </div>
  )
}

export { CounterList };
