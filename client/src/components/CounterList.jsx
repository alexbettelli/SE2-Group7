function CounterList({ counters, setSelectedCounter }) {
  return (
    <div className="employee-container">
      <h2 className="employee-title">Counters</h2>
      
      {!counters || counters.length === 0 ? (
        <p className="no-counters">No counters available.</p>
      ) : (
        <div className="counters-grid">
          {counters.map(counter => (
            <div key={counter.id} className="counter-card" onClick={() => setSelectedCounter(counter)}>
              <div className="counter-number">{counter.number}</div>
              <h3 className="counter-service">{counter.service_name} ({counter.service_tag})</h3>
              <div className={`counter-status ${counter.is_busy ? 'busy' : 'available'}`}>
                <i className="bi bi-circle-fill"></i>
                <span>{counter.is_busy ? "Busy" : "Available"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { CounterList };