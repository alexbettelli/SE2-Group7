import React, {useEffect, useState} from 'react';
import {getCounters} from '../API/API.mjs';
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

      <CounterList counters={counters} setSelectedCounter={handleCounterSelect} refreshCounters={refreshCounters}/>

      <Counter counter={selectedCounter}/>
    </div>
  );
}

export { EmployeePage };
