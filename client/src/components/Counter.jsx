import React from 'react';
import {useState} from 'react';
import { Ticket } from '../models.mjs';
import { getNextTicket } from '../API/API.mjs';
import '../style/Employee.css';


function Counter({ counter }) {
  const [ticket, setTicket] = useState(null);

  const handleNextTicket = async () => {
    try {
      const nextTicket = await getNextTicket(counter.id, ticket ? ticket.id : 0);
      console.log(nextTicket);
      if (nextTicket) {
        setTicket(new Ticket(
          nextTicket.id,
          nextTicket.number,
          nextTicket.serviceTag,
          nextTicket.counterNumber,
          nextTicket.initialDate,
          nextTicket.finalDate
        ));
      }
      else {
        alert("No more tickets in the queue for this counter.");
      }
    } catch (error) {
      console.error("Error fetching next ticket:", error);
    }
  };

  return (
    <Display counter={counter} ticket={ticket} handleNextTicket={handleNextTicket}/>
  )

}

function Display(props){
  const { counter, ticket, handleNextTicket } = props;
  return (
    <div className="display-container">
      <div className='display'>
        <div className="display-header">
          <p>{counter ? `Counter ${counter.number}` : "Select a counter"}</p>
        </div>
        {counter && <div className="display-body">
          <h2>{ ticket ? `${ticket.number}` : "AVAILABLE" }</h2>
        </div>}
      </div>
      { counter && <button onClick={handleNextTicket}>Call next</button> }
    </div>
  )
}


export { Counter };