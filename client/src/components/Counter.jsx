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



  if (!counter) {
    return (
      <div className="counter-details">
        <h2 className="counter-details-title">Select a Counter</h2>
        <p className="no-counter-selected">No counter selected. Please select a counter to view details.</p>
      </div>
    );
  }
  return (
    <div className="counter-details">
      <h2 className="counter-details-title">Counter Details</h2>
      <p className="counter-details-info">Counter Number: {counter.number}</p>
      <p className="counter-details-info">Service Name: {counter.service_name}</p>
      <p className="counter-details-info">Service Tag: {counter.service_tag}</p>

      {ticket ? (
        <div className="ticket-container">
          <div className="ticket-card">
            <h3>Ticket #  {ticket.number}{ticket.serviceTag}</h3>
            <p><span className="label">ID:</span> {ticket.id}</p>
            <p><span className="label">Service Tag:</span> {ticket.serviceTag}</p>
            <p><span className="label">Counter Number:</span> {ticket.counterNumber}</p>
            <p><span className="label">Initial:</span> {ticket.initialDate}</p>
          </div>
        </div>
      ) : (
        <p className="no-ticket"> Current Ticket: None</p>
      )}
      <button
        onClick={handleNextTicket}
      >
        Next Ticket
      </button>
    </div>
  );
}
export { Counter };