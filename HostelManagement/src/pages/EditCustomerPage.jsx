import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const EditCustomerPage = () => {
    const { id } = useParams();
    const history = useHistory();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        axios.get(`/api/customers/${id}`)
            .then(response => setCustomer(response.data.customer))
            .catch(error => console.error(error));
    }, [id]);

    return (
        <div>
            <h2>Edit Customer</h2>
            {customer ? <CustomerForm customer={customer} onSuccess={() => history.push('/customers')} /> : <p>Loading...</p>}
        </div>
    );
};

export default EditCustomerPage;
