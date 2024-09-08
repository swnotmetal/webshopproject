import  { useState, useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { 
  Paper, TextField, Button, Typography, Select, MenuItem, 
  FormControl, InputLabel, Divider, Box 
} from '@mui/material';
import { ShopContext } from '../context/cart-context';
import { OrderContext } from '../context/order-context';
import OrderDetails from './OderDetails'

const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, 'First Name must be longer than 2 characters')
    .max(25, 'First Name is too long!')
    .required('First Name is required'),
  lastName: yup
    .string()
    .min(2, 'Last Name must be longer than 2 characters')
    .max(25, 'Last Name is too long!')
    .required('Last Name is required'),
  companyName: yup 
    .string()
    .min(2, 'Company Name must be longer than 2 characters')
    .max(25, 'Company Name is too long!'),
  address: yup
    .string()
    .min(5, 'Address must be longer than 5 characters')
    .max(50, 'Address is too long!')
    .required('Address is required'),
  postCode: yup
    .string()
    .min(5, 'Post Code must be longer than 5 characters')
    .max(10, 'Post Code is too long!')
    .required('Post Code is required'),
  city: yup
    .string()
    .min(2, 'City must be longer than 2 characters')
    .max(25, 'City is too long!')
    .required('City is required'),
  country: yup
    .string()
    .min(2, 'Country must be longer than 2 characters')
    .max(25, 'Country is too long!')
    .required('Country is required'),   
  email: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  phone: yup
    .string()
    .min(5, 'Phone must be longer than 5 characters')
    .max(25, 'Phone is too long!')
    .required('Phone is required'),
});

const countries = [
  {country: "Finland", cities: ["Helsinki", "Turku", "Tampere", "Oulu"]},
  {country: "Sweden", cities: ["Stockholm", "Gothenburg", "Malmö", "Uppsala"]},
  {country: "Norway", cities: ["Oslo", "Bergen", "Stavanger", "Trondheim"]},
  {country: "Denmark", cities: ["Copenhagen", "Aarhus", "Odense", "Aalborg"]},
  {country: "Estonia", cities: ["Tallinn", "Tartu", "Narva", "Pärnu"]},
];

const ShoppingCartPage = () => {
  const { cartItems, clearCart } = useContext(ShopContext);
  const { addOrder } = useContext(OrderContext);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);


  const navigate = useNavigate();

  const handleCountryChange = (setFieldValue) => (event) => {
    const country = event.target.value;
    setSelectedCountry(country);
    setFieldValue('country', country);
    const countryInfo = countries.find((c) => c.country === country);
    setCities(countryInfo ? countryInfo.cities : []);
    setFieldValue('city', '');
  };

  const handleCheckout = (values) => {
    console.log('Checkout values:', values);
    const orderId = Math.floor(Math.random() * 1000000);
    const orderDetail = {
      id: orderId,
      customer: values,
      items: cartItems,
      totalAmount: totalAmount,
    };

    console.log(orderDetail, "orderDetail");
    addOrder(orderDetail);
    clearCart();
    navigate("/confirmation");
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: 'auto', borderRadius: '10px'}}>
      <Typography variant="h5" component="h3">Shopping Cart</Typography>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Customer Information</Typography>
        <Formik
          initialValues={{ 
            firstName: '', lastName: '', companyName: '', address: '', 
            postCode: '', city: '', country: '', email: '', phone: '' 
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log('Form Submitted:', values);
            handleCheckout(values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Field
                as={TextField}
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                variant="outlined"
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                sx={{ mb: 2 }}
              />
              <Field
                as={TextField}
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ mb: 2 }}
              />
              <Field
                as={TextField}
                fullWidth
                id="companyName"
                name="companyName"
                label="Company Name (optional)"
                variant="outlined"
                error={touched.companyName && Boolean(errors.companyName)}
                helperText={touched.companyName && errors.companyName}
                sx={{ mb: 2 }}
              />
              <Field
                as={TextField}
                fullWidth
                id="address"
                name="address"
                label="Address"
                variant="outlined"
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id="country-label">Country</InputLabel>
                <Field
                  as={Select}
                  labelId="country-label"
                  id="country"
                  name="country"
                  label="Country"
                  onChange={(e) => {
                    handleChange(e);
                    handleCountryChange(setFieldValue)(e);
                  }}
                  error={touched.country && Boolean(errors.country)}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.country} value={country.country}>
                      {country.country}
                    </MenuItem>
                  ))}
                </Field>
                {touched.country && errors.country && (
                  <Typography variant="body2" color="error">
                    {errors.country}
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id="city-label">City</InputLabel>
                <Field
                  as={Select}
                  labelId="city-label"
                  id="city"
                  name="city"
                  label="City"
                  error={touched.city && Boolean(errors.city)}
                  disabled={!selectedCountry}
                >
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Field>
                {touched.city && errors.city && (
                  <Typography variant="body2" color="error">
                    {errors.city}
                  </Typography>
                )}
              </FormControl>
              <Field
                as={TextField}
                fullWidth
                id="postCode"
                name="postCode"
                label="Post Code"
                variant="outlined"
                error={touched.postCode && Boolean(errors.postCode)}
                helperText={touched.postCode && errors.postCode}
                sx={{ mb: 2 }}
              />
              <Field
                as={TextField}
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ mb: 2 }}
              />
              <Field
                as={TextField}
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
                variant="outlined"
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                sx={{ mb: 2 }}
              />

              <OrderDetails cartItems={cartItems} setTotalAmount={setTotalAmount} />
              
              <Box sx={{ mt: 3 }}>
                <Button 
                  color='primary' 
                  variant='contained' 
                  fullWidth 
                  type='submit'
                  disabled={isSubmitting}
                >
                  Proceed to Checkout
                </Button>
              </Box>

              {/* Debugging: Display form values and errors */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Form Values (Debug):</Typography>
                <pre>{JSON.stringify(values, null, 2)}</pre>
                <Typography variant="h6">Form Errors (Debug):</Typography>
                <pre>{JSON.stringify(errors, null, 2)}</pre>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ mt: 3 }}>
        <Button 
          color='secondary' 
          variant='contained' 
          fullWidth 
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
      </Box>
    </Paper>
  );
};

export default ShoppingCartPage;