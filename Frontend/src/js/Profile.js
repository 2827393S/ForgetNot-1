import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, Container, Grid, TextField, Typography, AppBar, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import {appName} from './Globals.js';

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
  const navigate = useNavigate();

  const handleSave = (event) => {
    event.preventDefault();
    // Handle saving user info and photo here
  };

  const handleCancel = () => {
   // handle cancel button
  };

  const handleEdit = (event) => {
    const input = event.target.previousSibling;
    input.disabled = false;
    input.focus();
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
    <Button color="inherit" onClick={handleHomeClick}>
      Back to Home
    </Button>
    <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '2rem'}} style={{ paddingRight: '45px', marginLeft: 'auto', marginRight: 'auto' }}>{appName}
    </Typography>
    <Button color="inherit" onClick={handleLogoutClick}>
      Logout
    </Button>
  </Toolbar>
</AppBar>
      <ProfileContainer maxWidth="sm" sx={{ textAlign: 'center' }}>
        <ProfileAvatar src="/path/to/user/photo.jpg" alt="User's profile photo" />
        <Typography variant="h4" gutterBottom fontFamily="Baskerville" sx={{ fontWeight: 600, mb: 2, fontSize: '2rem', color: 'cobalt'}}>
          My Profile
        </Typography>
        <ProfileForm onSubmit={handleSave}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth id="username" label="Username" defaultValue="johndoe" disabled/>
              <Button variant="outlined" color="primary" fullWidth onClick={handleEdit}>
                Edit
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth id="email" label="Email" defaultValue="johndoe@example.com" disabled/>
              <Button variant="outlined" color="primary" fullWidth onClick={handleEdit}>
                Edit
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth id="sex" label="Sex" defaultValue="Male" disabled/>
              <Button variant="outlined" color="primary" fullWidth onClick={handleEdit}>
                Edit
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth id="dob" label="Date of Birth" defaultValue="1990-01-01" disabled/>
              <Button variant="outlined" color="primary" fullWidth onClick={handleEdit}>
                Edit
              </Button>
            </Grid>
          </Grid>
         <div>
 		 <Button variant="contained" color="primary" fullWidth>
   		 Save
 		 </Button>
 		 <Button variant="outlined" color="secondary" onClick={handleCancel} fullWidth style={{ borderColor: 'red', color: 'red', marginTop: '16px' }}>
  	 	 Cancel
  		</Button>
	</div>
        </ProfileForm>
      </ProfileContainer>
    </ThemeProvider>
  );
}
export default MyProfile;