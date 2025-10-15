import React from 'react';
import { Container, Row, Col, Button} from "react-bootstrap";
import {useState} from 'react';
import { getNextTicket } from '../API/API.mjs';
import '../style/Employee.css';
import '../style/Board.css';


function Counter(props) {
  const [ticket, setTicket] = useState(null);
  const boardMock = {
    "service 1": "5",
    "service 2": "2",
    "service 3": "0"
  }

  const handleNextTicket = async () => {
    try {
      const nextTicket = await getNextTicket(props.counter.id, ticket ? ticket.id : 0);
      console.log(nextTicket);
      if (nextTicket) {
        setTicket({
          id: nextTicket.id,
          number: nextTicket.number,
          serviceTag: nextTicket.serviceTag,
          counterNumber: nextTicket.counterNumber,
          initialDate: nextTicket.initialDate,
          finalDate: nextTicket.finalDate,
        });
      }
      else {
        alert("No more tickets in the queue for this counter.");
      }
    } catch (error) {
      console.error("Error fetching next ticket:", error);
    }
  };
 

  return (
    <Container fluid>
      
      <Row className="justify-content-center"> <p>COUNTER {props.counter.id} </p> </Row>      
      <Row>
        <Col> 
          <table className='board'>
              <thead>
                <tr>
                    <th>Service</th>
                    <th>Queue</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.entries(boardMock).map(([key, value], index) => {
                    return (
                      <tr key={index}>
                          <td>{key}</td>
                          <td>{value}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
          </table>
        </Col>
        <Col>{ticket !== null && <div>Stai servendo il ticket {ticket.number}</div>}</Col>
        <Col></Col>
      </Row>
      <Row className="justify-content-center">
        <Button onClick={handleNextTicket}>CALL NEXT</Button>
      </Row>      
    </Container>   
  );
// <Display counter={counter} ticket={ticket} handleNextTicket={handleNextTicket}/>
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