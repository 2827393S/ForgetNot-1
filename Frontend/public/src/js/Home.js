import * as React from 'react';
import { useNavigate } from "react-router-dom";

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import CakeIcon from '@mui/icons-material/Cake';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';


import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import {get,post} from '../utils/requests'

//import { mainListItems } from './labelItems';

import {appName} from './Globals.js';
import Schedule from './Schedule.js';
import {useEffect} from "react";

const settings = ['Home', 'My Profile', 'Logout'];

const labelId=window.localStorage.getItem( 'labelId');
const publicPath=process.env.PUBLIC_URL;
const logoPath= '/assets/images/background.jpg';


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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();



function DashboardContent() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const [label_data,setLabelData] = React.useState([]);
    const [now_label_id,setNowLabelId] = React.useState(0);
    const toggleDrawer = () => {setOpen(!open);};
  
    {/* <--- User icon on top right & corresponding listview ---> */}
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    useEffect(()=> {
        window.localStorage.setItem( 'labelId', '2' );
        get('api/label/get/',{})
            .then(function (res){
                setLabelData(res.data)
                setNowLabelId(res.data[0].id)
            })
    },[])


    const handleLabelData = (event) => {
        setLabelData(event.currentTarget);
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


  const filterEvents = value => () => {
	alert("Clicked label: "+value);
	window.localStorage.setItem( 'labelId', value );
	navigate(0);

  };


    function displayListItemButton(props){
        return (
		
/*             <ListItemButton key={props.id} onClick={() => setNowLabelId(props.id)} sx={{ backgroundColor: labelId===props.id?"#d1e18960":"" }}> 
 */               

	<ListItemButton key={props.id} onClick={filterEvents(props.id)} sx={{ backgroundColor: labelId===props.id?"#d1e18960":"" }}>

				<ListItemIcon>
                    <ModeOfTravelIcon />
                </ListItemIcon>
                <ListItemText primary={props.name} />
            </ListItemButton>
        )
    }


    return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
            {appName}
            </Typography>

              {/* <--- Notifications ---> */}

            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* <--- Messages ---> */}
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <EmailIcon />
              </Badge>
            </IconButton>

            {/* <--- Users logo and List view ---> */}
            <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={setting === 'My Profile' ? () => navigate('/profile', false) : handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
             {/*<--- Birthdays ---> 
            <ListItemButton onClick={() => setNowLabelId(1)}  sx={{ backgroundColor: labelId===1?"#ffa07a60":""}}>
                <ListItemIcon>
                    <CakeIcon />
                </ListItemIcon>
                <ListItemText primary="Birthdays" />
            </ListItemButton>*/}

              {/* <--- Meetings ---> 
            <ListItemButton onClick={() => setNowLabelId(2)} sx={{ backgroundColor: labelId===2?"#90ee9060":"" }}>
                <ListItemIcon>
                    <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="Meetings" />
            </ListItemButton>*/}


              {/* <--- Tasks --->
            <ListItemButton onClick={() => setNowLabelId(3)} sx={{ backgroundColor: labelId===3?"#87ceeb60":"" }}>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Tasks" />
            </ListItemButton> */}

              {/* <--- Travel ---> 
            <ListItemButton onClick={() => setNowLabelId(4)} sx={{ backgroundColor: labelId===4?"#d1e18960":"" }}>
                <ListItemIcon>
                    <ModeOfTravelIcon />
                </ListItemIcon>
                <ListItemText primary="Travel" />
			  </ListItemButton> */}
			  
			  {/* Label update */}
            
			{
                  label_data.map((value) => {
					  //alert("value: "+value.id);
                      return displayListItemButton(value)
                  })
            }

          </List>
        </Drawer>
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
          <Toolbar />
          <Container maxWidth="100vh" maxHeight="100vh" sx={{ mt: 4, mb: 4 }}>

              {/* Schedule */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Schedule label_id={now_label_id} />
                </Paper>
              </Grid>

            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    );
    }

export default function Dashboard() {
  return <DashboardContent />;
}