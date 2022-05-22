import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import TableUser from '../../components/Table_user';
import TableDisabled from '../../components/Table_disabled';
import { PeopleAltRounded } from '@mui/icons-material';
import PersonOffIcon from '@mui/icons-material/PersonOff'; 


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MobileTabUser({userEnable,userDisabled }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mt:4}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', background:'#fff', width: '100%' }}>
        <Tabs value={value} onChange={handleChange} >
          <Tab label={<PeopleAltRounded />}{...a11yProps(0)} sx={{paddingRight:20}}/>
          <Tab label={<PersonOffIcon color='error'/>} {...a11yProps(1)}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} sx={{background:'#fff'}} >
            <TableUser userget={userEnable}/>  
      </TabPanel>
      <TabPanel value={value} index={1} sx={{background:'#fff'}} >
            <TableDisabled disabledUser={userDisabled}/>
      </TabPanel>
      
    </Box>
  );
}
