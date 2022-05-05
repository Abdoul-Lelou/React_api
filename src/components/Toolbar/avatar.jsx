import * as React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { IconButton, Menu, MenuItem, Tooltip, Zoom } from '@mui/material';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

export default function BadgeAvatars({img, name},props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const urlImg= 'http://127.0.0.1:8000/api'
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // React.useEffect(() => {
   
  // }, [])


  return (
    
    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
       <IconButton 
          onClick={handleClick}
        >
           <Tooltip TransitionComponent={Zoom} title={name} placement='left-end'>
              <Avatar 
                  id='avatar'
                  alt={name}
                  src={`${urlImg}${img}`}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  
              />
          </Tooltip>
            {/* <img src={`http://127.0.0.1:8000/api${img}`} alt="ok"  /> */}
          {/* </Avatar> */}
       </IconButton>

        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'avatar',
        }}
        sx={{maxWidth:95}}
      >
        <Tooltip TransitionComponent={Zoom} title="PROFILE" placement='left-end'>
          <MenuItem onClick={handleClose}>
            {/* <AccountCircleSharpIcon sx={{color: '#009688'}}> */}
                <Avatar 
                  id='avatar'
                  alt='Profile'
                  src={`${urlImg}${img}`}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  sx={{maxHeight: 30, maxWidth: 30}}
                  onClick={()=> window.location.pathname = 'profile'}
              />
            {/* </AccountCircleSharpIcon> */}
          </MenuItem>
        </Tooltip>  
        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <Tooltip TransitionComponent={Zoom} title="LOGOUT" >
          <MenuItem 
            onClick={()=>{window.location.pathname=''; window.localStorage.removeItem('tokenDjango')}}
          >
                <LogoutSharpIcon color='error'/>
          </MenuItem>
        </Tooltip>  
        </Menu>
      </StyledBadge>
      
    </Stack>
  );
}
