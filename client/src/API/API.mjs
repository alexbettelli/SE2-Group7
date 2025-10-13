import { Service, Ticket } from "../models.mjs"
import { getURL } from "../utils/utils.mjs";
import {
  Counter
} from "../models.mjs"

const SERVER_URL = "http://localhost:3001";

const getServices = async () => {
    const response = await fetch(getURL('api/services'));
    if(response.ok) return await response.json();
    else throw await response.text()
}

const addCustomerToQueue = async (serviceID, customerID) => {
    const response = await fetch(getURL(`api/queues/${serviceID}`), {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ "customerID": customerID })
    });
    if(response.ok) return response.json();
    else throw await response.text();
}


//COUNTERS
export const getCounters = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/api/counters`, {
            method: 'GET',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        console.log(data);
        const counters = data.map(counter => new Counter(
          counter.id,
          counter.number,
          counter.service_id,
          counter.service_tag,
          counter.service_name,
          counter.is_busy
        ));
        console.log(counters);
        return counters;
  }
  catch(error) {
      console.error("Error in GET Counters");
      return [];
  }
}

export const getNextTicket = async (counterId, previousTicketId) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/counter/${counterId}/next/${previousTicketId}`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error || 'Server error');


    const ticket = new Ticket(
      data.id, data.number, data.serviceTag, data.counterNumber, data.initialDate, data.finalDate
    );

    console.log("Fetched Ticket:", ticket);
    if (!data) return null;

    return ticket;

  } catch (error) {
    console.error("Error in POST Next Ticket", error);
    return null;
  }
}


const API = { getServices, addCustomerToQueue, getNextTicket, getCounters };
export default API
