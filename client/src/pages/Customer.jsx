import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client'
import API from '../API/API.mjs';
import { formatSeconds } from '../utils/utils.mjs';
import '../style/Customer.css'

function CustomerPage(props) {
  const [ticket, setTicket] = useState(null);
  const [socket, setSocket] = useState(null);
  const [service, selectService] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if(done){
      setSocket(io('http://localhost:3001'));
    }
  }, [done]);

  useEffect(() => {
    if(!socket) return;
    socket.on('connection', () => {
      console.log(`Connected with ID: ${socket.id}`);
    })

    return () => socket.disconnect();
  }, [socket]);

  useEffect(() => {
    setDone(true);
  }, [done]);

  async function addCustomerToQueue(service){
    await API.addCustomerToQueue(service.id, socket.id)
      .then(response => {
        setTicket(response); 
        selectService(service);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='customer-container'>
      <div className="main-content">
        { ticket === null ? 
            <ServicesContainer services={props.services} addCustomerToQueue={addCustomerToQueue}/> 
            : 
            <ServiceHandler ticket={ticket} service={service}/> }
      </div>
    </div>
  );
}


function ServicesContainer(props){
  return (
    <div className="services">
    {
      props.services === null ?
        <h1>No available services</h1>
        :
        props.services.map((service, index) => {
          return (
            <div className='service' key={index} onClick={() => props.addCustomerToQueue(service)}>
              <h4>{service.tag}</h4>
            </div>
          )
        })
    }
    </div>
  )
}

function ServiceHandler(props){
  return (
    <div className='service-handler'>
      <Ticket ticket={props.ticket} service={props.service}/>
    </div>
  )
}

function Ticket(props){
  return (
    <div className="ticket">
      <h2>TICKET BOOKED</h2>
      <div className="ticket-number">
        <h4>TICKET NUMBER</h4>
        <p>{props.ticket.number}</p>
      </div>
      <div className="ticket-time">
        <h4>EXPECTED TIME</h4>
        <p>{formatSeconds(props.service.average_time)}</p>
      </div>
    </div>    
  )
}

function Board(props){
  
}

export { CustomerPage };
