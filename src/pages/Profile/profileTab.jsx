import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ControlledAccordions from '../../components/user_Profile/info_user';
import InfoIcon from '@mui/icons-material/Info';
import EditAccordions from '../../components/user_Profile/edit_userProfile';
import LockResetIcon from '@mui/icons-material/LockReset';
import FolderSharedRoundedIcon from '@mui/icons-material/FolderSharedRounded';

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

export default function BasicTabs({userLogin}) {
  const [value, setValue] = React.useState(0);

  const handleChange = ( newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', background:'#fff' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {/* <Tab label={<Typography>INFO</Typography>}{...a11yProps(0)} /> */}
          <Typography align='center' sx={{ml:'42%'}}><FolderSharedRoundedIcon fontSize='large' /></Typography>
          {/* <Tab label={<InfoIcon />}{...a11yProps(1)} />
          <Tab label={<LockResetIcon />} {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
            <ControlledAccordions userLogin={userLogin} />
             {/* <EditAccordions userLogin={userLogin} /> */}
      </TabPanel>
      {/* <TabPanel value={value} index={1}>
      </TabPanel>
      <TabPanel value={value} index={2}>
            <ControlledAccordions />
      </TabPanel> */}
    </Box>
  );
}
