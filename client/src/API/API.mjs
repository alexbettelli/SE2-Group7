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
export default API