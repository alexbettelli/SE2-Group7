import React, {useEffect, useState} from 'react';
import {getCounters, releaseCounter} from '../API/API.mjs';
import {CounterList} from '../components/CounterList';
import {Counter} from '../components/Counter';
import '../style/Employee.css';


function EmployeePage() {
  const [counters, setCounters] = useState([]);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleCounterSelect = (counter) => {
    setSelectedCounter(counter);
  }

  const handleReleaseCounter = async (counterId, employeeId) => {
    try {
      console.log("Releasing counter:", counterId, employeeId);
      setSelectedCounter(null);
      counters.find(c => c.id === counterId).is_busy = false; 
      await releaseCounter(counterId, employeeId);
    } catch (error) {
      console.error("Error releasing counter:", error);
    }
  };

  const refreshCounters = async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      const data = await getCounters();
      setCounters(data);
    } catch (error) {
      console.error('Error fetching counters:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    refreshCounters();
  }, []);

  return (
    <div className='employee-container'>
      <div className='employee-controls'/>
      {
        selectedCounter === null 
        ? <CounterList counters={counters} setSelectedCounter={handleCounterSelect} refreshCounters={refreshCounters}/>
        : <Counter counter={selectedCounter} handleReleaseCounter={handleReleaseCounter}/>
      }
    </div>
  );
}

export { EmployeePage };
