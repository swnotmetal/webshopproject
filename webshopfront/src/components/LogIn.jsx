
import { Formik, Form,  } from 'formik';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { Paper, TextField, Button, Typography } from '@mui/material'

const validationSchema = yup.object().shape({

  username: yup
    .string()
    .min(5, 'Username must be longer than 5 characters')
    .max(25, 'Username is too long!')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be longer than 8 characters')
    .max(30, 'Password is too long!')
    .required('Password is required'),
});


const LoginPage = () => {
  const navitage = useNavigate();

  return (
    <Paper elevation={3} style={ {padding: '20px', maxWidth: '400px', margin: '20 px auto', borderRadius:'10px'}}>
      <Typography variant="h5" component="h3"> Admin Log In</Typography>
      <br />
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
          navitage('/admin');
        }}
      >
      {({ errors, touched, handleChange, handleBlur }) => (  
        <Form>
          <div style={{marginBottom: '20px'}}>
            <TextField
               fullWidth
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username && Boolean( touched.username)}
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