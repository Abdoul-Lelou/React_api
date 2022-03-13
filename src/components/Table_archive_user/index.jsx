import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CollapsibleTable from '../../components/Table_user';
import { Avatar, Box, CssBaseline, ListItemAvatar, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';




const TableArchive = ({disabledUser}) => {
  const bearer_token= localStorage.getItem('tokenDjango');
  const [userDisabled, setUserDisabled] = React.useState('')
  const [userId, setUserId] = React.useState('')
  const [openDisable, setOpenDisable] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (id) => {
    setOpen(true);
    setUserId(id)
  };

  const handleClose = () => {
    setOpen(false);
    setUserId('')
  };


  React.useEffect(() => {
    getUserArchive()
    return () => {
      setUserDisabled('')
    }
  }, [])
  

  const Capitalize=(str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const getUserArchive=()=>{
    return fetch("http://localhost:8000/api/user", {

      method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${bearer_token}`
          }
        
      }).then((res) => res.json())
        .then((res,index) => {
              setUserDisabled(res.filter(x=> !x.is_active && !x.is_archive))   
        })
        .catch((error) => {
            console.log(error)
        });
  }  

  const enableUser=()=>{
        
    if(userId){

      // const id= rowSelected && rowSelected.map(value=>{
      //   return value.id
      // })
      // const user_id= id.find(id=> id !==null);

    return fetch(`http://localhost:8000/api/user/${userId}`, {

      method: 'PATCH',
             headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${bearer_token}`
          },body: JSON.stringify({
            is_active : true
        })
          
    }).then((res) => res.json())
      .then((res,index) => {
          console.log(res);
          setOpenDisable(false)
          // setDisabled(disabled ? false : true)
          window.location.reload()
      })
      .catch((error) => {
          console.log(error)
      });
   }
  }
  
  const  EnableDialog=()=> {

    return (
      <div>
       <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Enable?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
              Voulez-vous vraiment réactivé cet utilisateur
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='error'>
            Annuler
          </Button>
          <Button onClick={()=>enableUser()} autoFocus>
            Enable
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }


  return (
    <>
      <CssBaseline/>
      <List  component="div" disablePadding sx={{ width: '100%', bgcolor: 'background.paper',   boxShadow: 2  }}
                id="scrollableDiv"
                style={{
                height: 298,
                overflow: 'auto',
                flexDirection: 'column-reverse',
                }}
      > 

            {
                disabledUser.length ?(
                  disabledUser && disabledUser.map((data,index)=>{
                      return (
                      <>
                      <InfiniteScroll
                          pageStart={0}
                          // loadMore='loadFunc'
                          hasMore={true || false}
                        //  loader={<div className="loader" key={0}>Loading ...</div>}
                        
                          scrollabletarget="scrollableDiv"
                        >
                        <ListItem alignItems="flex-start" md={4} >
                            <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText 
                            primary={Capitalize(data.first_name+' '+data.last_name)}
                            secondary={
                                <>
                                <Typography
                                      sx={{ display: 'inline' }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                >
                                      {data.role}
                                </Typography>
                                {" — I'll be in your   errands this…"}
                                <Typography align='right' variant='overline' >
                                    <Button variant='contained' sm={2} size="small"  color='warning'
                                      onClick={()=>handleClickOpen(data.id)}
                                    >
                                        Enable
                                    </Button>
                                </Typography>
                                </>
                            }
                            />
                            <Divider />
                        </ListItem>
                        
                        </InfiniteScroll>
                        <Divider variant="inset" component="li" />

                      </>
                      )
                  })
                ):(
                  <Box sx={{m:10}}>
                      <Typography variant='h5'>
                        Aucune donnée
                      </Typography>
                  </Box>
                )
            
            }

            

      </List>
            
      <EnableDialog/>    

    </>
  )
}

export default TableArchive
