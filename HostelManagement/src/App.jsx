// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Home from './pages/Home';
import CustomerList from './Components/CustomerList';
import AddCustomerForm from './Components/AddCustomerForm';
import AvailableRooms from './Components/AvailaibleRooms.jsx';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/customer-details" element={<CustomerList />} />
            <Route path="/add-customer" element={<AddCustomerForm />} />
            <Route path='/available-rooms' element={<AvailableRooms />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
