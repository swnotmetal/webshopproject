import {Box, Typography, IconButton} from '@mui/material';
import {Link} from 'react-router-dom';
import {Login} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', p: 2, mt: 'auto' }}>
      <Typography variant="body2" color="inherit" align="center">
        {'© '}
        {new Date().getFullYear()}
        {' Shuang Wu/HeiTuan TMI@2024  All Rights Reserved.'}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
        <IconButton color="inherit" component={Link} to="/login">
          <Login />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
