import React from 'react';
import { useEffect, useState } from 'react';
import { ServicesList } from '../components/ServicesList';
import '../style/Customer.css';


function CustomerPage(props) {
  const { services } = props;
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="customer-container">
      <ServicesList services={services} setSelectedService={setSelectedService}/>
    </div>
  );
}

export { CustomerPage };
