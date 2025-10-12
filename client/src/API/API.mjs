import dayjs from "dayjs";
import { Service } from "../models.mjs"
import { getURL } from "../utils/utils.mjs";

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

const API = { getServices, addCustomerToQueue }
export default API;

//SERVICES
/*
export const getServices = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/api/services`, {
            method: 'GET',
        });
        
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }
        const services = data.map(service => new Service(
          service.id, 
          service.name,
          service.tag, 
          service.average_time
        ));
        console.log(services);
        return services;
  } 
  catch(error) {
      console.error("Error in GET Services");
      return [];
  }
}
*/