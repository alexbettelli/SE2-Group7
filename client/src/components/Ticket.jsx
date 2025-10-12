import { formatSeconds } from '../utils/utils.mjs';
import '../style/Ticket.css';

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

export default Ticket;