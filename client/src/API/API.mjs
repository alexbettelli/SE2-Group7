import { Service, Ticket } from "../models.mjs"
import { getURL } from "../utils/utils.mjs";
import {
  Counter
} from "../models.mjs"

const SERVER_URL = "http://localhost:3001";

const getServices = async () => {
    try {
        const response = await fetch(getURL('api/services'));
        
        if (!response.ok) {
            throw new Error('Failed to fetch services');
        }
        
        const data = await response.json();
        
        const services = data.map(service => new Service(
            service.id,
            service.tag,
            service.name,
            service.average_time
        ));
        
        return services;
    } catch (error) {
        console.error("Error in GET Services:", error);
        throw error;
    }
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

export const selectCounter = async (counterId, employeeId) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/counters/${counterId}/select`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeId })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    console.log('Counter selected:', data);
    return data;
  } catch(error) {
    console.error("Error selecting counter:", error);
    throw error;
  }
}

export const releaseCounter = async (counterId, employeeId) => {
  try {
    const response = await fetch(`${SERVER_URL}/api/counters/${counterId}/release`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeId })
    });
    
    await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    console.log('Counter released:', data);
    return;
  } catch(error) {
    console.error("Error releasing counter:", error);
    throw error;
  }
}

const API = { getServices, addCustomerToQueue, getNextTicket, getCounters, selectCounter, releaseCounter }; 
export default API
