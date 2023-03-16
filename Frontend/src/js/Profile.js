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
import {useEffect} from "react";



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

  const [data,setData] = useState({
      "firstName":"",
      "lastName":"",
      "gender":"male",
      "birthday":"",
      "email":""
  })
  const [oldData,setOldData] = useState({
      "firstName":"",
      "lastName":"",
      "gender":"",
      "birthday":"",
      "email":""})

/* After DOM is loaded, hide cancel button */
	useEffect(() => {
        get("/api/user/get/",{})
            .then(function (res){
                let data = res.data
                setData(data)
            })
    }, []);
  
 

  const handleCancel = () => {
   // handle cancel button
   // Cancel editing
		if(active===true){
   	      setActive(!active);
		}
        setData(oldData);

  };

  const handleEdit = (event) => {

        setActive(!active);

		  if(active===false){ // Enable edit
		  	  alert("Enabling editing....!");
                setOldData(data);
				setActive(!active);
		  }else{ // Save edits
              if(data.lastName==="" || data.firstName === "" || data.birthday === "" || data.email === ""){
                  alert("have empty");
                  handleCancel();
                  return
              }
              console.log(data)
              post('/api/user/update/',data)
                  .then(function (res){
                      console.log("success")
                  })
              alert("Saving edits....!");
		  }

   
  };

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleLogoutClick = () => {
    navigate('/SignIn')
  };

  const textOnchange = (event) =>{
      const name = event.target.name
      const value = event.target.value
      setData({...data,[name] : value})
  }

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
		
		<IconButton  color="inherit" onClick={handleHomeClick}>
            <HomeIcon fontSize="large"/>
        </IconButton>
			
		<IconButton color="inherit" onClick={handleLogoutClick}>
           <LogoutOutlinedIcon fontSize="large"/>
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
              <TextField fullWidth id="firstName" label="Firstname" name="firstName" value={data.firstName} onChange={textOnchange} disabled={!active}/>
			
            </Grid>
			 <Grid item xs={12} sm={6}>
              <TextField fullWidth id="lastName" label="Lastname" name="lastName" value={data.lastName} onChange={textOnchange} disabled={!active}/>
			
            </Grid>
           
            <Grid item xs={12} sm={6}>
				<Select required fullWidth defaultValue='male' value={data.gender} name="gender" onChange={textOnchange} label="gender" disabled={!active}>
					  <MenuItem value='male' >Male</MenuItem>
					  <MenuItem value='female' >Female</MenuItem>
				</Select>
            </Grid>
            <Grid item xs={12} sm={6}>
				<TextField fullWidth id="birthday" label="Date of Birth" name="birthday" value={data.birthday} onChange={textOnchange} disabled={!active}/>
               
            </Grid>
          </Grid>
		   <Grid item xs={12} sm={6}>
              <TextField fullWidth id="email" label="Email" name="email" value={data.email} onChange={textOnchange} disabled={!active}/>
              
            </Grid>
			<br/>
         <div>
		 
 		 <Button id="edit" variant="contained" color="primary" fullWidth onClick={handleEdit} >
   		  { active ? "Save" : "Edit"}
 		 </Button>
             <Button id="cancel" variant="outlined" color="secondary" onClick={handleCancel} fullWidth style={{ borderColor: 'red', color: 'red', marginTop: '16px', display: active?'block':'none' }} >
  	 	 Cancel
  		</Button>

	</div>
        </ProfileForm>
      </ProfileContainer>
    </ThemeProvider>
  );


}
export default MyProfile;

