import React from 'react';
import { useEffect, useState } from 'react';
import { ServicesList } from '../components/ServicesList';
import { io } from 'socket.io-client'
import API from '../API/API.mjs';
import Board from '../components/Board';
import Ticket from '../components/Ticket';
import '../style/Customer.css'

function CustomerPage(props) {
  const [ticket, setTicket] = useState(null);
  const [socket, setSocket] = useState(null);
  const [service, selectService] = useState(null);
  const [done, setDone] = useState(false);

  const boardMock = {
    "counter 1": "Ticket #1",
    "counter 2": "Ticket #10",
    "counter 3": "Ticket #20"
  }


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
            <ServicesList services={props.services} addCustomerToQueue={addCustomerToQueue}/>
            : 
            <ServiceHandler ticket={ticket} service={service} board={boardMock}/> }
      </div>
    </div>
  );
}

function ServiceHandler(props){
  return (
    <div className='service-handler'>
      <Ticket ticket={props.ticket} service={props.service}/>
      <Board board={props.board}/>
    </div>
  )
}

export { CustomerPage };
