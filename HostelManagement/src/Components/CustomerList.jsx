import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import './CustomerList.css'; // Import the CSS file

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingCustomer, setEditingCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/customer/getAllCustomers");
        setCustomers(response.data.customers);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/customer/deleteCustomer/${id}`);
      setCustomers(customers.filter(customer => customer._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom id="Custlist">
        Customer List
      </Typography>
      {editingCustomer && (
        <EditCustomerForm customer={editingCustomer} setEditingCustomer={setEditingCustomer} setCustomers={setCustomers} />
      )}
      {customers.length === 0 ? (
        <Typography>No customers found</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell class="tbcell">Name</TableCell>
                <TableCell class="tbcell">Phone Number</TableCell>
                <TableCell class="tbcell">Aadhar Card No</TableCell>
                <TableCell class="tbcell">Gender</TableCell>
                <TableCell class="tbcell">Entry Date</TableCell>
                <TableCell class="tbcell">Leaving Date</TableCell>
                <TableCell class="tbcell">Room No</TableCell>
                <TableCell class="tbcell">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map(customer => (
                <TableRow key={customer._id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.phoneNo}</TableCell>
                  <TableCell>{customer.aadharCardNo}</TableCell>
                  <TableCell>{customer.gender}</TableCell>
                  <TableCell>{customer.entryDate}</TableCell>
                  <TableCell>{customer.leavingDate}</TableCell>
                  <TableCell>{customer.roomNo}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(customer)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(customer._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

const EditCustomerForm = ({ customer, setEditingCustomer, setCustomers }) => {
  const [formData, setFormData] = useState({ ...customer });
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/customer/availableRooms");
        setAvailableRooms(response.data.availableRooms);
      } catch (error) {
        console.error("Error fetching available rooms:", error);
      }
    };

    fetchAvailableRooms();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/customer/updateCustomer/${customer._id}`, formData);
      setCustomers(prevCustomers =>
        prevCustomers.map(c => (c._id === customer._id ? response.data.customer : c))
      );
      setEditingCustomer(null);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <form className="edit-customer-form" onSubmit={handleSubmit}>
      <Typography variant="h5" component="h3" gutterBottom>
        Edit Customer
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        name="phoneNo"
        value={formData.phoneNo}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        label="Aadhar Card No"
        name="aadharCardNo"
        value={formData.aadharCardNo}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </TextField>
      <TextField
        label="Entry Date"
        name="entryDate"
        type="date"
        value={formData.entryDate}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Leaving Date"
        name="leavingDate"
        type="date"
        value={formData.leavingDate}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        select
        label="Room No"
        name="roomNo"
        value={formData.roomNo}
        onChange={handleChange}
        required
        fullWidth
        margin="normal"
      >
        {availableRooms.map(room => (
          <MenuItem key={room} value={room}>{room}</MenuItem>
        ))}
      </TextField>
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Update
      </Button>
      <Button variant="contained" color="secondary" onClick={() => setEditingCustomer(null)} fullWidth>
        Cancel
      </Button>
    </form>
  );
};

export default CustomerList;
