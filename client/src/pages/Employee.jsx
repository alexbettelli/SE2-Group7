import React, {useEffect, useState} from 'react';
import {getCounters} from '../API/API.mjs';
import {CounterList} from '../components/CounterList';
import '../style/Employee.css';


function EmployeePage() {
  const [counters, setCounters] = useState([]);
  const [selectedCounter, setSelectedCounter] = useState(null);

  const handleCounterSelect = (counter) => {
    setSelectedCounter(counter);
  }

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
    <div className='employee-container'>
      <CounterList counters={counters} setSelectedCounter={handleCounterSelect} />
    </div>

  );
}

export { EmployeePage };
