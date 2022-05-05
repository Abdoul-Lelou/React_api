import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import { Details } from '@mui/icons-material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton } from '@mui/material';
import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import DetailPanelUser from '../dialog/detailPanelUser';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus({update_user, openModalEdit, archiveUser, disableUser, rowSelected, cours}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isActive, setisActive] = React.useState(false)

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActiveUser=()=>{
      isActive ? setisActive(false): setisActive(true)
  }



  return (
    <div>
      <IconButton
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        startIcon={<KeyboardArrowDownIcon />}
        sx={{boxShadow:2}}
      >
        <MenuOpenSharpIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{update_user() ; openModalEdit(); handleClose()}} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={()=>{disableUser(); isActiveUser(); handleClose()}} disableRipple>
         
            
            {
                isActive ?(
                    <>
                        <ToggleOffOutlinedIcon />   
                    </>
                ):(
                    <> 
                        <ToggleOnOutlinedIcon />
                    </>
                )
            }
            Désactiver
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={()=>{ archiveUser(); handleClose()}} disableRipple>
          <ArchiveIcon />
          Archive
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem  disableRipple>
          {/* <MoreHorizIcon /> */}
          
          <DetailPanelUser 
            detail={rowSelected} 
            cours={cours} 
            text={<><Details  fontSize='medium' style={{ borderColor:'blue'}}/>Details</>}
            />
          
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
