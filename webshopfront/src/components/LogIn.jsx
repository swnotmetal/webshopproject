/* eslint-disable no-unused-vars */
import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography } from '@mui/material';
import { gql, useMutation } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      username
      token
    }
  }
`;

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(25).required(),
  password: yup.string().min(6).max(30).required(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_MUTATION);

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: '20px auto', borderRadius: '10px' }}>
      <Typography variant="h5" component="h3">Admin Log In</Typography>
      <br />
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          try {
            const { data } = await login({ variables: values });
            localStorage.setItem('token', data.login.token);
            navigate('/admin');
          } catch (error) {
            console.error('Login failed:', error);
            alert('Invalid username or password');
          }
        }}
      >
        {({ errors, touched, handleChange, handleBlur }) => (
          <Form>
            <div style={{ marginBottom: '20px' }}>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username && Boolean(touched.username)}
                helperText={errors.username && touched.username && errors.username}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </div>
            <Button color="secondary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default LoginPage;