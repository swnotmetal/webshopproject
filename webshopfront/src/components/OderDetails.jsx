/* eslint-disable react/prop-types */
import { useEffect, useState} from 'react';
import snacksData from "../snacks";
import { 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Box,
  Divider
} from '@mui/material';

const OrderDetails = ({cartItems, setTotalAmount }) => {
  const [totalAmount, setLocalTotalAmount] = useState(0);

  useEffect(() => {
    const total = snacksData.reduce((total, product) => {
      return total + (product.price * cartItems[product.id]);
    }, 0);
    setLocalTotalAmount(total);
  setTotalAmount(total);
  }, [cartItems, setTotalAmount]);  

  
  return (
    <Box sx={{ mt: 4, maxWidth: '100%', overflowX: 'hidden' }}>
    {totalAmount !== 0 ? (
      <>
      <Typography variant="h5" gutterBottom>
        Order Details
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {snacksData.map((product) => (
          cartItems[product.id] !== 0 && (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image_url}
                  alt={product.name}
                  sx={{ objectFit: 'contain' }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Amount: {cartItems[product.id]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: {product.price}€
                  </Typography>
                  <Typography variant="body1">
                    Total: {(product.price * cartItems[product.id]).toFixed(2)}€
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        ))}
      </Grid>
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Typography variant="h6">
          Total Order Amount: {totalAmount.toFixed(2)}€
        </Typography>
      </Box>
      </>
    ) : (
      <Typography variant="h5" gutterBottom>
        No items in the cart
      </Typography>
    )}
    </Box>
  );
};

export default OrderDetails;