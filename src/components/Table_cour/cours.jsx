import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';

import { CssBaseline, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Slide, Stack, TextField } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PersonAdd } from '@mui/icons-material';
import Modal from 'react-modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import CustomizedMenusCour from './custom_button';
import moment from 'moment';




function createData(nom, description, date_cour) {
  return {
    nom, description, date_cour,
    
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}



createData.propTypes = {
  row: PropTypes.shape({
    description: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    date_cour: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    // status: PropTypes.number.isRequired,
    // email: PropTypes.string.isRequired,
  }).isRequired,
};


const PAGE_SIZE = 5;


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      margin: 'auto',
      transform: 'translate(-50%, -50%)',
      background:'#c8d8c8',
      width: '60%',
      boxShadow: '2px'
    },
  }; 



const TableUserCour=({role})=> {

    const bearer_token= localStorage.getItem('tokenDjango'); 
    const [user, setUser] = useState('');
    const [pageSize, setPageSize] = React.useState(5);
    const [rowSelected, setRowSelected] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [openArchive, setOpenArchive] = React.useState(false);
    const [openDisable, setOpenDisable] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [disabled, setDisabled] = useState(false)
    const [archivedDate, setArchivedDate] = useState(false)
    const [cours, setCours] = React.useState('');

    const [idEdit, setidEdit] =  React.useState('');
    const [refresh, setrefresh] =  React.useState('');
    const [prenomEdit, setprenomEdit] =  React.useState('')
    const [roleEdit, setroleEdit] =  React.useState('')
    const [telEdit, settelEdit] =  React.useState('');
    const [passwordEdit, setpasswordEdit] =  React.useState('');
    const [emailEdit, setemailEdit] = React.useState('')
    const [userEditData, setuserEditData] = React.useState('')

    const [nomEdit, setnomEdit] =  React.useState('');
    const [descriptionEdit, setdescriptionEdit] =  React.useState('')
    const [dateEdit, setdateEdit] =  React.useState('')
    const [userEdit, setuserEdit] =  React.useState('');

    const [nomAdd, setnomAdd] =  React.useState('');
    const [descriptionAdd, setdescriptionAdd] =  React.useState('')
    const [dateAdd, setdateAdd] =  React.useState('')
    const [userAdd, setuserAdd] =  React.useState('');
    const [modalEditIsOpen, setIsOpenEdit] = React.useState(false);
    const [modalAddIsOpen, setIsOpenAdd] = React.useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    let subtitle, minDate='';
    let today = new Date().toISOString().slice(0, 10)

    
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

    function openModalEdit() {
      setIsOpenEdit(true);
      setOpenEdit(false)
      return userEditData && userEditData.map(data=>{
        setnomEdit(data.first_name);
        setprenomEdit(data.last_name);
        setroleEdit(data.role);
        setemailEdit(data.email);
        settelEdit(data.tel);
        setpasswordEdit(data.password)

      })
    }


    const Capitalize=(str)=>{
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function closeModal() {
      setIsOpenEdit(false);
      setIsOpenAdd(false);
    }

    function openModalAdd() {
      setIsOpenAdd(true);
      setOpenEdit(false)
    }




  
    const notify = (msg) => toast(msg);
    const errorMsg = (icon,msg)=>Toast.fire({
      icon: icon,
      title: msg
    })
  
    
    useEffect(() => {
    
        const dateMin =  new Date()
        getCours();
        getProf();
        minDate = '"'+moment(dateMin.getDate()).format('YYYY-MM-DD')+'"'
        convertDate()
        return () => {
          setCours('');
          setUser('')
        };   
    }, [ disabled,refresh]);

   
    const convertDate=()=>{
      cours && cours.map((data)=>{
          if(moment(data.date_cour).isBefore(today)){
            updateCour(data.id)
          }
      })
      // return moment(date).isAfter(today)
    }

    const updateCour=(id)=>{

      return fetch(`http://localhost:8000/api/cour/${id}`, {
      
        method: 'PATCH',
               headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${bearer_token}`
            },body: JSON.stringify({
              status : false
          })
            
      }).then((res) => res.json())
        .then((res) => {
            console.log(res);
        })
        
      }
    
    const getCours=()=>{
      
  
        return fetch("http://localhost:8000/api/cour", {
     
          method: 'GET',
                 headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${bearer_token}`
              },
              
        }).then((res) => res.json())
          .then((res) => {
              if(res.data){

                setCours(res.data.filter(x=> x.status)) 
              }
              convertDate()
          })
          
    }

    
    const getProf=()=>{
      
  
        return fetch("http://localhost:8000/api/user", {
     
          method: 'GET',
                 headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${bearer_token}`
              },
              
        }).then((res) => res.json())
          .then((res) => {
              if(res.length)
                setUser(res.filter(x=> x.is_active && x.role ==='proffesseur'))
              
          })
          .catch((error) => {
              console.log(error)
          });
    }


    const updateUser=()=>{
      
  
      return fetch(`http://localhost:8000/api/user`, {
  
        method: 'GET',
               headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${bearer_token}`
            }
       
            
      }).then((res) => res.json())
        .then((res) => {
           
            if(res.status ==='success'){
            //   notify('Archivé')
              setuserEditData(res)
            }
           console.log(userEditData)

        })
        .catch((error) => {
            console.log(error)
        });
    }

    const disableUser=()=>{
        
      if(rowSelected){

        const id= rowSelected && rowSelected.map(value=>{
          return value.id
        })
         const user_id= id.find(id=> id !==null);

      return fetch(`http://localhost:8000/api/user/${user_id}`, {
  
        method: 'PATCH',
               headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${bearer_token}`
            },body: JSON.stringify({
              is_active : false
          })
            
      }).then((res) => res.json())
        .then((res) => {
            console.log(res);
            setOpenDisable(false)
            setDisabled(disabled ? false : true)
            window.location.reload()
        })
        .catch((error) => {
            console.log(error)
        });
      }
    }
    
    const courArchive=()=>{
      
      if(rowSelected){

        const id= rowSelected && rowSelected.map(value=>{
          return value.id
        })
        const user_id= id.find(id=> id !==null);
        
        return fetch(`http://localhost:8000/api/cour/${user_id}`, {
    
          method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${bearer_token}`
              },
              body: JSON.stringify({
                status: false
            })
              
        }).then((res) => res.json())
          .then((res) => {             
                if(res.status ==='success'){
                  notify('Archivé')
                }
                setOpenArchive(false)
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
          })
          .catch((error) => {
              errorMsg('error', error)
          });
        }
      
    }
       
    const  DisableDialog=()=> {

      return (
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={openDisable}
            onClose={()=>setOpenDisable(false)}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"DÉSACTIVER?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Voulez-vous vraiment désactiver cette utilisateur
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={()=>setOpenDisable(false)}  color='error'>
                Cancel
              </Button>
              <Button onClick={()=>disableUser()} autoFocus>
                Disable
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }

    const  EditDialog=()=> {

      return (
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={openEdit}
            onClose={()=>setOpenEdit(false)}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"MODIFIER?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Voulez-vous vraiment modifier cette utilisateur
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={()=>setOpenEdit(false)}  color='error'>
                Annuler
              </Button>
              <Button onClick={()=>{UserUpdate();openModalEdit();updateUser()}} autoFocus>
                Modifier
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
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
              {"ARCHIVER?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Voulez-vous vraiment archiver cette utilisateur
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={()=>setOpenArchive(false)}  color='error'>
                Cancel
              </Button>
              <Button onClick={()=>courArchive()} autoFocus>
                Archiver
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
 
    const UserUpdate=()=>{


      if(rowSelected){
        const cour= rowSelected && rowSelected.map(value=>{
            return value
          })

         
          return cour && cour.map(data=>{
            setnomEdit(data.nom);
            setdescriptionEdit(data.description);
            setuserEdit(data.user);
            setdateEdit(data.date_cour);
    
          })
      }
      
      // userEditData
    }
  
        
    const columns = [
        { field: 'nom', headerName: 'Nom', width: 140 },
        { field: 'description', headerName: 'Description', width: 400 },
        { field: 'date_cour', headerName: 'Date', width: 100 },
        { field: 'status', headerName: 'Status', width: 68,

        renderCell: () => (
          <>
            
            
            <CustomizedMenusCour 
              update_user={UserUpdate}
              // updateUser={updateUser}
              disableUser={disableUser}
              courArchive={courArchive}
              openModalEdit={openModalEdit}
              rowSelected={rowSelected}
              user={user}
              role={role}
              onClick={()=>UserUpdate()}
            />
          </>
        )

        },
    ];

    const courUpdate=()=>{


      if(rowSelected){

        const id= rowSelected && rowSelected.map(value=>{
          return value.id
        })
         const user_id= id.find(id=> id !==null);

      fetch(`http://localhost:8000/api/cour/${user_id}`, {
  
              method: 'PATCH',
                     headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${bearer_token}`
                  },
                  body: JSON.stringify({
                    nom: nomEdit,
                    description: descriptionEdit,
                    user: userEdit,
                    date_cour: dateEdit
                  })
            }).then((res) => res.json())
              .then((res) => {
                
                  if (res.status === 'success') {
                      closeModal()
                      notify('Modifié')
                      setrefresh(refresh? false:true)
                  }else{
                    errorMsg('error',res.data.detail || res.data.nom)
                  }
              })
              
            }
    }

    const courRegistre=()=>{

      fetch(`http://localhost:8000/api/cour`, {
  
              method: 'POST',
                     headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${bearer_token}`
                  },
                  body: JSON.stringify({
                      nom: nomAdd,
                      description: descriptionAdd,
                      user: userAdd,
                      date_cour: dateAdd,
                      status: true
                  })
            }).then((res) => res.json())
              .then((res) => {
               
                  if (res.status === 'success') {
                      closeModal()
                      notify('Ajouté')
                      setrefresh(refresh? false:true)
                  }else{
                    errorMsg('error',res.data.detail || res.data.nom)
                  }
              })
              
    }
    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));        

  return (
    <>
      <CssBaseline />
      <div 
          style={{ height: 300, maxWidth: '100%', boxShadow:4}} 
          sx={{
            height: 400,
            width: 1,
            '& .MuiDataGrid-cell--editable': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)',
            },
          }}
          id='main'
      >
         
        
          <DataGrid 
            columns={columns} 
            rows={cours}
            onSelectionModelChange={(ids) => {
              const selectedIDs = new Set(ids);
              const selectedRows = cours.filter((row) =>
                selectedIDs.has(row.id)
              );
              setRowSelected(selectedRows)
            }} 
            // hideFooterPagination 
            components={{
              NoRowsOverlay: () => (
                <Stack height="100%" alignItems="center" justifyContent="center">
                <Typography variant='h4' color='HighlightText'>Aucune donnée </Typography>
                </Stack>
              ),
              NoResultsOverlay: () => (
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Local filter returns no result
                </Stack>
              ),
            
            }}

            sx={{paddingBottom:0, borderBottom:'1px #009688 solid'}}
            autoPageSize
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            {...cours}
            loading={loading}
          />



          
            <Modal
              isOpen={modalEditIsOpen}
              // onAfterOpen={afteropenModalEdit}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              ariaHideApp={false}
              // appElement={document.getElementById('app')}
              
            >
                

                <Box sx={{ flexGrow: 1 , m:2}}>
                    <Grid container spacing={0}>

                        <Grid item md={12} alignItems='center'>
                            <Item sx={{borderBottom:'#c8d8c8 1px solid', background:'#fffff8'}} md={4} align='center'>
                                <Typography variant='h6'>MODIFIER </Typography>
                            </Item>
                        </Grid>                     
                        
                    </Grid>
                </Box>

                <Box sx={{ flexGrow: 1 , m:2}}>      
                    <Grid container sx={{m:'15px auto', borderRaduis:'20px', background:'#fffff8', boxShadow:4}} spacing={2} md={12} >
                   
                        <Grid item sm={6} >
                            
                            <FormControl fullWidth={true} >
                                                        
                                <TextField 
                                    value={descriptionEdit} 
                                    onChange={e=>setdescriptionEdit(e.target.value)} 
                                    variant="outlined" placeholder='Déscription'
                                    id="outlined-multiline-static"
                                    label="Déscription"
                                    multiline
                                    rows={8}
                                />       
                            </FormControl>
                        
                        </Grid>

                        <Grid item xs={6} sx={{p:2}}>
                        
                            <FormControl fullWidth={true} >
                                
                                <InputLabel >Poffesseur</InputLabel>
                                <Select
                                    
                                    value={userEdit? userEdit: ''}
                                    label="Poffesseur"
                                    onChange={e=>setuserEdit(e.target.value)}
                                    sx={{ m: 1 }}
                                    placeholder='Proffesseur'
                                    onClick={()=>getProf()}
                                >
                                    {
                                        user.length >0 ?(
                                            user && user.map((data)=>{
                                                return(
                                                <MenuItem value={data.id}>{data.last_name} {data.first_name}</MenuItem>
                                                )
                                            })
                                        ):(
                                            <MenuItem>Vide</MenuItem>
                                        )
                                    }
                                    

                                </Select>

                                <Divider />

                                <TextField 
                                    label="Nom" 
                                    value={nomEdit} 
                                    onChange={e=>setnomEdit(e.target.value)}
                                    variant="outlined" placeholder='Nom'
                                    sx={{ m: 1 }}
                                />
                                
                                
                                <Divider />
                            
                                
                                <TextField 
                                    label="date"
                                    type='date'
                                    value={dateEdit} 
                                    onChange={e=>setdateEdit(e.target.value)} 
                                    variant="outlined"
                                    placeholder='date'
                                    sx={{ m: 1 }}
                                
                                />
                                
                                
                                
                                

                                
                            </FormControl>
                        
                        </Grid>

                        <Divider />
                    
                        <Typography component='div' align='center' sx={{ m:'0 auto', p:1}}>
                            {
                            !nomEdit || !descriptionEdit || !dateEdit || !userEdit ?(
                                <Button color='text' variant='contained' disabled>Modifier</Button>
                            ):(
                                <Button 
                                  variant='contained'
                                  color='primary'
                                  onClick={()=> courUpdate()}
                                >Modifier</Button>
                            )
                            }
                            &nbsp;
                            <Button color='error' variant='contained' onClick={()=>closeModal()}>Annuler</Button>
                        </Typography>
                    
                    </Grid>
                </Box>

                            
            </Modal>

            <Modal
              isOpen={modalAddIsOpen}
              // onAfterOpen={afteropenModalAdd}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              ariaHideApp={false}
              // appElement={document.getElementById('app')}

            >
                
                <Box sx={{ flexGrow: 1 , m:2}}>
                    <Grid container spacing={0}>
                        <Grid item md={12} alignItems='center'>
                            <Item sx={{borderBottom:'#c8d8c8 1px solid', background:'#fffff8'}} md={4} align='center'>
                                <Typography variant='h6'>AJOUTER </Typography>
                            </Item>
                        </Grid>
                        {/* <Grid item xs={6}>
                        <Item sx={{borderBottom:'red 1px solid'}}><Typography variant='h6'>APPRENANTS <SchoolIcon/></Typography></Item>
                        </Grid> */}
                        
                    </Grid>
                </Box>

                <Box sx={{ flexGrow: 1 , m:2}}>
                
                    <Grid container sx={{m:'15px auto', borderRaduis:'20px', background:'#fffff8', boxShadow:4}} spacing={2} md={12} alignContent='center'>
        
                        <Grid item sm={6} >
                            
                                <FormControl fullWidth={true} >
                                                        
                                    <TextField 
                                        value={Capitalize(descriptionAdd)} 
                                        onChange={e=>{setdescriptionAdd(e.target.value)}} 
                                        variant="outlined" placeholder='Déscription'
                                        id="outlined-multiline-static"
                                        label="Déscription"
                                        multiline
                                        rows={8}
                                    />       
                                </FormControl>
                        
                        </Grid>

                        <Grid item xs={6} sx={{p:2}}>
                            
                                <FormControl fullWidth={true} >
                                    
                                    <InputLabel >Poffesseur</InputLabel>
                                    <Select
                                    
                                    value={userAdd}
                                    label="Poffesseur"
                                    onChange={e=>setuserAdd(e.target.value)}
                                    sx={{ m: 1 }}
                                    placeholder='Role'
                                    >
                                    {
                                        user && user.map((data,index)=>{
                                            return(
                                                <MenuItem key={index} value={data.id}>{data.last_name} {data.first_name}</MenuItem>
                                            )
                                        })
                                    }
                                    

                                    </Select>

                                    <Divider />

                                    <TextField 
                                        label="Nom" 
                                        value={Capitalize(nomAdd)} 
                                        onChange={e=>setnomAdd(e.target.value)}
                                        variant="outlined" placeholder='Nom'
                                        sx={{ m: 1 }}
                                    />
                                    
                                    
                                    <Divider />
                                
                                    
                                    <TextField 
                                        // id="outlined-password-input" 
                                        label="date"
                                        type='date'
                                        value={dateAdd} 
                                        // defaultValue={new Date().getDate()}
                                        onChange={e=>setdateAdd(e.target.value)} 
                                        variant="outlined"
                                        // defaultValue='jj/mm/aaaa'
                                        placeholder='date'
                                        InputProps={{InputProps: {min: "2022-04-17", max: "2023-05-04"} }}
                                        InputLabelProps={{ shrink: true, required: true }}
                                        sx={{ m: 1 }}
                                    
                                    />
                                    
                                    
                                    
                                    

                                    
                                </FormControl>
                            
                        </Grid>
                        <Divider />
                    
                        <Typography component='div' align='center' sx={{ m:'0 auto', p:1}}>
                            {
                                !descriptionAdd ||  !nomAdd  || !userAdd || !dateAdd  ?(
                                <Button color='text' variant='contained' disabled>Ajouter</Button>
                                ):(
                                <Button 
                                    variant='contained'
                                    color='primary'
                                    onClick={()=> 
                                        courRegistre()
                                    }
                                >Ajouter</Button>
                                )
                            }
                            &nbsp;
                            <Button color='error' variant='contained' onClick={()=>closeModal()}>Annuler</Button>
                        </Typography>
        
                    </Grid>
              
                </Box>

                   
                

            </Modal>

            

            <Typography >
                <IconButton 
                    variant="text" 
                    onClick={()=>openModalAdd()} 
                    title='Ajouter'
                    color='primary'
                    >
                    <PersonAdd sx={{color:'#009688'}}/>
                </IconButton> 
            </Typography>  

      </div>

      <ArchiveDialog/>
      <DisableDialog/>
      <EditDialog/>
      
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
} ;
export default TableUserCour
