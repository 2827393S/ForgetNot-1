import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useNavigate } from 'react-router-dom';

//import background from '/assets/images/background.jpg';

var publicPath=process.env.PUBLIC_URL;
var logoPath= '/assets/images/background.jpg';

const theme = createTheme();

function ButtonGroup() {
	
  const navigate = useNavigate();

  /* <--- Load signUP page ---> */
  const loadSignUp = () => {
	  
    navigate('/signup', false);
  };

  /* <--- Load signIn page ---> */
  const loadSignIn = () => {
    navigate('/signin', false);
  };

  return (
    <>
      <Button  onClick={loadSignUp}
        variant="contained"
        sx={{ mr: 2, backgroundColor: 'black', '&:hover': { backgroundColor: 'transparent' } }}
      >
        Sign Up
      </Button>

      <Button onClick={loadSignIn} 
        variant="contained"
        sx={{ ml: 2, backgroundColor: 'black', '&:hover': { backgroundColor: 'transparent' } }}
      >
        Log In
      </Button>
    </>
  );
};


function LandingPage() {

	const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        height: '100vh',
        backgroundImage: `url(${publicPath+logoPath})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        px: 4,
      }}>
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Typography component="h1" variant="h2" align="center" fontFamily="Baskerville" sx={{ fontWeight: 700, mb: 2, fontSize: '5rem', color: 'cobalt', opacity: 0.8 }}>
            Welcome to ForgetNot
          </Typography>

          <Typography component="h2" variant="h5" align="center" fontFamily="Baskerville" sx={{ fontWeight: 800, mb: 2, fontSize: '2rem', color: 'cobalt', opacity: 0.7, fontStyle: 'italic' }}>
            The easy to use online planner
          </Typography>

          <Box sx={{ mt: 4 }}>
            <ButtonGroup />
          </Box>

          <Typography component="p" variant="body1" align="center" fontFamily="Baskerville" sx={{ fontWeight: 600, mt: 4, color: 'cobalt', opacity: 0.8,'&:hover': {
      textDecoration: 'none',
      cursor: 'pointer',} }}>
  <Link onClick={() => navigate('/contact', false)}>Contact us</Link>
</Typography>


        </Box>
      </Box>
    </ThemeProvider>
  );
}


export default LandingPage;

