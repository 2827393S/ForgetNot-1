import React, { useState }  from 'react';


import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, Container, Grid, TextField, Typography, AppBar, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import Box from '@mui/material/Box';
import {appName} from './Globals.js';


import axios from "axios"
import {get,post} from '../utils/requests'

import "../css/styles.css";



const theme = createTheme();

 const ProfileContainer = styled(Container)({
   display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: theme.spacing(4),
});

 const ProfileAvatar = styled(Avatar)({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
});

 const ProfileForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  '& > *': {
    marginBottom: theme.spacing(2),
  },
});


  
 const MyProfile = () => {

  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [userGender, setGender] = useState('nil');

	 
	  const handleChange = (event: SelectChangeEvent) => {
			setGender(event.target.value);
  };
  

/* After DOM is loaded, hide cancel button */
	React.useEffect(() => {
		  document.getElementById('cancel').style.visibility = 'hidden';

  }, []);
  
 

  const handleCancel = () => {
   // handle cancel button
   
   // Cancel editing
		if(active===true){
   	      setActive(!active);
		}
		  document.getElementById('cancel').style.visibility = 'hidden';


  };

  const handleEdit = (event) => {
	  
	 
		  if(active===false){ // Enable edit
		  	  alert("Enabling editing....!");
				document.getElementById('cancel').style.visibility = 'visible';
				// Toggle between edit and save
				setActive(!active);
		  }else{ // Save edits
			 alert("Saving edits....!");
			 
			 
	          const userFname =  document.getElementById('firstName').value;
	          const userLname = document.getElementById('lastName').value;
	          const userBday = document.getElementById('birthday').value;
			  const userEmail = document.getElementById('email').value;
			  console.log({
				firstName: userFname,
				lastName: userLname,
				email: userEmail,
				birthday: userBday,
				gender: userGender,
	  
				});
			 
			  // Proceed if all the fields are entered. Otherwise, display an alert to the user */
			  if(userFname.length!=0 && userLname.length!=0 && userBday.length!=0 && userGender!='nil')
				{
						
					const requests_data = {
						  'firstName':userFname,
						  'lastName':userLname,
						  'birthday':userBday,
						  'gender':userGender,
					  }
					  
					  // post('api/myprofile/', requests_data) // POST data to webserver
						  // .then(function (res){
							 
							// console.log("Response: "+res);
	
							//If the response code is 200, signup is successful. Proceed to SignIn page. Otherwise, display an alert to the user
							  // if(res.status === 200){
								  alert("Saved !");
								  document.getElementById('cancel').style.visibility = 'hidden';
								   // Toggle between edit and save
									setActive(!active);
	  
							  // }else{
								  // alert("Saving failed, please try again !");
							  // }
						  // })
						  // .catch(function (res){
							  // console.log("Error : "+res)
							  // alert("Sign Up failed, please try again !");

						  // })
					
				}else{
					alert("Please fill all the fields !");
				}
			 


		  }

   
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleLogoutClick = () => {
    // handle logging out the user
  };
  


  return (
    <ThemeProvider theme={theme}>
 <AppBar position="static">
  <Toolbar>
		<IconButton  color="inherit">
                <AccessAlarmsOutlinedIcon fontSize="large"/>
        </IconButton>
			
		<Typography
              component="h1"
			  fontFamily="Arial"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}>
            {appName}
        </Typography>
		
		<IconButton  color="inherit">
            <HomeIcon fontSize="large" onClick={handleHomeClick}/>
        </IconButton>
			
		<IconButton color="inherit">
           <LogoutOutlinedIcon fontSize="large" onClick={handleLogoutClick}/>
        </IconButton>
			
  </Toolbar>
</AppBar>
      <ProfileContainer maxWidth="sm" sx={{ textAlign: 'center' }}>
		
        <ProfileAvatar src="/path/to/user/photo.jpg" alt="User's profile photo" />
        <Typography variant="h4" gutterBottom fontFamily="Arial" sx={{ fontWeight: 600, mb: 2, fontSize: '2rem', color: 'cobalt'}}>
          My Profile
        </Typography>
		
        <ProfileForm onSubmit={handleEdit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth id="firstName" label="Firstname" defaultValue="johndoe" disabled={!active}/>
			
            </Grid>
			 <Grid item xs={12} sm={6}>
              <TextField fullWidth id="lastName" label="Lastname" defaultValue="gill" disabled={!active}/>
			
            </Grid>
           
            <Grid item xs={12} sm={6}>
				<Select required fullWidth value={userGender} label="gender" onChange={handleChange} disabled={!active}>
					  <MenuItem value={'nil'}>Gender</MenuItem>
					  <MenuItem value={'male'}>Male</MenuItem>
					  <MenuItem value={'female'}>Female</MenuItem>

				</Select>               
            </Grid>
            <Grid item xs={12} sm={6}>
				<TextField fullWidth id="birthday" label="Date of Birth" defaultValue="1990-01-01" disabled={!active}/>
               
            </Grid>
          </Grid>
		   <Grid item xs={12} sm={6}>
              <TextField fullWidth id="email" label="Email" defaultValue="johndoe@example.com" disabled={!active}/>
              
            </Grid>
			<br/>
         <div>
		 
 		 <Button id="edit" variant="contained" color="primary" fullWidth onClick={handleEdit} >
   		  { active ? "Save" : "Edit"}
 		 </Button>
 		 <Button id="cancel" variant="outlined" color="secondary" onClick={handleCancel} fullWidth style={{ borderColor: 'red', color: 'red', marginTop: '16px' }}>
  	 	 Cancel
  		</Button>

	</div>
        </ProfileForm>
      </ProfileContainer>
    </ThemeProvider>
  );


}
export default MyProfile;

