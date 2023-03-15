import * as React from 'react';
//import ReactDOM from 'react-dom/client';
import { useNavigate } from 'react-router-dom';
 


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Input, InputAdornment} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';


import axios from "axios"
import {get,post} from '../utils/requests'



import {root} from '../index.js';
import SignIn from '../js/SignIn.js';
import {appName} from '../js/Globals.js';

import Schedule from '../js/Schedule.js';

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

export default function SignUp() {
	 const navigate = useNavigate();
	 
	  const [userGender, setGender] = React.useState('nil');

	 
	  const handleChange = (event: SelectChangeEvent) => {
			setGender(event.target.value);
  };
  
  
  

/* Handle signup button click */

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
	const userFname = data.get('firstName');
	const userLname = data.get('lastName');
	const userBday = data.get('birthday');
	//const userGender = data.get('gender');
	const userEmail = data.get('email');
    const userPassword = data.get('password');
    console.log({
	  firstName: userFname,
	  lastName: userLname,
      email: userEmail,
      password: userPassword,
	  birthday: userBday,
	  gender: userGender,
	  
    });
	
	

	  // Proceed if all the fields are entered. Otherwise, display an alert to the user */
	  if(userFname.length!=0 && userLname.length!=0 && userBday.length!=0 && userGender!='nil' && userEmail.length!=0 && userPassword!=0)
		{
				
			const requests_data = {
				  'firstName':userFname,
				  'lastName':userLname,
				  'birthday':userBday,
				  'gender':userGender,
				  'email':userEmail,
				  'password':userPassword
			  }
			  
			  post('api/register/', requests_data) // POST data to webserver
				  .then(function (res){
					 
					console.log("Response: "+res);

					// If the response code is 200, signup is successful. Proceed to SignIn page. Otherwise, display an alert to the user
					  if(res.status === 200){
						  navigate("/signin",false)
					  }else{
						  alert("Sign Up failed, please try again !");
					  }
				  })
				  .catch(function (res){
					  console.log("Error : "+res)
					  alert("Sign Up failed, please try again !");

				  })
			
		}else{
			alert("Please fill all the fields !");
		}
  

  };


  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
		  
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
		  
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
			
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
			  
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
			  
			 <Grid item xs={12} sm={6}>
				<TextField
				 required
				 fullWidth
				 id="birthday"
				 label="Date of Birth"
					name="birthday"
					/>
					</Grid>
					
			<Grid item xs={12} sm={6}>
				{/* <TextField
                  required
                  fullWidth
                  id="gender"
                  label="Sex"
                  name="gender"
                /> */}
				
				<Select required fullWidth value={userGender} label="gender" onChange={handleChange}>
					  <MenuItem value={'nil'}>Gender</MenuItem>
					  <MenuItem value={'male'}>Male</MenuItem>
					  <MenuItem value={'female'}>Female</MenuItem>

				</Select>
              </Grid>
			  
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
			  
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
             
            </Grid>
			
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
			
            <Grid container justify Content="flex-end">
              <Grid item>
                <Link onClick={() => navigate('/signin', false)} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
			
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}