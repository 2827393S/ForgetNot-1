import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios"
import {get,post} from '../utils/requests'

import Home from '../js/Home.js';
import {root} from '../index.js';

import {appName} from '../js/Globals.js';

var publicPath=process.env.PUBLIC_URL;
var logoPath="/assets/images/loginBg.JPG";

/* Copyright label */
function Copyright(props) {
	const navigate = useNavigate();
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" onClick={() => navigate('/contact', false)}>
	  {appName}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const theme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();

/* Handle SignIn button click */
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userEmail = data.get('email');
    const userPassword = data.get('password');
	
    console.log({
      email: userEmail,
      password: userPassword,
    });
 	
      const requests_data = {
          'email':userEmail,
          'password':userPassword
      }
	  
	  // If the userEmail and userPassword field are not empty, call webservice. Otherwise display an alert to the user
	  if(userEmail.length!==0 && userPassword.length!==0)
	  {
		   post('api/user/login/', requests_data)
          .then(function (res){
			  
			  // If the response code is 200 -> sign in successful, proceed to home page. Otherwise display relevant alert to the user
              if(res.status === 200){
                  navigate("/home",false)
              }else if(res.status === 401){
				  alert("User cannot be found, Please register and try again!");
			  }else
				  alert("SignIn failed,Please try again!");
          })
          .catch(function (res){
              console.log(res);
				  alert("User cannot be found, Please register and try again!");
			  
          }) 
		  
	  }else
		  alert("Please enter the registered Email address and password!");
	  
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${publicPath+logoPath})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
			 
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
			  
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}