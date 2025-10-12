import React, { useEffect, useState } from 'react';
import { getCounters } from '../API/API.mjs';
import '../style/Employee.css';

function EmployeePage() {
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    console.log('Fetching counters');
    getCounters().then(data => {
      console.log('Counters:', data);
      setCounters(data);
    }).catch(error => {
      console.error('Error fetching counters:', error);
    });
  }, []);

  return (
    <div className="employee-container">
      <h2 className="employee-title">Counters</h2>
      
      {!counters || counters.length === 0 ? (
        <p className="no-counters">No counters available.</p>
      ) : (
        <div className="counters-grid">
          {counters.map(counter => (
            <div key={counter.id} className="counter-card">
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

export { EmployeePage };