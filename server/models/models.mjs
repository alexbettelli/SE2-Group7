function Service(id, tag, name, average_time){
    this.id = id;
    this.tag = tag;
    this.name = name;
    this.average_time = average_time;
}
// TODO should we allow multiple services per counter?
function Counter(id, number, service_id, service_tag, service_name, is_busy) {
  this.id = id;
  this.number = number;
  this.service_id = service_id;
  this.service_tag = service_tag;
  this.service_name = service_name;
  this.is_busy = is_busy || false;
}
function Queues(){
    this.queues = new Map;

    this.inizializeQueues = (servicesInfo) =>{ //servicesInfo: array of { serviceID, avgServiceTime }
        this.queues.clear();

        servicesInfo.forEach(service => {
            this.queues.set(
                service.serviceID, 
                {
                    avgServiceTime: service.avgServiceTime,
                    tickets: []
                }
            );
        });
    }

    this.addTicket = (serviceID, customerID, ticketID) => {
        const serviceQueue = this.queues.get(serviceID);
        if (!serviceQueue) throw new Error(`Service ${serviceID} not found`);
        serviceQueue.tickets.push({ customerID, ticketID });
        console.log(this.queues);
    }

    this.getNextTicket = (serviceIDs)=> {
        let selectedService = null;
        let maxLength = -1;

        for (const serviceID of serviceIDs) {
            const serviceQueue = this.queues.get(serviceID);
            if (!serviceQueue) continue;

            const len = serviceQueue.tickets.length;

            if (len > maxLength) {
                selectedService = serviceID;
                maxLength = len;
            } else if (len === maxLength && len > 0) {// 2 queues have the same length
                // compute avgServiceTime and return the fastest
                if (serviceQueue.avgServiceTime < this.queues.get(selectedService).avgServiceTime) {
                    selectedService = serviceID;
                }
            }
        }

        if (!selectedService || maxLength === 0) return null;

        return this.queues.get(selectedService).tickets.shift();// {customerID, ticketID}
    }
    this.removeTicket = (customerID) => {
        if (!customerID) return;

        this.queues.forEach(serviceQueue => {
            serviceQueue.tickets = serviceQueue.tickets.filter(
                ticket => ticket.customerID !== customerID
            );
        });

        console.log(`Removed tickets for socket ${customerID}`);
        console.log(this.queues);
    }
}

export { Service, Counter, Queues }