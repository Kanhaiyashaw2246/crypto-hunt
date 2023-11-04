import React, { useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@mui/material';
import MuiAlert from '@material-ui/lab/Alert';

function AlertComp() {
    const {alert,setAlert} = CryptoState();


  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setAlert({open:false});
    };
  return (
    <>
      <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert>
            {/* <MuiAlert
                onClose={handleClose}
                elevation={10}
                variant="filled"
                severity={alert.type}
            >
                {alert.message}
            </MuiAlert> */}
            <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%' }}>
            {alert.message}
            </Alert>
        </Alert>
      </Snackbar>
    </>
  )
}

export default AlertComp
