import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import TablePagination from '@mui/material/TablePagination';
import ReplayIcon from '@mui/icons-material/Replay';
import { useHistory } from 'react-router-dom';
import './index.css'
import { CssBaseline, Stack } from '@mui/material';
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

const loadServerRows=(cursor, data)=> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = cursor ? data.rows.findIndex((row) => row.id === cursor) : 0;
      const end = start + PAGE_SIZE;
      const rows = data.rows.slice(start, end);

      resolve({ rows, nextCursor: data.rows[end]?.id });
    }, Math.random() * 200 + 100); // simulate network latency
  });
}

  

const TableUser=({userget})=> {

    const bearer_token= localStorage.getItem('tokenDjango'); 
    const [user, setUser] = useState('');
    const [pageSize, setPageSize] = React.useState(5);
    const [rowSelected, setRowSelected] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [openArchive, setOpenArchive] = React.useState(false);
    const [openDisable, setOpenDisable] = React.useState(false);
    const [checked, setChecked] = React.useState(true);
    const [disabled, setDisabled] = useState(false)
    const [archived, setArchived] = useState(false)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  
  
    // const label = { inputProps: { 'aria-label': 'Switch demo' } };
    useEffect(() => {
    
        getUsers();
      
        return () => {
          setUser(''); 
        };   
    }, [ disabled, archived]);


    // const clickRow=()=>{ return true}
    

    const getUsers=()=>{
      
  
      return fetch("http://localhost:8000/api/user", {
    
          method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${bearer_token}`
              },
              
      }).then((res) => res.json())
          .then((res,index) => {
             if(res)
              { 
                setUser(res.filter(x=>x.is_active && !x.is_archive))
                setLoading(false);
              }
            
        })
        .catch((error) => {
            console.log(error)
        });
    }


    const updateUser=(id)=>{
      
  
      return fetch(`http://localhost:8000/api/user/${id}`, {
  
        method: 'PATCH',
               headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${bearer_token}`
            },body: JSON.stringify({
              is_archive : true,
              is_active : false
          })
            
      }).then((res) => res.json())
        .then((res,index) => {
            console.log(res);
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
        .then((res,index) => {
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
    
    const enableUser=()=>{
        
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
              is_active : true
          })
            
      }).then((res) => res.json())
        .then((res,index) => {
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


    const archiveUser=()=>{
      
      
      console.log( rowSelected)
      if(rowSelected){

        const id= rowSelected && rowSelected.map(value=>{
          return value.id
        })
        const user_id= id.find(id=> id !==null);
        
        return fetch("http://localhost:8000/api/archive_user", {
    
          method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${bearer_token}`
              },
              body: JSON.stringify({
                // email: email,
                // password: password,
                user: user_id
            })
              
        }).then((res) => res.json())
          .then((res,index) => {
                // setUser(res.filter(x=>x.is_active))
                // setLoading(false);
                console.log(res.status)
                if(res.status ==='success'){
                  updateUser(user_id)
                }
                setArchived(archived ? false: true)
                setOpenArchive(false)
          })
          .catch((error) => {
              console.log(error)
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
              {"DISABLE?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Voulez-vous vraiment désactivé cette utilisateur
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
              <Button onClick={()=>archiveUser()} autoFocus>
                Archiver
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    

  
        
    const columns = [
        { field: 'first_name', headerName: 'Prénom', width: 180 },
        { field: 'last_name', headerName: 'Nom', width: 100 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'role', headerName: 'Role', width: 100 },
        { field: 'is_active', headerName: 'Status', width: 150,

        renderCell: () => (
          <>
            <Switch   checked={checked}  onChange={()=>setOpenDisable(true)}/>
            
            <IconButton onClick={()=> setOpenArchive(true)}>
              <ArchiveIcon />
            </IconButton>
            <IconButton onClick={()=> true}>
              <EditIcon />
            </IconButton>

          </>
        ),

        },
    ];

    
            

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
      >
       
        <DataGrid 
          columns={columns} 
          rows={user}
          onSelectionModelChange={(ids) => {
            const selectedIDs = new Set(ids);
            const selectedRows = user.filter((row) =>
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
          //   Footer: () => 
          //     <>
          //       <IconButton onClick={()=>window.location.reload() }>
          //       <ReplayIcon />
          //     </IconButton>
          //     </>
          // ,
          }}

          // rows={user}
          // onCellClick={clickRow}

          sx={{paddingBottom:0}}
          autoPageSize
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          {...user}
          loading={loading}
        />
      </div>
      <ArchiveDialog/>
      <DisableDialog/>
      {/* <EnableDialog/> */}

    </> 

  );
} ;
export default TableUser
