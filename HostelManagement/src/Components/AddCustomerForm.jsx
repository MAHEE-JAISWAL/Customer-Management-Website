import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddCustomerForm.css';

const AddCustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    aadharCardNo: '',
    gender: '',
    entryDate: '',
    leavingDate: '',
    roomNo: ''
  });
  const [availableRooms, setAvailableRooms] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/customer/availableRooms');
        setAvailableRooms(response.data.availableRooms);
      } catch (error) {
        console.error('Error fetching available rooms:', error);
      }
    };

    fetchAvailableRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/customer/addCustomer', formData);
      setMessage(response.data.message);
      setFormData({
        name: '',
        phoneNo: '',
        aadharCardNo: '',
        gender: '',
        entryDate: '',
        leavingDate: '',
        roomNo: ''
      });
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="add-customer-form">
      <h2 id='addnew'>Add New Customer</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Aadhar Card Number:
          <input
            type="text"
            name="aadharCardNo"
            value={formData.aadharCardNo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Entry Date:
          <input
            type="date"
            name="entryDate"
            value={formData.entryDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Leaving Date:
          <input
            type="date"
            name="leavingDate"
            value={formData.leavingDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Room Number:
          <select name="roomNo" value={formData.roomNo} onChange={handleChange} required>
            <option value="">Select Room</option>
            {availableRooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};

export default AddCustomerForm;
