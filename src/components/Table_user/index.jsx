import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import './index.css'
import { Avatar, CssBaseline, Divider, FormControl, Grid, InputLabel, MenuItem, rgbToHex, Select, Slide, Stack, TextField } from '@mui/material';
import Switch from '@mui/material/Switch';
import ArchiveIcon from '@mui/icons-material/Archive';
import EditIcon from '@mui/icons-material/Edit';
import { alpha, styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { PersonAdd, RefreshOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import DetailPanelCour from '../dialog/detailPanel';
import DetailPanelUser from '../dialog/detailPanelUser';
import CustomizedMenus from './custom_button';






function createData(last_name, first_name, email, role, status) {
  return {
    last_name,
    first_name,
    email,
    role,
    status,

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
    last_name: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    status: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
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
    background: '#c8d8c8',
    width: '60%',
    boxShadow: '2px'
  },
};

// Modal.setAppElement('main');

const TableUser = ({ userget, cours }) => {

  
  const [pageSize, setPageSize] = React.useState(5);
  const [rowSelected, setRowSelected] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [openArchive, setOpenArchive] = React.useState(false);
  const [openDisable, setOpenDisable] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  
  const [archived, setArchived] = useState(false)
  
  const [nomEdit, setnomEdit] = React.useState('');
  const [prenomEdit, setprenomEdit] = React.useState('')
  const [roleEdit, setroleEdit] = React.useState('')
  const [telEdit, settelEdit] = React.useState('');
  const [passwordEdit, setpasswordEdit] = React.useState('');
  const [emailEdit, setemailEdit] = React.useState('')
  const [userEditData, setuserEditData] = React.useState('')

  const [nomAdd, setnomAdd] = React.useState('');
  const [prenomAdd, setprenomAdd] = React.useState('')
  const [roleAdd, setroleAdd] = React.useState('')
  const [telAdd, settelAdd] = React.useState('');
  const [passwordAdd, setpasswordAdd] = React.useState('');
  
  
  const [emailAdd, setemailAdd] = React.useState('')
 
  const bearer_token = localStorage.getItem('tokenDjango');

  const theme = useTheme(); let subtitle;
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const matches = useMediaQuery('(min-width:900px)');
  const [modalEditIsOpen, setIsOpenEdit] = React.useState(false);
  const [modalAddIsOpen, setIsOpenAdd] = React.useState(false);
  const role= localStorage.getItem('roleLogin')


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
    return userEditData && userEditData.map(data => {
      setnomEdit(data.first_name);
      setprenomEdit(data.last_name);
      setroleEdit(data.role);
      setemailEdit(data.email);
      settelEdit(data.tel);
      setpasswordEdit(data.password)

    })
  }

  const toInputUppercase = e => {
    if (e.target.value !== '') {
      e.target.value = ("" + e.target.value.replace(/[^a-zA-Z ]/g, ""))[0].toUpperCase() + e.target.value.slice(1).toLowerCase();
    }
  }



  function afteropenModalEdit() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }


  function closeModal() {
    setIsOpenEdit(false);
    setIsOpenAdd(false);
  }


  function openModalAdd() {
    setIsOpenAdd(true);
    setOpenEdit(false)
  }


  function afteropenModalAdd() {
    subtitle.style.color = '#fff';
  }


  const notify = (msg) => toast(msg);
  const errorMsg = (icon, msg) => Toast.fire({
    icon: icon,
    title: msg
  })
  const Capitalize=(str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }



  const updateUser = (id) => {


    return fetch(`http://localhost:8000/api/user/${id}`, {

      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${bearer_token}`
      }, body: JSON.stringify({
        is_archive: true,
        is_active: false
      })

    }).then((res) => res.json())
      .then((res, index) => {
        if (res.status === 'success') {
          notify('Archivé')
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        }
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const disableUser = () => {

    if (rowSelected) {
      console.log(rowSelected)
      const id = rowSelected && rowSelected.map(value => {
        return value.id
      })
      const user_id = id.find(id => id !== null);

      return fetch(`http://localhost:8000/api/user/${user_id}`, {

        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${bearer_token}`
        }, body: JSON.stringify({
          is_active: false
        })

      }).then((res) => res.json())
        .then((res) => {

          setOpenDisable(false)
          notify('Désactivé')
          closeModal()
          // setDisabled(disabled ? false : true)
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        })
    }
  }

  const archiveUser = () => {

    if (rowSelected) {

      const user = rowSelected && rowSelected.map(value => {
        return value.id
      })
      const user_id = user.find(id => id !== null);

      return fetch(`http://localhost:8000/api/user/${user_id}`, {

        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${bearer_token}`
        },
        body: JSON.stringify({
          is_archive: true
        })

      }).then((res) => res.json())
        .then((res) => {

          if (res.status === 'success') {
            updateUser(user_id)
          }
          setArchived(archived ? false : true)
          setOpenArchive(false)
        })
        .catch((error) => {
          console.log(error)
        });
    }

  }


  const DisableDialog = () => {

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={openDisable}
          onClose={() => setOpenDisable(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"DÉSACTIVER?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous vraiment désactiver cet utilisateur
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setOpenDisable(false)} color='error'>
              Annuler
            </Button>
            <Button onClick={() => disableUser()} autoFocus>
              Désactiver
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const EditDialog = () => {

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"MODIFIER?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous vraiment modifier cet utilisateur
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setOpenEdit(false)} color='error'>
              Annuler
            </Button>
            <Button onClick={() => { UserUpdate(); openModalEdit() }} autoFocus>
              Modifier
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


  const ArchiveDialog = () => {

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={openArchive}
          onClose={() => setOpenArchive(false)}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"ARCHIVER?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Voulez-vous vraiment archiver cet utilisateur
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={() => setOpenArchive(false)} color='error'>
              Annuler
            </Button>
            <Button onClick={() => archiveUser()} autoFocus>
              Archiver
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }



  const UserUpdate = () => {

    const user = rowSelected && rowSelected.map(value => {
      return value
    })

    setuserEditData(user)

    return user && user.map(data => {
      setnomEdit(data.first_name);
      setprenomEdit(data.last_name);
      setroleEdit(data.role);
      setemailEdit(data.email);
      settelEdit(data.tel);
      setpasswordEdit(data.password)

    })
  }


  const userUpdateData = () => {


    if (rowSelected) {

      const id = rowSelected && rowSelected.map(value => {
        return value.id
      })
      const user_id = id.find(id => id !== null);

      fetch(`http://localhost:8000/api/user/${user_id}`, {

        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${bearer_token}`
        },
        body: JSON.stringify({
          first_name: nomEdit,
          last_name: prenomEdit,
          tel: telEdit,
          role: roleEdit,
          username: prenomEdit,
          email: emailEdit,
          // image: image,
          // is_archive: false
        })
      }).then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.status === 'success') {
            notify('Modifié')
            closeModal();
            setTimeout(() => {
              window.location.reload()
            }, 1000);
          } else {

            errorMsg('error', res.data.email || res.data.tel)
          }
        })

    }
  }


  const userRegistre = () => {

    fetch(`http://localhost:8000/api/user`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${bearer_token}`
      },
      body: JSON.stringify({
        email: emailAdd,
        password: passwordAdd,
        first_name: nomAdd,
        last_name: prenomAdd,
        tel: telAdd,
        role: roleAdd,
        username: prenomAdd,
        // image: image,
        is_archive: false,
        is_superuser: false

      })
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === 'success') {
          notify('Ajouté')
          closeModal()
          setTimeout(() => {
            window.location.reload()
          }, 1000);
        } else {
          errorMsg('error', res.data.email || res.data.tel)
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


  const columns = [
    {
      field: 'image', headerName: 'Img', width: 60,
      renderCell: ()=>(
        // userget && userget.map((data)=>{
        //   return(
            
            <Avatar  src={`http://127.0.0.1:8000/api`} />
        //   )
        // })
      )
    },
    { field: 'first_name', headerName: 'Prénom', width: 175 },
    { field: 'last_name', headerName: 'Nom', width: 130 },
    { field: 'email', headerName: 'Email', width: 210 },
    { field: 'role', headerName: 'Role', width: 110 },
    {
      field: 'is_active', headerName: 'Status', width: 68,

      renderCell: () => (
        <>
         
          <CustomizedMenus
            update_user={UserUpdate}
            openModalEdit={openModalEdit}
            setOpenDisable={openDisable}
            disableUser={disableUser}
            archiveUser={archiveUser}
            rowSelected={rowSelected}
            cours ={cours}
          />

        </>
      ),

    },
  ];

  return (
    <>
      <CssBaseline />

      {matches ?(
        <div
        style={{ height: 300, maxWidth: '100%', boxShadow: 8, background:'#fff' }}
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

          rows={userget}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = userget.filter((row) =>
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



          sx={{ paddingBottom: 0, borderBottom: '1px #009688 solid' }}
          autoPageSize
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          {...userget}
          loading={loading}
        />




        <Modal
          isOpen={modalEditIsOpen}
          // onAfterOpen={afteropenModalEdit}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
          appElement={document.getElementById('app')}
        >

          <Box sx={{ flexGrow: 1, m: 2 }}>
            <Grid container spacing={0}>
              <Grid item md={12} alignItems='center'>
                <Item sx={{ borderBottom: '#c8d8c8 1px solid', background: '#fffff8' }} md={4} align='center'>
                  <Typography variant='h6'>MODIFIER </Typography>
                </Item>
              </Grid>
              {/* <Grid item xs={6}>
                        <Item sx={{borderBottom:'red 1px solid'}}><Typography variant='h6'>APPRENANTS <SchoolIcon/></Typography></Item>
                        </Grid> */}

            </Grid>
          </Box>

          <Box sx={{ flexGrow: 1, m: 2 }}>

            <Grid container
              sx={{
                m: '15px auto',
                borderRaduis: '20px',
                background: rgbToHex('#fffff8'),
                boxShadow: 4
              }}
              spacing={2}
              md={12}
            >
              <Grid item sm={6} >

                <FormControl fullWidth={true} >

                  <TextField
                    // id="outlined-basic" 
                    label="NomEdit"
                    value={nomEdit}
                    onChange={e => setnomEdit(e.target.value)}
                    variant="outlined" placeholder='Nom'
                    sx={{ m: 1 }}
                  />


                  <Divider />


                  <TextField
                    // id="outlined-password-input" 
                    label="PrenomEdit"
                    value={prenomEdit}
                    onChange={e => setprenomEdit(e.target.value)}
                    variant="outlined" placeholder='Prenom'
                    sx={{ m: 1 }}
                  />


                  <Divider />

                  <TextField
                    // id="outlined-basic" 
                    label="EmailEdit"
                    value={emailEdit}
                    onChange={e => setemailEdit(e.target.value)}
                    variant="outlined" placeholder='@gmail.com'
                    sx={{ m: 1 }}
                  />





                </FormControl>
                {/* </Typography> */}
              </Grid>
              <Grid item xs={6} sx={{ p: 2 }}>

                <FormControl fullWidth={true} >

                  <InputLabel id="demo-simple-select-label-role">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label-role"
                    // id="demo-simple-select"
                    value={roleEdit}
                    label="RoleEdit"
                    onChange={e => setroleEdit(e.target.value)}
                    sx={{ m: 1 }}
                    placeholder='RoleEdit'
                  >
                    <MenuItem value='proffesseur'>Proffesseur</MenuItem>
                    <MenuItem value='apprenant'>Apprenant</MenuItem>

                  </Select>

                  <Divider />

                  <TextField
                    // id="outlined-basic" 
                    label="PasswordEdit"
                    type='password'
                    // value={passwordEdit} 
                    // onChange={e=>{setpasswordEdit(e.target.value)}}
                    variant="outlined" placeholder='PasswordEdit'
                    sx={{ m: 1 }}
                    disabled
                  />


                  <Divider />


                  <TextField
                    // id="outlined-password-input" 
                    label="TelEdit"
                    value={telEdit}
                    onChange={e => settelEdit(e.target.value)}
                    variant="outlined" placeholder='Tel'
                    sx={{ m: 1 }}
                  />





                </FormControl>
                {/* </Typography> */}
              </Grid>
              <Divider />
              {/* <Grid item a> */}
              <Typography align='center' sx={{ m: '0 auto', p: 1 }}>
                {
                  !emailEdit || !prenomEdit || !nomEdit || !roleEdit || !passwordEdit || !telEdit ? (
                    <Button color='primary' variant='contained' disabled>Modifier</Button>
                  ) : (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => userUpdateData()}
                    >Modifier</Button>
                  )
                }
                &nbsp;
                <Button color='error' variant='contained' onClick={() => closeModal()}>Annuler</Button>
              </Typography>
              {/* </Grid> */}
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
          appElement={document.getElementById('app')}
        >
          {/* <Typography  align='center' variant='h5' >
                      <p ref={(_subtitle) => (subtitle = _subtitle)}>Ajouter</p>
                </Typography> */}

          <Box sx={{ flexGrow: 1, m: 2 }}>
            <Grid container spacing={0}>
              <Grid item md={12} alignItems='center'>
                <Item sx={{ borderBottom: '#c8d8c8 1px solid', background: '#fffff8' }} md={4} align='center'>
                  <Typography variant='h6'>AJOUTER </Typography>
                </Item>
              </Grid>
              {/* <Grid item xs={6}>
                        <Item sx={{borderBottom:'red 1px solid'}}><Typography variant='h6'>APPRENANTS <SchoolIcon/></Typography></Item>
                        </Grid> */}

            </Grid>
          </Box>

          <Box sx={{ flexGrow: 1, m: 2 }}>

            <Grid
              container
              sx={{ m: '15px auto', borderRaduis: '20px', background: rgbToHex('#fffff8'), boxShadow: 4 }}
              spacing={2}
              // md={12}
            >

              <Grid item sm={6} >

                <FormControl fullWidth={true} >

                  <TextField
                    // id="outlined-basic" 
                    label="Nom"
                    value={Capitalize(nomAdd)}
                    onChange={e => { setnomAdd(e.target.value); toInputUppercase(e) }}
                    variant="outlined" placeholder='Nom'
                    sx={{ m: 1 }}
                  />


                  <Divider />


                  <TextField
                    // id="outlined-password-input" 
                    label="Prenom"
                    value={Capitalize(prenomAdd)}
                    onChange={e => setprenomAdd(e.target.value)}
                    variant="outlined" placeholder='Prenom'
                    sx={{ m: 1 }}
                  />


                  <Divider />

                  <TextField
                    // id="outlined-basic" 
                    label="Email"
                    value={Capitalize(emailAdd)}
                    onChange={e => setemailAdd(e.target.value)}
                    variant="outlined" placeholder='@gmail.com'
                    sx={{ m: 1 }}
                  />





                </FormControl>

              </Grid>

              <Grid item xs={6} sx={{ p: 2 }}>

                <FormControl fullWidth={true} >

                  <InputLabel id="demo-simple-select-label-role">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label-role"
                    // id="demo-simple-select"
                    value={roleAdd}
                    label="Role"
                    onChange={e => setroleAdd(e.target.value)}
                    sx={{ m: 1 }}
                    placeholder='Role'
                  >
                    <MenuItem value='proffesseur'>Proffesseur</MenuItem>
                    <MenuItem value='apprenant'>Apprenant</MenuItem>

                  </Select>

                  <Divider />

                  <TextField
                    // id="outlined-basic" 
                    label="Password"
                    type='password'
                    value={passwordAdd? passwordAdd: ''}                  
                    onChange={e => setpasswordAdd(e.target.value)}
                    variant="outlined" placeholder='PasswordAdd'
                    sx={{ m: 1 }}
                    autoComplete="off"
                  />


                  <Divider />


                  <TextField
                    // id="outlined-password-input" 
                    label="Tel"
                    value={telAdd}
                    onChange={e => settelAdd(e.target.value)}
                    variant="outlined" placeholder='Tel'
                    sx={{ m: 1 }}
                  />





                </FormControl>

              </Grid>
              <Divider />

              <Typography align='center' sx={{ m: '0 auto', p: 1 }}>
                {
                  !emailAdd || !prenomAdd || !nomAdd || !roleAdd || !passwordAdd || !telAdd ? (
                    <Button color='primary' variant='contained' disabled>Ajouter</Button>
                  ) : (

                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => userRegistre()}
                    >Ajouter</Button>
                  )
                }
                &nbsp;
                <Button color='error' variant='contained' onClick={() => closeModal()}>Annuler</Button>
              </Typography>

            </Grid>


          </Box>



        </Modal>

        {
          role ==='admin' &&
          <Typography >
            <IconButton
              variant="text"
              onClick={() => openModalAdd()}
              title='Ajouter'
            >
              <PersonAdd sx={{ color: '#009688' }} />
            </IconButton>
          {/* <IconButton 
                    variant="text" 
                    onClick={()=>window.location.reload()} 
                    title='Actualiser'
                    color='primary'
                    >
                    <RefreshOutlined />
                </IconButton>    */}

        </Typography>
        }

      </div>
      ):(
        <div
        style={{ height: 430, maxWidth: '100%', boxShadow: 8, background:'#fff' }}
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

          rows={userget}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = userget.filter((row) =>
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



          sx={{ paddingBottom: 0, borderBottom: '1px #009688 solid' }}
          autoPageSize
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          {...userget}
          loading={loading}
        />




        <Modal
          isOpen={modalEditIsOpen}
          // onAfterOpen={afteropenModalEdit}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
          appElement={document.getElementById('app')}
        >

          <Box sx={{ flexGrow: 1, m: 2 }}>
            <Grid container spacing={0}>
              <Grid item md={12} alignItems='center'>
                <Item sx={{ borderBottom: '#c8d8c8 1px solid', background: '#fffff8' }} md={4} align='center'>
                  <Typography variant='h6'>MODIFIER </Typography>
                </Item>
              </Grid>
              {/* <Grid item xs={6}>
                        <Item sx={{borderBottom:'red 1px solid'}}><Typography variant='h6'>APPRENANTS <SchoolIcon/></Typography></Item>
                        </Grid> */}

            </Grid>
          </Box>

          <Box sx={{ flexGrow: 1, m: 2 }}>

            <Grid container
              sx={{
                m: '15px auto',
                borderRaduis: '20px',
                background: rgbToHex('#fffff8'),
                boxShadow: 4
              }}
              spacing={2}
              md={12}
            >
              <Grid item sm={6} >

                <FormControl fullWidth={true} >

                  <TextField
                    // id="outlined-basic" 
                    label="NomEdit"
                    value={nomEdit}
                    onChange={e => setnomEdit(e.target.value)}
                    variant="outlined" placeholder='Nom'
                    sx={{ m: 1 }}
                  />


                  <Divider />


                  <TextField
                    // id="outlined-password-input" 
                    label="PrenomEdit"
                    value={prenomEdit}
                    onChange={e => setprenomEdit(e.target.value)}
                    variant="outlined" placeholder='Prenom'
                    sx={{ m: 1 }}
                  />


                  <Divider />

                  <TextField
                    // id="outlined-basic" 
                    label="EmailEdit"
                    value={emailEdit}
                    onChange={e => setemailEdit(e.target.value)}
                    variant="outlined" placeholder='@gmail.com'
                    sx={{ m: 1 }}
                  />





                </FormControl>
                {/* </Typography> */}
              </Grid>
              <Grid item xs={6} sx={{ p: 2 }}>

                <FormControl fullWidth={true} >

                  <InputLabel id="demo-simple-select-label-role">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label-role"
                    // id="demo-simple-select"
                    value={roleEdit}
                    label="RoleEdit"
                    onChange={e => setroleEdit(e.target.value)}
                    sx={{ m: 1 }}
                    placeholder='RoleEdit'
                  >
                    <MenuItem value='proffesseur'>Proffesseur</MenuItem>
                    <MenuItem value='apprenant'>Apprenant</MenuItem>

                  </Select>

                  <Divider />

                  <TextField
                    // id="outlined-basic" 
                    label="PasswordEdit"
                    type='password'
                    // value={passwordEdit} 
                    // onChange={e=>{setpasswordEdit(e.target.value)}}
                    variant="outlined" placeholder='PasswordEdit'
                    sx={{ m: 1 }}
                    disabled
                  />


                  <Divider />


                  <TextField
                    // id="outlined-password-input" 
                    label="TelEdit"
                    value={telEdit}
                    onChange={e => settelEdit(e.target.value)}
                    variant="outlined" placeholder='Tel'
                    sx={{ m: 1 }}
                  />





                </FormControl>
                {/* </Typography> */}
              </Grid>
              <Divider />
              {/* <Grid item a> */}
              <Typography align='center' sx={{ m: '0 auto', p: 1 }}>
                {
                  !emailEdit || !prenomEdit || !nomEdit || !roleEdit || !passwordEdit || !telEdit ? (
                    <Button color='primary' variant='contained' disabled>Modifier</Button>
                  ) : (
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => userUpdateData()}
                    >Modifier</Button>
                  )
                }
                &nbsp;
                <Button color='error' variant='contained' onClick={() => closeModal()}>Annuler</Button>
              </Typography>
              {/* </Grid> */}
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
          appElement={document.getElementById('app')}
        >
          {/* <Typography  align='center' variant='h5' >
                      <p ref={(_subtitle) => (subtitle = _subtitle)}>Ajouter</p>
                </Typography> */}

          <Box sx={{ flexGrow: 1, m: 2 }}>
            <Grid container spacing={0}>
              <Grid item md={12} alignItems='center'>
                <Item sx={{ borderBottom: '#c8d8c8 1px solid', background: '#fffff8' }} md={4} align='center'>
                  <Typography variant='h6'>AJOUTER </Typography>
                </Item>
              </Grid>
              {/* <Grid item xs={6}>
                        <Item sx={{borderBottom:'red 1px solid'}}><Typography variant='h6'>APPRENANTS <SchoolIcon/></Typography></Item>
                        </Grid> */}

            </Grid>
          </Box>

          <Box sx={{ flexGrow: 1, m: 2 }}>

            <Grid
              container
              sx={{ m: '15px auto', borderRaduis: '20px', background: rgbToHex('#fffff8'), boxShadow: 4 }}
              spacing={2}
              // md={12}
            >

              <Grid item sm={6} >

                <FormControl fullWidth={true} >

                  <TextField
                    // id="outlined-basic" 
                    label="Nom"
                    value={Capitalize(nomAdd)}
                    onChange={e => { setnomAdd(e.target.value); toInputUppercase(e) }}
                    variant="outlined" placeholder='Nom'
                    sx={{ m: 1 }}
                  />


                  <Divider />


                  <TextField
                    // id="outlined-password-input" 
                    label="Prenom"
                    value={Capitalize(prenomAdd)}
                    onChange={e => setprenomAdd(e.target.value)}
                    variant="outlined" placeholder='Prenom'
                    sx={{ m: 1 }}
                  />


                  <Divider />

                  <TextField
                    // id="outlined-basic" 
                    label="Email"
                    value={Capitalize(emailAdd)}
                    onChange={e => setemailAdd(e.target.value)}
                    variant="outlined" placeholder='@gmail.com'
                    sx={{ m: 1 }}
                  />





                </FormControl>

              </Grid>

              <Grid item xs={6} sx={{ p: 2 }}>

                <FormControl fullWidth={true} >

                  <InputLabel id="demo-simple-select-label-role">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label-role"
                    // id="demo-simple-select"
                    value={roleAdd}
                    label="Role"
                    onChange={e => setroleAdd(e.target.value)}
                    sx={{ m: 1 }}
                    placeholder='Role'
                  >
                    <MenuItem value='proffesseur'>Proffesseur</MenuItem>
                    <MenuItem value='apprenant'>Apprenant</MenuItem>

                  </Select>

                  <Divider />

                  <TextField
                    // id="outlined-basic" 
                    label="Password"
                    type='password'
                    value={passwordAdd? passwordAdd: ''}                  
                    onChange={e => setpasswordAdd(e.target.value)}
                    variant="outlined" placeholder='PasswordAdd'
                    sx={{ m: 1 }}
                    autoComplete="off"
                  />


                  <Divider />


                  <TextField
                    // id="outlined-password-input" 
                    label="Tel"
                    value={telAdd}
                    onChange={e => settelAdd(e.target.value)}
                    variant="outlined" placeholder='Tel'
                    sx={{ m: 1 }}
                  />





                </FormControl>

              </Grid>
              <Divider />

              <Typography align='center' sx={{ m: '0 auto', p: 1 }}>
                {
                  !emailAdd || !prenomAdd || !nomAdd || !roleAdd || !passwordAdd || !telAdd ? (
                    <Button color='primary' variant='contained' disabled>Ajouter</Button>
                  ) : (

                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => userRegistre()}
                    >Ajouter</Button>
                  )
                }
                &nbsp;
                <Button color='error' variant='contained' onClick={() => closeModal()}>Annuler</Button>
              </Typography>

            </Grid>


          </Box>



        </Modal>

        {
          role ==='admin' &&
          <Typography >
            <IconButton
              variant="text"
              onClick={() => openModalAdd()}
              title='Ajouter'
            >
              <PersonAdd sx={{ color: '#009688' }} />
            </IconButton>
          {/* <IconButton 
                    variant="text" 
                    onClick={()=>window.location.reload()} 
                    title='Actualiser'
                    color='primary'
                    >
                    <RefreshOutlined />
                </IconButton>    */}

        </Typography>
        }

      </div>
      )}
      


      <ArchiveDialog />
      <DisableDialog />
      <EditDialog />

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
};
export default TableUser
