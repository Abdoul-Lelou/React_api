import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { Avatar, CssBaseline, Grid, IconButton, Input, InputAdornment, ListItemAvatar, Typography } from '@mui/material';
import moment from 'moment';
import { PersonAdd, SearchRounded } from '@mui/icons-material';

const TableCour = () => {

  const [cours, setCours] = React.useState('')
  const [searchInput, setsearchInput] = React.useState('')

  const bearer_token= localStorage.getItem('tokenDjango'); 


  React.useEffect(() => {
    getCours()
  }, [])
  

  const Capitalize=(str)=>{
    return str.charAt(0).toUpperCase() + str.slice(1);
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
            setCours(res.data)          
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
      cours?(
        cours && cours.map((data,index)=>{
            return (
            <>
            <InfiniteScroll
                pageStart={0}
                loadMore='loadFunc'
                hasMore={true}
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
              <Divider variant="inset" />

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
      <Grid container maxWidth='sm' sx={{background:'whhitesmoke', m:1}}>
              {/* <Grid item sx={{p:0}} alignContent='flex-end' xl={2}>
                  <PersonAddAltIcon/>
               
              </Grid> */}
              <Grid item sx={{p:0}} alignContent='flex-end' xl={6}>
             
                    <Typography variant='overline' align='center'>

                        <IconButton sx={{p:1}}>
                          <PersonAdd color='primary'/>
                        </IconButton>
                        &nbsp;
                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                              <InputAdornment position="start">
                                <SearchRounded />
                              </InputAdornment>
                            }
                            fullWidth={true}
                            sx={{ m: 0, width: '61ch' }}
                            placeholder='search....'
                            value={searchInput}
                            onChange={(e)=> setsearchInput(e.target.value)}
                          />

                        

                    </Typography>
                    
                   
                    
               
              </Grid>
          </Grid>
    </>
  )
}

export default TableCour
