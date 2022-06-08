import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Chip, Typography, useMediaQuery } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Archive from '@mui/icons-material/Archive';
import { PeopleAltRounded } from '@mui/icons-material';
import PersonOffIcon from '@mui/icons-material/PersonOff'; 


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Title() {
  const matches = useMediaQuery('(min-width:900px)');
  return (
    <>
      {
        matches?(
          <Box sx={{ flexGrow: 1 , m:2}}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Item sx={{borderBottom:'green 1px solid'}}><Typography variant='h6'>ENABLE <PeopleAltRounded sx={{color:'#009688'}}/></Typography></Item>
              </Grid>
              <Grid item xs={4}>
                <Item sx={{borderBottom:'red 1px solid'}}><Typography variant='h6'>DISABLED <PersonOffIcon sx={{color:'#009688'}}/></Typography></Item>
              </Grid>
            </Grid>
          </Box>
        ):(
       
              <Grid item md={6} sx={{mt:1}}>
                <Item sx={{borderBottom:'green 1px solid'}}>
                {/* <Typography variant='h6'>ENABLE <PeopleAltRounded sx={{color:'#009688'}}/></Typography> */}
                    <Chip clickable label="ENABLE" color='success'/>
                </Item>
              </Grid>
          
        )
      }
    </>

  )
}
