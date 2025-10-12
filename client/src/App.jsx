import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router';

import { Layout } from './components/Layout.jsx';
import { HomePage } from './pages/Home.jsx';
import { CustomerPage } from './pages/Customer.jsx';
import { EmployeePage } from './pages/Employee.jsx';
import { PageNotFound } from './pages/NotFound.jsx';


function App() {
    const [ticket, setTicket] = useState(null);
    const [services, setServices] = useState([]);

    const navigate = useNavigate();


    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout
          />}>
            <Route index element={<HomePage 
              setServices={setServices}
              />} 
            />
            <Route path="customer" element={<CustomerPage 
              services={services}
            />} />
            <Route path="employee" element={<EmployeePage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    )
}

export default App
