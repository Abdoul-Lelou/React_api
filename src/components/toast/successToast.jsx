import React from 'react';
import Button from '@mui/material/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';

function MyApp({msg}) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };

  
  return (
    <React.Fragment>
      <Button onClick={handleClickVariant('success')}>Show success</Button>
    </React.Fragment>
  );
}

export default function IntegrationNotistack({successMsg}) {
  return (
    <SnackbarProvider maxSnack={3}>
      <MyApp msg={successMsg}/>
    </SnackbarProvider>
  );
}
