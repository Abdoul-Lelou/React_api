import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CollapsibleTable from '../../components/Table_user';
import { Avatar, CssBaseline, ListItemAvatar, Typography } from '@mui/material';
import moment from 'moment';

const TableCour = ({disabledUser}) => {
  const [userDisabled, setUserDisabled] = React.useState('')
  const [cours, setCours] = React.useState('')

  const bearer_token= localStorage.getItem('tokenDjango'); 


  React.useEffect(() => {
    getCours()
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

  const getCours=()=>{
      
  
    return fetch("http://localhost:8000/api/cour", {
 
      method: 'GET',
             headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${bearer_token}`
          },
          
    }).then((res) => res.json())
      .then((res,index) => {
            setCours(res.data)
          //   console.log(res);
          
      })
      .catch((error) => {
          console.log(error)
      });
  }
   
  
 

  return (
    <>
      <CssBaseline/>
      <List  component="div" disablePadding sx={{ width: '100%', bgcolor: 'background.paper',   boxShadow: 2  }}
      id="scrollableDiv"
      style={{
      height: 300,
      overflow: 'auto',
      flexDirection: 'column-reverse',
      }}
  > 

  {
      cours ?(
        cours && cours.map((data,index)=>{
            return (
            <>
            <InfiniteScroll
                pageStart={0}
                loadMore='loadFunc'
                hasMore={true || false}
              //  loader={<div className="loader" key={0}>Loading ...</div>}
              
                scrollableTarget="scrollableDiv"
              >
              <ListItem alignItems="flex-start" md={4} key={index}>
                  <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                  primary={Capitalize(data.nom)}
                  secondary={
                      <>
                      <Typography
                            sx={{ display: 'inline-block', width: 200}}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            noWrap={true}
                      >
                            {data.description}
                      </Typography>
                      {" "}
                      <Typography align='right' variant='overline'>
                          {moment(data.created_at).format('YYYY-MM-DD HH:mm')}
                      </Typography>
                      </>
                  }
                  />
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
    </>
  )
}

export default TableCour
