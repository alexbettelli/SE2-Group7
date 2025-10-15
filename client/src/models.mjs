import dayjs from "dayjs";

function Service(id, tag, name, average_time) {
  this.id = id;
  this.name = name;
  this.tag = tag;
  this.average_time = average_time;
}

function Counter(id, number, service_id, service_tag, service_name, is_busy) {
  this.id = id;
  this.number = number;
  this.service_id = service_id;
  this.service_tag = service_tag;
  this.service_name = service_name;
  this.is_busy = is_busy || false;
}

function Ticket(id, number, serviceTag, counterNumber, initialDate, finalDate) {
  this.id = id;
  this.number = number;
  this.serviceTag = serviceTag;
  this.counterNumber = counterNumber;
  this.initialDate = initialDate ? dayjs(initialDate).format('YYYY-MM-DD HH:mm:ss') : null;
  this.finalDate = finalDate ? dayjs(finalDate).format('YYYY-MM-DD HH:mm:ss') : null;
}
  
export { Service, Counter, Ticket };