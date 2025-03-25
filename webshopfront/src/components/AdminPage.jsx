// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useContext, useEffect } from 'react';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { OrderContext } from '../context/order-context';
import { Link } from 'react-router-dom';

const AdminPage = () => {
    const { orders } = useContext(OrderContext);


    useEffect(() => {
        console.log('Orders:', orders);
    }, [orders]);

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Admin Page
            </Typography>

            <Box>
                <Typography variant="h6" component="h2" gutterBottom>
                    Manage Orders
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell>Items</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                    <Link to={`/orders/${order.id}`}>
                                            {order.id}
                                        </Link>
                                        </TableCell>
                                    <TableCell>
                                        {order.customer.city}, {order.customer.postCode}
                                    </TableCell>
                                    <TableCell>{Object.keys(order.items).map(key => order.items[key].name).join(', ')}</TableCell>
                                    <TableCell>{order.totalAmount.toFixed(2)}€</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
};

export default AdminPage;