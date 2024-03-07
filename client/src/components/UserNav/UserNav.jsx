import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import AuthContext from '../../store/context/AuthContext';
import InternalApiContext from '../../store/context/InternalApiContext';

import { Icon } from '@iconify/react';
import { Box,Button, Grid, Typography } from '@mui/material';

import HelsinkiLogo from '../../assets/HELSINKI_Tunnus_MUSTA_90x41.webp';


const UserNav = ({ checkUnsavedChanges, handleNavigation, destination }) => {
  const { user } = useContext(AuthContext);
  const { evaluation, setEvaluation } = useContext(InternalApiContext);
  const navigate = useNavigate();
  const location = useLocation();

  //hampurilainen
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Clear chosen evaluation : old version Navbar
  /* useEffect(() => {
    const routesToExclude = [
      '/customer-list',
      '/unit-list',
      '/contract-info',
      '/userperformance',
    ];
    const isExcludedRoute = routesToExclude.some(
      (route) => location.pathname === route
    );
    if (
      !isExcludedRoute &&
      evaluation !== null &&
      (user.role === 'teacher' || user.role === 'supervisor')
    ) {
      setEvaluation(null);
    }
  }, [location.pathname, evaluation]);
 */


  useEffect(() => {
    const routesToExclude = ['/customer-list', '/unit-list', '/contract-info', '/userperformance'];
    const isExcludedRoute = routesToExclude.some(route => location.pathname === route);
    if (!isExcludedRoute && evaluation !== null && (user.role === 'teacher' || user.role === 'supervisor')) {
      setEvaluation(null);
    }
  }, [location.pathname, evaluation, user.role, setEvaluation]);


  const handleIconClick = (destination) => {
    checkUnsavedChanges();
    handleNavigation(destination);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <main className='userNav__wrapper'>
      {/* Customer : old version Nav : (sprint11) we can save old ver.nav for a while
       change main className='userNav__wrapper' when we need to change old version
       {user && user.role === 'customer' && (
        <div className={`userNav__icons ${user.role}`}>
          <Icon
            icon='ic:outline-home'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/unit-list')
                : () => navigate('/unit-list')
            }
          />
          {/* <Icon
            icon='bx:file'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/contract-info')
                : () => navigate('/contract-info')
            }
          /> */}
          <Icon
            icon='mdi:user-outline'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/profile')
                : () => navigate('/profile')
            }
          />{' '}
        </div>
      )}  */}

      {/* Supervisor : old Nav version */}
       {/* {user && user.role === 'supervisor' && (
        <div className={`userNav__icons ${user.role}`}>
          <Icon
            icon='ic:outline-home'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/customer-list')
                : () => navigate('/customer-list')
            }
          />
          {/* {evaluation && (
            <Icon
              icon='bx:file'
              onClick={
                checkUnsavedChanges
                  ? () => handleIconClick('/contract-info')
                  : () => navigate('/contract-info')
              }
            />
          )} */}
          <Icon
            icon='mdi:user-outline'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/profile')
                : () => navigate('/profile')
            }
          />
        </div>
      )} 
 */}
      {/* Teacher : old Nav version */}
       {/* {user && user.role === 'teacher' && (
        <div className={`userNav__icons ${user.role}`}>
          <Icon
            icon='ic:outline-home'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/customer-list')
                : () => navigate('/customer-list')
            }
          />
          {/* {evaluation && (
            <Icon
              icon='bx:file'
              onClick={
                checkUnsavedChanges
                  ? () => handleIconClick('/contract-info')
                  : () => navigate('/contract-info')
              }
            />
          )} */}
          <Icon
            icon='mingcute:group-line'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/admin-menu')
                : () => navigate('/admin-menu')
            }
          />
          <Icon
            icon='mdi:user-outline'
            onClick={
              checkUnsavedChanges
                ? () => handleIconClick('/profile')
                : () => navigate('/profile')
            }
          />
        </div>
      )}  */}

      {/* for hamburger menu*/}
      <div className="mobile-menu-button" onClick={toggleMenu}>
        {/* Hamburger icon */}
        <Icon icon="ci:menu-alt-05" />
      </div>
      <div 
        className={`userNav__menu ${isMenuOpen ? 'userNav__menu--open' : ''}`}
        >
        <div className="userNav__menu__closeBtn" onClick={toggleMenu}>
          x
        </div>
        {/* Hamburger  Menu Items */}
          {/* set background color user's role */}
          <div className={`userNav__icons ${user.role}`}>
            {/* <Icon icon="ic:outline-home" color="black" onClick={() => navigate('/unit-list')}/>
                <Icon icon="bx:file" color='black' onClick={() => navigate('/contract-info')}/>
                <Icon icon="mdi:user-outline" color='black' onClick={() => navigate('/profile')}/>
            */}
            <Box  sx={{ height: '20vh', marginTop: '50px' }}>
            <img src={HelsinkiLogo} alt="" />
            <h1>OsTu</h1>
            </Box>
            { user&&user.role === 'teacher' && (
              <>
                <Typography 
                  sx={{ fontWeight: '600' }}
                  >Tutkinnot
                </Typography>
                <Typography
                  sx={{ fontWeight: '600' }}
                  >
                  Työpaikat
                </Typography>
                <Typography
                  sx={{ fontWeight: '600' }}
                  >
                  + Luo uusi sopimus
                </Typography>
                <Typography
                  sx={{ fontWeight: '600' }}
                  >
                  Asiakkuudet
                </Typography>
                <Typography
                  sx={{ fontWeight: '600' }}
                  >
                  Opettajat
                </Typography>
                </>
              )}
            <Typography 
            sx={{ fontWeight: '600' }}
            onClick={()=>navigate('/profile')}
            >Profiili
            </Typography>
           {/*  {user.role !== 'customer' && evaluation && <Icon icon="bx:file" onClick={() => navigate('/contract-info')}/>} */}
           {/*  {user.role === 'teacher' && <Icon icon="mingcute:group-line" onClick={() => navigate('/admin-menu')}/>}  */}
            <Grid container alignItems='flex-start' justifyContent='flex-end'>
              <Grid item>
                <Button 
                  onClick={() => navigate('/profile')}
                  sx={{ marginRight: '20px', marginBottom:'20px' }}>
                  <Typography 
                    sx={{ fontWeight: '600', fontSize:'14px' }} 
                    >
                      Kirjaudu ulos
                  </Typography>
                  <Icon
                    icon="websymbol:logout" 
                    color='black' 
                    style={{ marginLeft:'10px' }} 
                    />
                </Button>
              </Grid>
            </Grid>
          </div>
      </div>
    </main>
  );
};

export default UserNav;
