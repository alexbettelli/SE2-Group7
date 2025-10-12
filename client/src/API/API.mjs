import { 
  Service 
} from "../models.mjs"

const SERVER_URL = "http://localhost:3001";


//SERVICES
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
