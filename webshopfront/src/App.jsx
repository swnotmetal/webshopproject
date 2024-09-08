import { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  IconButton, 
  Box 
} from '@mui/material';
import { Home as HomeIcon, ShoppingCart } from '@mui/icons-material';
import ShopIcon from '@mui/icons-material/Shop';
import snacksData from './snacks.json';
import ProductCards from './components/productCards.jsx';
import Footer from './components/footer.jsx';
import theme from './theme/sokojussitheme.js';
import ShoppingCartPage from './components/ShoppingCartPage.jsx'
import LoginPage from './components/LogIn.jsx';
import { ShopContextProvider } from './context/cart-context.jsx';
import AdminPage from './components/AdminPage.jsx';
import { OrderContextProvider } from './context/order-context.jsx';
import ConfirmationPage from './components/ConfirmationPage.jsx';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(snacksData);
  }, []);

  const MainPage = () => (
    <>
      <Typography variant="h2" component="h1" gutterBottom align="center" color="primary">
        Snacks
      </Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: 3
      }}>
        {products.map((product) => (
          <ProductCards key={product.id} products={product} />
        ))}
      </Box>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <ShopContextProvider>
        <OrderContextProvider>
        <Router>
        <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 , fontFamily: 'Cursive'}}>
                  Kallion sydämessä
                </Typography>
                <IconButton color="inherit" component={Link} to="/">
                  <Typography variant="body1" sx={{ mr: 1, fontFamily: 'Arial' }}>
                    Shop
                  </Typography>
                  <ShopIcon />
                </IconButton>
                <IconButton color="inherit" href="https://juhacreative.fi/pikkuherkku/index.html">
                  <Typography variant="body1" sx={{ mr: 1, fontFamily: 'Arial' }}>
                    Sököjussi
                  </Typography>
                  <HomeIcon />
                </IconButton>
                <IconButton color="inherit" component={Link} to="/cart">
                  <Typography variant="body1" sx={{ mr: 1, fontFamily: 'Arial' }}>
                    Cart
                  </Typography>
                  <ShoppingCart />
                </IconButton>
              </Toolbar>
            </AppBar>
            
            <Container component="main" maxWidth="lg" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/cart" element={<ShoppingCartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
              </Routes>
            </Container>
            
            <Footer />
          </Box>
        </Router>
        </OrderContextProvider>
      </ShopContextProvider>
    </ThemeProvider>
  );
};

export default App;