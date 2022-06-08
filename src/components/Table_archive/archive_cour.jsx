import * as React from 'react';
import { Button, ButtonGroup, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Input, InputAdornment, List,  Typography, useMediaQuery, useTheme } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import { Box } from '@mui/system';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import { SearchRounded } from '@mui/icons-material';
import { ToastContainer,toast  } from 'react-toastify';





 const ArchiveCour=({role})=> {

  const [archive, setarchive] = React.useState('');
  const [idArchive, setidArchive] = React.useState('');
  const [searchField, setSearchField] = React.useState('')
  const [dataSearch, setdataSearch] = React.useState('');
  const bearer_token= localStorage.getItem('tokenDjango'); 
  const [openArchive, setOpenArchive] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [refresh, setrefresh] = React.useState(false);
  const [courArchive, setCourArchive] = React.useState('')
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const matches = useMediaQuery('(min-width:900px)');


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

  React.useEffect(() => {
   getArchive();
   getCours();
   return ()=>{
     setarchive('')
   }
  }, [refresh])

  const notify = (msg) => toast(msg);
  const errorMsg = (icon,msg)=>Toast.fire({
    icon: icon,
    title: msg
  })

 

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
  }));
  
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));
  
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
  }));
  
   const CustomizedAccordions=()=> {
    const [expanded, setExpanded] = React.useState(0);
  
    const handleChange = (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };


   
  
    return (
      <>
      <div>
        
        <InfiniteScroll
          pageStart={0}
          // loadMore='loadFunc'
          hasMore={false}
          loader={<div className="loader" key={0}>Loading ...</div>}
        
          // scrollableTarget="scrollableDiv"
        >
          
          {
                     
            
            searchField ?(
              
              dataSearch && dataSearch.map((data,index)=>{
                    if(data.nom.toUpperCase() === searchField.toUpperCase()){

                      return(
                        <Accordion expanded={expanded=== index} onChange={handleChange(index)} id="scrollableDiv">
                          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography>{data.nom} 
                              <Typography variant='subtitle2' align='right'>{data.date_cour}</Typography>
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography noWrap>
                            {data.description}
                            </Typography>
                            <ButtonGroup disableElevation variant="contained">
                              <IconButton 
                                color='warning'
                                onClick={()=>{setOpenArchive(true); setidArchive(data.id)}}
                                >
                                  <UnarchiveIcon color='warning'/>
                              </IconButton>
                              <IconButton 
                                color='error'
                                onClick={()=>{setOpenDelete(true); setidArchive(data.id)}}
                                >
                                  <DeleteIcon color='error'/>
                              </IconButton>
                            </ButtonGroup>
                          </AccordionDetails>
                        </Accordion>
                      );

                    }else{
                    
                      <Box sx={{m:10}}>
                        <Typography variant='h5' color='error'>
                            Recherche vide
                        </Typography>
                      </Box>
                    }
              })
              
            ):(
              matches?(
                courArchive && courArchive.map((data,index)=>{
                return(
                  <Accordion expanded={expanded=== index} onChange={handleChange(index)} id="scrollableDiv">
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                      <Typography>{data.nom} 
                        <Typography variant='subtitle2' align='right'>{data.date_cour}</Typography>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography noWrap>
                       {data.description}
                      </Typography>
                      <ButtonGroup disableElevation variant="contained">
                        
                        {
                          role ==='admin'?(

                            <>
                              <IconButton 
                                color='warning'
                                onClick={()=>{setOpenArchive(true); setidArchive(data.id)}}
                                >
                                  <UnarchiveIcon color='warning'/>
                                </IconButton>

                                <IconButton 
                                  color='error'
                                  onClick={()=>{setOpenDelete(true); setidArchive(data.id)}}
                                  >
                                    <DeleteIcon color='error'/>
                                </IconButton>
                            </>
                            
                          ):(
                            <>
                              <IconButton 
                                color='warning'
                                disabled={true}
                                >
                                  <UnarchiveIcon disabled={true}/>
                              </IconButton>

                              <IconButton 
                                  color='error'
                                  disabled={true}
                                  >
                                    <DeleteIcon  disabled={true}/>
                                </IconButton>

                              </>
                          )
                        }
                        
                      </ButtonGroup>
                    </AccordionDetails>
                  </Accordion>
                )
              })
              ):(
                courArchive && courArchive.map((data,index)=>{
                return(
                <div style={{maxWidth:280}}>
                  <Accordion expanded={expanded=== index} onChange={handleChange(index)} id="scrollableDiv">
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                      <Typography>{data.nom} 
                        <Typography variant='subtitle2' align='right'>{data.date_cour}</Typography>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography noWrap>
                       {data.description}
                      </Typography>
                      <ButtonGroup disableElevation variant="contained">
                        
                        {
                          role ==='admin'?(

                            <>
                              <IconButton 
                                color='warning'
                                onClick={()=>{setOpenArchive(true); setidArchive(data.id)}}
                                >
                                  <UnarchiveIcon color='warning'/>
                                </IconButton>

                                <IconButton 
                                  color='error'
                                  onClick={()=>{setOpenDelete(true); setidArchive(data.id)}}
                                  >
                                    <DeleteIcon color='error'/>
                                </IconButton>
                            </>
                            
                          ):(
                            <>
                              <IconButton 
                                color='warning'
                                disabled={true}
                                >
                                  <UnarchiveIcon disabled={true}/>
                              </IconButton>

                              <IconButton 
                                  color='error'
                                  disabled={true}
                                  >
                                    <DeleteIcon  disabled={true}/>
                                </IconButton>

                              </>
                          )
                        }
                        
                      </ButtonGroup>
                    </AccordionDetails>
                  </Accordion>
                </div>
                )
              })
              )
            )


          }
            
           
        </InfiniteScroll>    
      </div>
      </>
    );
          
  }


  const getCours=()=>{
    return fetch("http://localhost:8000/api/cour", {
  
      method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${bearer_token}`
          }
          
    }).then((res) => res.json())
      .then((res) => {
          if(res.data)
             setCourArchive(res.data.filter(x=>!x.status))
      })
      
  }


  const  ArchiveDialog=()=> {

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={openArchive}
          onClose={()=>setOpenArchive(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"DESARCHIVER?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous vraiment désarchiver cet cour
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={()=>setOpenArchive(false)}  color='error'>
              Annuler
            </Button>
            <Button onClick={()=>{courDesarchive(idArchive); setOpenArchive(false)}} autoFocus>
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
          fullScreen={fullScreen}
          open={openDelete}
          onClose={()=>setOpenDelete(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"SUPPRIMER?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous vraiment supprimer cet cour
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={()=>setOpenDelete(false)}  color='error'>
              Annuler
            </Button>
            <Button onClick={()=>{deleteCourArchive(idArchive); setOpenDelete(false)}} autoFocus>
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


  const courDesarchive=(id)=>{
      
    if(id){
      return fetch(`http://localhost:8000/api/cour/${id}`, {
  
        method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${bearer_token}`
            },
            body: JSON.stringify({
              status: true
          })
            
      }).then((res) => res.json())
        .then((res,index) => {
            console.log(res)
              if(res.status ==='success'){
                notify('Désarchivé')
              }
              setOpenDelete(false)
              setTimeout(() => {
                  window.location.reload()
              }, 1000);
        })
        .catch((error) => {
            errorMsg('error', error)
        });
      }
    
  }


  const getArchive=()=>{
    return fetch("http://localhost:8000/api/cour", {
    
      method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${bearer_token}`
          }
          
    }).then((res) => res.json())
      .then((res) => {
          if(res.data)
              setarchive(res.data.filter(x=>!x.status))
      })
      
  }


  const deleteCourArchive=(id)=>{
    return fetch(`http://localhost:8000/api/cour/${id}`, {
    
      method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${bearer_token}`
          },
          
    }).then((res) => res.json())
      .then((res) => {
         
            setOpenArchive(false)
            notify('Supprimé')
            setrefresh(refresh? false:true)
      })
      .catch((error) => {
          errorMsg('error',error)
      });
  }


  const filterSearch=()=>{
    let dataFind= [],srchCapital='',courCapital='';
    let srch= searchField;
    srchCapital= srch.toUpperCase()
    archive && archive.map((data)=>{
      courCapital= data.nom.toUpperCase();
      console.log(courCapital)

      if (courCapital === srchCapital ) {
        dataFind.push(data)
        setdataSearch(dataFind)
      }else{
        dataFind= []
        // setdataSearch(dataFind)
      }
      return true
    })

    console.log(searchField)

  }


  return (
    <>
    
    <CssBaseline/>
    {
      archive && archive.length >0 ?(
        <>
        
          <List  component="div" disablePadding 
                  sx={{ 
                    width: '100%',
                    bgcolor: 'background.paper', 
                    boxShadow: 2,
                    borderBottom:'1px #f00 solid'  
                  }}
                  
                  style={{
                  height: 300,
                  overflow: 'auto',
                  flexDirection: 'column-reverse',
                  }}
          > 

              <CustomizedAccordions />

          </List>
        
          <Grid container maxWidth='sm' sx={{background:'whhitesmoke', marginTop:0.5}}>
              <Grid item  sx={{p:0}} alignContent='flex-end'>
              
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                          searchField ? (

                          <InputAdornment position="start">
                            <IconButton 
                              onClick={()=>{setSearchField(searchField); filterSearch()} }
                              >
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
                        fullWidth='xl'
                        value={searchField}
                        onChange={(e)=> {
                          setSearchField(
                            e.target.value.replace(/[^\w\s]/gi, '')
                          ); 
                        }}
                        sx={{ mt: 1, maxWidth: '60ch' }}
                        placeholder='search....'
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
export default ArchiveCour







