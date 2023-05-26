import { Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Register from './pages/Register';
import Login from './pages/login';
import axios from 'axios';
import { Link } from "react-router-dom";
import Home from './pages/Home';
import userContext from './context';
import EditProfile from './pages/EditProfile';
import AddEmployee from './pages/AddEmployee';
import GoogleHome from './pages/GoogleHome';
import EditEmployee from './pages/EditEmployee';
import Service from './pages/Service';
import Fonction from './pages/Fonction';
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import EngineeringIcon from '@mui/icons-material/Engineering';
import GroupsIcon from '@mui/icons-material/Groups';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useContext } from 'react';
import ManageFonction from './pages/ManageFonction';
import ManageService from './pages/ManageService';

axios.defaults.baseURL = "http://localhost:3030/api";
axios.defaults.withCredentials = true;

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function App() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { user, loading } = useContext(userContext);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    axios
      .post("/logout")
      .then(() => {
        window.location.reload(true);
      });
  }

  const sidebarItems = [
    {
      text: 'Profile',
      icon: <SwitchAccountIcon />,
      url: '/edit-profile',
    },
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      url: '/',
    },
    ...(user && user.admin === true
      ? [
        {
          text: 'Service',
          icon: <GroupsIcon />,
          url: '/service',
        },
      ]
      : []),
    ...(user && user.admin === true
      ? [
        {
          text: 'manage Service',
          icon: <EditNoteIcon />,
          url: '/manage-service',
        },
      ]
      : []),
    ...(user && user.admin === true
      ? [
        {
          text: 'Fonction',
          icon: <EngineeringIcon />,
          url: '/fonction',
        },
      ]
      : []),
    ...(user && user.admin === true
      ? [
        {
          text: 'manage Fonction',
          icon: <ManageAccountsIcon />,
          url: '/manage-fonction',
        },
      ]
      : []),
  ];


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            {loading === true ? "" : <>
              {user && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' }),
                  }}
                >
                  <MenuIcon />
                </IconButton>

              )}
            </>}
            <Typography variant="h6" noWrap component="div">
              Employee Management Systeme
            </Typography>
          </Toolbar>
        </AppBar>
        {loading === true ? "" :
          <>
            {user && (
              <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                  {sidebarItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        component={Link}
                        to={item.url}
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
                <Divider />
                <List>
                  {['Logout'].map((text, index) => (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        onClick={logout}
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            )}
          </>
        }
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Home />} />
            <Route path='/google' element={<GoogleHome />} />
            <Route path='/edit-profile' element={<EditProfile />} />
            <Route path='/add-employee' element={<AddEmployee />} />
            <Route path='/edit-employee/:id' element={<EditEmployee />} />
            <Route path='/service' element={<Service />} />
            <Route path='/fonction' element={<Fonction />} />
            <Route path='/manage-fonction' element={<ManageFonction />} />
            <Route path='/manage-service' element={<ManageService />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
}
