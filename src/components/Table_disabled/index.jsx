import React, { useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Box, CssBaseline, Grid, IconButton, Input, InputAdornment, ListItemAvatar, Switch, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { SearchRounded } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';




const TableDisabled = ({disabledUser}) => {
  const bearer_token= localStorage.getItem('tokenDjango');
  const [userDisabled, setUserDisabled] = React.useState('')
  const [userId, setUserId] = React.useState('')
  const [searchField, setSearchField] = React.useState('')
  const [dataSearch, setdataSearch] = React.useState('')
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const mediaQuery = useMediaQuery('(min-width:900px)');

  
  
  React.useEffect(() => {
    getUserArchive()
    return () => {
      setUserDisabled('')
    }
  },[])
  
  const notify = (msg) => toast(msg);

 


  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


  const handleClickOpen = (id) => {
    setOpen(true);
    setUserId(id)
  };


  const handleClose = () => {
    setOpen(false);
    setUserId('')
  };


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
        .then((res) => {
            if (res)
              setUserDisabled(res.filter(x=> !x.is_active && !x.is_archive))   
        })
        .catch((error) => {
            console.log(error)
        });
  }  


  const enableUser=()=>{
        
    if(userId){

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
      .then(() => {
          
          // setOpenDisable(false)
          notify('Réactivé')
          handleClose()
          setTimeout(() => {
            window.location.reload()
          }, 1000);
      })
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
          {"Réactiver?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
              Voulez-vous vraiment réactiver cet utilisateur
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color='error'>
            Annuler
          </Button>
          <Button onClick={()=>enableUser()} autoFocus>
            Réactiver
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }


  const filterSearch=()=>{
    
    let dataFind= [],nomCapital='',prenomCapital='';
    let srch= searchField;
    let srchCapital= srch.toUpperCase()
    userDisabled && userDisabled.map((data)=>{
      nomCapital= data.first_name.toUpperCase();
      prenomCapital= data.last_name.toUpperCase();
      console.log(nomCapital)

      if (nomCapital === srchCapital || prenomCapital === srchCapital || prenomCapital+' '+nomCapital === srchCapital ) {
        dataFind.push(data)
        setdataSearch(dataFind)
      }else{
        dataFind= []
      }
      return true
    })

    console.log(searchField)
  }
  

  const CustomizedList=()=>useMemo(() =>  {
    
    return (
      <>    
        <InfiniteScroll
          pageStart={0}
          loadMore={()=>(true)}
          hasMore={false}
          loader={<div className="loader" key={0}>Loading ...</div>}
        
          // scrollableTarget="scrollableDiv"
        >
          
          {
                     
            
            searchField && searchField !== undefined ?(
              
              dataSearch && dataSearch.map((data,index)=>{
                if(data.last_name.toUpperCase() === searchField || data.first_name.toUpperCase() === searchField)
                {
                      return(
                        data ?(
                          <ListItem alignItems="flex-start" md={4} key={index} >
                              <ListItemAvatar key={index}>
                                <Avatar alt={data.first_name.toUpperCase()} src={`http://127.0.0.1:8000/api${data.image}`} />
                              </ListItemAvatar>
                              
                              <ListItemText
                                  sx={{borderBottom:'1px #f00 solid'}} 
                                  key={index}
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
                                    
                                      <Typography align='right' variant='overline' >
                                          
                                          <Switch   
                                            checked={false}  
                                            onChange={()=>handleClickOpen(data.id)} 
                                            color='error'
                                            title='Réactiver'
                                            />
                                      </Typography>
                                      </>
                                  }
                                />
                              {/* <Divider /> */}
                          </ListItem>
                        ):(
                          <Box sx={{m:10}}>
                        <Typography variant='h5' color='error'>
                            Recherche vide
                        </Typography>
                      </Box>
                        )
                      )

                  }else{
                   
                      <Box sx={{m:10}}>
                        <Typography variant='h5' color='error'>
                            Recherche vide
                        </Typography>
                      </Box>
                    
                    }
              })
              
            ):(
              disabledUser && disabledUser.map((data,index)=>{
                return (
                <>
                <InfiniteScroll
                    pageStart={0}
                    // loadMore='loadFunc'
                    hasMore={false}
                    loader={<div className="loader" key={0}>Loading ...</div>}                       
                    // scrollabletarget="scrollableDiv"
                  >
                  <ListItem alignItems="flex-start" md={4} sx={{borderBottomColor:'red'}}>
                      <ListItemAvatar key={index}>
                      <Avatar alt={data.first_name.toUpperCase()} src={`http://127.0.0.1:8000/api${data.image}`} />
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
                          
                          &nbsp;
                          <Typography align='right' variant='overline' color='error' >
                             
                              <Switch   
                                  checked={false}  
                                  onChange={()=>handleClickOpen(data.id)} 
                                  color='error'
                                  title='Désactiver'
                                  />
                          </Typography>
                          </>
                      }
                      />
                      <Divider />
                  </ListItem>
                  
                </InfiniteScroll>
                <Divider variant="inset"  />

                </>
                )
              })
            )


          }
            
           
        </InfiniteScroll>    
      </>
    );
          
  }) 

  return (
    <>
      <CssBaseline/>
       
      {
      // userDisabled 
      disabledUser && disabledUser.length >0 ?(
        <>
        
          {mediaQuery?(
            <List  component="div" disablePadding 
                  sx={{ width: '100%', bgcolor: 'background.paper',borderBottom:'1px #f00 solid',   boxShadow: 1  }}
                  
                  style={{
                  height: 300,
                  overflow: 'auto',
                  flexDirection: 'column-reverse',
                  
                  }}
          > 
              <CustomizedList />

          </List>
          ):(
            <List  component="div" disablePadding 
                  sx={{ width: '100%', bgcolor: 'background.paper',borderBottom:'1px #f00 solid',   boxShadow: 1  }}
                  
                  style={{
                  height: 430,
                  overflow: 'auto',
                  flexDirection: 'column-reverse',
                  
                  }}
          > 
              <CustomizedList />

          </List>
          )}
          
        
          <Grid container maxWidth='sm' sx={{background:'whhitesmoke', m:0}}>
              <Grid item  sx={{p:0}} alignContent='flex-end'>
              
                    {mediaQuery ?(

                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                              searchField ? (

                              <InputAdornment position="start">
                                <IconButton onClick={()=>{setSearchField(searchField.toUpperCase()); filterSearch()} }>
                                    <SearchRounded color='primary'/>
                                </IconButton>
                              </InputAdornment>
                              ):(
                                <InputAdornment position="start" disabled>
                                <IconButton disabled>
                                    <SearchRounded />
                                </IconButton>
                              </InputAdornment>
                              )
                            }
                            endAdornment={
                              searchField && <InputAdornment position="end">
                                <IconButton onClick={()=>{setSearchField('')} }>
                                    <ClearIcon color='error' fontSize='small' />
                                </IconButton>
                              </InputAdornment>
                            }
                            fullWidth={true}
                            value={searchField}
                            onChange={(e)=> {
                              setSearchField(
                                e.target.value.replace(/[^\w\s]/gi, '')
                              ); 
                            }}
                            sx={{ mt: 1, maxWidth: '60ch'}}
                            placeholder='search.... Nom ou Prénom'
                          />
                            
                        ):(

                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                              searchField ? (

                              <InputAdornment position="start">
                                <IconButton onClick={()=>{setSearchField(searchField.toUpperCase()); filterSearch()} }>
                                    <SearchRounded color='primary'/>
                                </IconButton>
                              </InputAdornment>
                              ):(
                                <InputAdornment position="start" disabled>
                                <IconButton disabled>
                                    <SearchRounded />
                                </IconButton>
                              </InputAdornment>
                              )
                            }
                            endAdornment={
                              searchField && <InputAdornment position="end">
                                <IconButton onClick={()=>{setSearchField('')} }>
                                    <ClearIcon color='error' fontSize='small' />
                                </IconButton>
                              </InputAdornment>
                            }
                            fullWidth={true}
                            value={searchField}
                            onChange={(e)=> {
                              setSearchField(
                                e.target.value.replace(/[^\w\s]/gi, '')
                              ); 
                            }}
                            sx={{ mt: 1, maxWidth: '150%'}}
                            placeholder='search.... Nom ou Prénom'
                          />
                            
                        )
                    }
              </Grid>
          </Grid>
        </>
        ):(
            <Box sx={{m:10}}>
                <Typography variant='h5'>
                  Aucune donnée
                </Typography>
            </Box>
        )
       
    }
       
      
            
      <EnableDialog/> 
      <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
            {/* Same as */}
      <ToastContainer />   

    </>
  )
}

export default TableDisabled
