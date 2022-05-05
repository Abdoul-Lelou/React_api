import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Button, ButtonGroup, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Input, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import { Box } from '@mui/system';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import moment from 'moment';
import { SearchRounded } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ArchiveProffesseur({apprenant}) {

  const [archive, setarchive] = React.useState('')
  const bearer_token= localStorage.getItem('tokenDjango');
  const [refresh, setrefresh] = React.useState(false);
  const [openArchive, setOpenArchive] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [idArchive, setidArchive] = React.useState(''); 
  const [searchField, setSearchField] = React.useState('');
  const [dataSearch, setdataSearch] = React.useState('')

  React.useEffect(() => {
   getArchive();
   
  }, [refresh])

  const notify = (msg) => toast(msg);
  const msgToast = (icon,msg)=>Toast.fire({
    icon: icon,
    title: msg
  })

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

  const Capitalize=(str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }



  const getArchive=()=>{

    return fetch("http://localhost:8000/api/user", {
    
      method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${bearer_token}`
          },
       
          
    }).then((res) => res.json())
      .then((res) => {
            if(res)
              setarchive(res.filter(x=> x.role === 'proffesseur' && x.is_archive))
      })
      .catch((error) => {
          console.log(error)
      });
  }

  const deleteArchive=(id)=>{

    return fetch(`http://localhost:8000/api/user/${id}`, {
    
      method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${bearer_token}`
          },
        
    }).then((res) => res.json())
      .then((res,index) => {
        console.log(res)
        setOpenDelete(false)
        if(res.status === 'success'){
          refresh ? setrefresh(false):setrefresh(true)
          notify('Archive supprimée')
        }
                
      })
      .catch((error) => {
          console.log(error)
          msgToast('error', error)
      });

  }

  const userUnarchive=(id)=>{

    return fetch(`http://localhost:8000/api/user/${id}`, {
    
      method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${bearer_token}`
          },
          body: JSON.stringify({
             
              is_archive: false,
             


          })
        
    }).then((res) => res.json())
      .then((res,index) => {
        console.log(res)
        setOpenArchive(false)
        setrefresh(false)
        setrefresh(true)
        notify('Utilisateur désarchivé')        
      })
      .catch((error) => {
          console.log(error)
          msgToast('error', error)
      });

  }

  const  ArchiveDialog=()=> {

    return (
      <div>
        <Dialog
          // fullScreen={fullScreen}
          open={openArchive}
          onClose={()=>setOpenArchive(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"ARCHIVER?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous vraiment désarchiver cet utilisateur
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={()=>setOpenArchive(false)}  color='error'>
              Annuler
            </Button>
            <Button onClick={()=>userUnarchive(idArchive)} autoFocus>
              Désarchiver
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const  DeleteDialog=()=> {

    return (
      <div>
        <Dialog
          // fullScreen={fullScreen}
          open={openDelete}
          onClose={()=>setOpenDelete(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"ARCHIVER?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous vraiment supprimer cet utilisateur
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={()=>setOpenDelete(false)}  color='error'>
              Annuler
            </Button>
            <Button onClick={()=>deleteArchive(idArchive)} autoFocus>
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const filterSearch=()=>{
    
    let dataFind= [],nomCapital='',prenomCapital='';
    let srch= searchField.split(' ').join('');
    let srchCapital= srch.toUpperCase()
    archive && archive.map((data)=>{
      nomCapital= data.first_name.toUpperCase();
      prenomCapital= data.last_name.toUpperCase();
      console.log(srchCapital)

      if (nomCapital === srchCapital || prenomCapital === srchCapital  ) {
        dataFind.push(data)
        setdataSearch(dataFind)
      }else{
        dataFind= []
        // setdataSearch(dataFind)
      }
      return true
    })
 console.log(searchField)
 console.log(dataSearch)

  }

  const CustomizedList=()=>React.useMemo(() =>  {
    
    return (
      <>
      <div>
        
        <InfiniteScroll
          pageStart={0}
          loadMore='loadFunc'
          hasMore={false}
          loader={<div className="loader" key={0}>Loading ...</div>}
        
          // scrollableTarget="scrollableDiv"
        >
          
          {
                     
            
            searchField ?(
              
              dataSearch && dataSearch.map((data,index)=>{
                if(data.last_name.toUpperCase() === searchField || data.first_name.toUpperCase() === searchField)
                {
                      return(
                        <ListItem alignItems="flex-start" md={4} key={index}>
                        <ListItemAvatar>
                          <Avatar alt={data.last_name.toUpperCase()} src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText 
                        // primary={Capitalize(data.first_name+' '+data.last_name)}
                        primary={Capitalize(data.first_name)+' '+ Capitalize(data.last_name)}
                        secondary={
                          <>
                          <Typography
                                sx={{ display: 'inline-block', width: 200, height:20}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                                noWrap={true}
                          >
                                {data.role}
                          </Typography>
                          {" "}
                          <Typography align='right' variant='overline'>
                                {moment(data.created_at).format('YYYY-MM-DD HH:mm')}
                                <ButtonGroup disableElevation variant="contained">
                              <IconButton 
                                color='warning'
                                title='désarchiver'
                                onClick={()=>{setOpenArchive(true); setidArchive(data.id)} }
                              >

                                  <UnarchiveIcon/>
                                </IconButton>
                              <IconButton 
                                color='error'
                                title='supprimer'
                                onClick={()=>{setOpenDelete(true); setidArchive(data.id)}}
                              >
                                <DeleteIcon/>
                              </IconButton>
                            </ButtonGroup>
                          </Typography>
                          </>
                        }
                        />
                        <Divider />
                        </ListItem>
                      )

                    }else{
                    return(
                      // <Box sx={{m:10}}>
                        <Typography variant='h2' color='error'>
                            Recherche vide
                        </Typography>
                      // </Box>
                    )
                    }
              })
              
            ):(
              archive && archive.map((data,index)=>{
                return (
                <>
                <InfiniteScroll
                    pageStart={0}
                    // loadMore='loadFunc'
                    hasMore={false}
                    loader={<div className="loader" key={0}>Loading ...</div>}                       
                    // scrollabletarget="scrollableDiv"
                  >
                    <ListItem alignItems="flex-start"  key={index} sx={{m:-1.5}}>
                      <ListItemAvatar >
                        <Avatar alt={data.first_name.toUpperCase()} src="/static/images/avatar/1.jpg" />
                      </ListItemAvatar>
                      <ListItemText
                            primary={Capitalize(data.first_name)+' '+ Capitalize(data.last_name)}
                            secondary={
                              <>
                              <Typography
                                    sx={{ display: 'inline-block', width: 200, height:20}}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                    noWrap={true}
                              >
                                    {data.role}
                              </Typography>
                              {" "}
                              <Typography align='right' variant='overline'>
                                    {moment(data.created_at).format('YYYY-MM-DD HH:mm')}
                                    <ButtonGroup disableElevation variant="contained">
                                  <IconButton 
                                    color='warning'
                                    title='désarchiver'
                                    onClick={()=>{setOpenArchive(true); setidArchive(data.id)} }
                                  >

                                      <UnarchiveIcon/>
                                    </IconButton>
                                  <IconButton 
                                    color='error'
                                    title='supprimer'
                                    onClick={()=>{setOpenDelete(true); setidArchive(data.id)}}
                                  >
                                    <DeleteIcon/>
                                  </IconButton>
                                </ButtonGroup>
                              </Typography>
                              </>
                            }
                          
                        />
                    </ListItem>
                  
                </InfiniteScroll>
                <Divider variant="inset"  />

                </>
                )
              })
            )


          }
            
           
        </InfiniteScroll>    
      </div>
      </>
    );
          
  })


  return (
    <>
    
    <CssBaseline/>
     
    {
      archive && archive.length >0 ?(
        <>
        
          <List  component="div" disablePadding sx={{ width: '100%', bgcolor: 'background.paper',   boxShadow: 2  }}
                  
                  style={{
                  height: 300,
                  overflow: 'auto',
                  flexDirection: 'column-reverse',
                  }}
          > 

              <CustomizedList />

          </List>
        
          <Grid container maxWidth='sm' sx={{background:'whhitesmoke', m:1}}>
              <Grid item  sx={{p:0}} alignContent='flex-end'>
              
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                          searchField ? (

                          <InputAdornment position="start">
                            <IconButton onClick={()=>{setSearchField(searchField.toUpperCase()); filterSearch()} }>
                                <SearchRounded color='primary' sx={{color:'#009688'}}/>
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
                        fullWidth='xl'
                        value={searchField}
                        onChange={(e)=> {
                          setSearchField(
                            e.target.value.replace(/[^\w\s]/gi, '').split(' ').join('')
                          ); 
                        }}
                        sx={{ m: 0, maxWidth: '60ch' }}
                        placeholder='search.... Nom ou Prénom'
                      />
                    
                    <br />
                
              </Grid>
          </Grid>
        </>
        ):(
            <Box sx={{m:10}}>
                <Typography variant='h2'>
                  Aucune donnée
                </Typography>
            </Box>
        )
       
    } 
      <ArchiveDialog/>
      <DeleteDialog/>
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
  );
}
