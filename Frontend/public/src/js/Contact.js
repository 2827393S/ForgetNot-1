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

var publicPath=process.env.PUBLIC_URL;
var logoPath= '/assets/images/background.jpg';

const theme = createTheme();

function ContactUsPage() {
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
            Contact Us
          </Typography>

          <Box sx={{ mt: 4 }}>
            <TextField
              required
              id="name"
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              sx={{
                '&:hover': {
                  backgroundColor: 'white',
                }
              }}
            />
            <TextField
              required
              id="email"
              label="Email"
              variant="outlined"
              margin="normal"
              fullWidth
              sx={{
                '&:hover': {
                  backgroundColor: 'white',
                }
              }}
            />
            <TextField
              required
              id="message"
              label="Message"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              fullWidth
              sx={{
                '&:hover': {
                  backgroundColor: 'white',
                }
              }}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, backgroundColor: 'black', '&:hover': { backgroundColor: 'transparent' } }}
            >
              Send
            </Button>
          </Box>

          <Typography component="p" variant="body1" align="center" fontFamily="Baskerville" sx={{ fontWeight: 600, mt: 4, color: 'cobalt', opacity: 0.8,'&:hover': {
      textDecoration: 'none',
      cursor: 'pointer',} }}>
            <Link onClick={() => navigate('/', false)}>Back to Home</Link>
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default ContactUsPage;


