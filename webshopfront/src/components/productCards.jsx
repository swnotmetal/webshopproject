/* eslint-disable react/prop-types */
import {  useContext} from "react";
import { 
  Card, 
  CardContent, 
  Typography, 
 
  Button, 


} from '@mui/material';

import { ShopContext } from "../context/cart-context";

const ProductCards = ({ products }) => {


  const { addToCart, cartItems, removeFromCart  } = useContext(ShopContext);
  
  const cartItemCount = cartItems[products.id] || 0;



  return (
    <Card sx={{ boxShadow: 'none',
                backgroundColor: 'transparent',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
                borderRadius: '15px',

     }}>
      <CardContent>
      <img src={products.image_url} alt={products.name} style={{ width: '100%', height: 'auto' }} />
        <Typography variant="h5" component="div" gutterBottom color="primary">
          {products?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Production Date:</strong> {products?.production_date}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Expiration Date:</strong> {products?.expiry_date}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Price Per Item:</strong> {products?.price + "€"}
        </Typography>
        
        <Button 
          className="addToCartBttn" 
          onClick={() => addToCart(products?.id)}
          variant="contained" 
          color="primary"
        >
          Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
        </Button>
        {cartItemCount > 0 && (
          <Button 
            onClick={() => removeFromCart(products?.id)} 
            variant="outlined" 
            color="secondary" 
            sx={{ ml: 1 }}
          >
            Remove
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCards;