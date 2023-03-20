import React, { useState }  from 'react';


import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, Container, Grid, TextField, Typography, AppBar, Toolbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import Box from '@mui/material/Box';

import Select,{ SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import parseISO from 'date-fns/parseISO'
import {format} from "date-fns";

import {appName} from './Globals.js';

import {get,post} from '../utils/requests'

import "../css/styles.css";
import {useEffect} from "react";

var publicPath=process.env.PUBLIC_URL;
var logoPath= '/assets/images/guestBg.jpg';

/*<---- disable back button of browser ---->*/
// window.history.pushState(null, null, window.location.href);
// window.onpopstate = function () {
    // window.history.go(1);
// };

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
  const [labelsData, setlabelsData] = useState([
							   {  id: 0, value: "Add new" },
								{ id: 1, value: "Study" },
								{ id: 2, value: "Meetings" }
  ]);
    const [selectedLabel, setSelectedLabel] = useState('Add new');
    const [selectedLabelID, setSelectedLabelID] = useState('0');


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
  
 


  
  const handleHomeClick = () => {
	window.history.replaceState(null, null, "/"); //Clear history
    navigate('/forgetNot');
  };

  const handleConfirmClick = () => {
	 alert("Taking you to signup page....");
     navigate('/signup',true);

  };
  const handleCancelClick = () => {
	  if (window.confirm('Are you sure you do not want to attend this event?')) 
	  {
		window.history.replaceState(null, null, "/"); //Clear history
     	 navigate('/forgetNot',true);
	  } 
   
  };
 
  
  
  

  const textOnchange = (event) =>{
      console.log(event)
      const name = event.target.name;
      const value = event.target.value;
      setData({...data,[name] : value})
  }

  return (
    <ThemeProvider theme={theme}>
	  <Box
          component="main"
          sx={{
            /*backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',*/
			backgroundImage: `url(${publicPath+logoPath})`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
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
			
			{/*<IconButton color="inherit" onClick={handleLogoutClick}>
			<LogoutOutlinedIcon fontSize="large"/>
        </IconButton>*/}
			
  </Toolbar>
</AppBar>
      <ProfileContainer maxWidth="sm" sx={{ textAlign: 'center', backgroundColor: 'white', opacity: '1' }}>
		
		{/* <ProfileAvatar src="/path/to/user/photo.jpg" alt="User's profile photo" />*/}
		<AccountCircleOutlinedIcon fontSize="large"/>
        <Typography variant="h4" gutterBottom fontFamily="Baskerville" sx={{ fontWeight: 600, mb: 2, fontSize: '2rem', color: 'cobalt'}}>
          Event details
        </Typography>
		
        <ProfileForm >
          <Grid container spacing={2}>
		   <Grid item xs={12} sm={12}>
			<TextField fullWidth id="host" label="Hosted by" name="host" value={data.firstName+" " +data.lastName} 
			onChange={textOnchange} InputProps={{readOnly: true}} fullWidth
		/>
			
            </Grid>
            <Grid item xs={12} sm={12}>
			<TextField fullWidth id="title" label="Title" name="firstName" value={data.firstName} 
			onChange={textOnchange} InputProps={{readOnly: true}} fullWidth
		/>
			
            </Grid>
			
			 <br/><Grid item xs={12} sm={6}>
              <TextField fullWidth id="startDate" label="Start Date" name="lastName" value={data.lastName} onChange={textOnchange} 
			  InputProps={{readOnly: true}} />
			
            </Grid>
			<Grid item xs={12} sm={6}>
              <TextField fullWidth id="endDate" label="End Date" name="lastName" value={data.lastName} onChange={textOnchange} 
			  InputProps={{readOnly: true}} />
			
            </Grid>
           
          
         
          </Grid>
		   <Grid item xs={12} sm={6}>
              <TextField fullWidth id="info" label="More Information" name="email" value={data.email} 
			  onChange={textOnchange} InputProps={{readOnly: true}} 
			  sx={{width: { sm: 200, md: 550 }, "& .MuiInputBase-root": {height: 150}}} multiline = {true} />
              
            </Grid>
			<br/>
		   <Grid item xs={12} sm={6}>
			 <Button id="edit" variant="contained" color="primary" onClick={handleConfirmClick} >
				CONFIRM
 		 </Button>
		  <Button id="edit" sx={{ m: 2 }} variant="contained" color="primary" onClick={handleCancelClick} >
				CANCEL
 		 </Button> 
		  </Grid>
         <div>
		 
 		
		</div>
	
		
	
		<br/>
        </ProfileForm>
		
      </ProfileContainer>
	  </Box>
    </ThemeProvider>
  );


}
export default MyProfile;

