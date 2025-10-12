function Service(id, name, tag, average_time) {
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

export { Service, Counter }