import React from 'react';
import { Container, Row, Col, Button} from "react-bootstrap";
import {useState} from 'react';
import { getNextTicket } from '../API/API.mjs';
import '../style/Employee.css';
import '../style/Board.css';


function Counter(props) {
  const [ticket, setTicket] = useState(null);
  const boardMock = {
    "Service 1": "5",
    "Service 2": "2",
    "Service 3": "0"
  }
  const employeeId = 1; // FIXME hardcoded employee id

  const handleNextTicket = async () => {
    try {
      const nextTicket = await getNextTicket(props.counter.id, ticket ? ticket.id : 0);
      setTicket({
          id: nextTicket.id,
          number: nextTicket.number,
          serviceTag: nextTicket.serviceTag,
          counterNumber: nextTicket.counterNumber,
          initialDate: nextTicket.initialDate,
          finalDate: nextTicket.finalDate,
      });
    
    } catch (error) {
      console.error("Error fetching next ticket:", error);
    }
  };
 
  return (
    
    <Container fluid>
      
      <Row className="counter-name"> <p>COUNTER {props.counter.id} </p> </Row>      
      <Row>
        <Col>
          <div className="board-wrapper">
            <table className='board'>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Queue</th>
                </tr>
              </thead>
              <tbody>
                {
                  Object.entries(boardMock).map(([key, value], index) => (
                    <tr key={index}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </Col>
        <Col>
          <Display counter={props.counter} ticket={ticket} handleNextTicket={handleNextTicket}/>
        </Col>
      </Row>
      <Row className="back-button-row">
        <Button className="back-button" onClick={() => {props.handleReleaseCounter(props.counter.id, employeeId);}}>Back to counters</Button>
      </Row>
           
    </Container> 
  
  );
}

function Display(props){
  const { counter, ticket, handleNextTicket } = props;
  return (
    <div className="display-container">
      <div className='display'>
        <div className="display-header">
          <p>{ticket ? `Current ticket:` : "Call the first ticket"}</p>
        </div>
        {counter && <div className="display-body">
          <h2>{ticket === null ? "AVAILABLE"
            : ticket.id === undefined ? "NO TICKETS IN QUEUE" : ticket.number}
            </h2>
        </div>}
      </div>
      { counter && <button onClick={handleNextTicket}>Call next</button> }
    </div>
  )
}


export { Counter };