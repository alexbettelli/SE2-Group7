import React, { useState } from 'react';
import '../style/ServicesList.css';


function ServicesList(props) {
    const { services } = props;
    const [selectedService, setSelectedService] = useState(null);

    return (
        <div className="services-list-container">
            <h2 className="services-list-title">Select the service</h2>
            
            {!services || services.length === 0 ? (
                <p className="no-services">No services available at the moment.</p>
            ) : (
                <div className="services-grid">
                    {services.map((service) => (
                        <div 
                            key={service.id} 
                            className={`service-card ${selectedService?.id === service.id ? 'selected' : ''}`}
                            onClick={() => {
                                props.addCustomerToQueue(service);
                                setSelectedService(service);
                            }}
                        >
                            <div className="service-tag">{service.tag}</div>
                            <h3 className="service-name">{service.name}</h3>
                            <div className="service-time">
                                <i className="bi bi-clock"></i>
                                <span>{service.average_time} min</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export { ServicesList }