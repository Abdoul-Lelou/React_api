import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { AutoStories } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Title() {
  return (
    <Box sx={{ flexGrow: 1 , m:2}}>
      <Grid container spacing={4} sx={{p:0}}>
        <Grid item xs={12}>
          <Item sx={{borderBottom:'green 1px solid'}}><Typography variant='h6'>ARCHIVES <AutoStories sx={{color:'#009688'}}/></Typography></Item>
        </Grid>
      </Grid>
    </Box>
  );
}
