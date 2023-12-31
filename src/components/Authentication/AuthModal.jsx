import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import Login from './Login';
import Register from './Register';

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  borderRadius: 1,
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [value, setValue] =React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
      <Button
       variant='container' 
       style={{width : 85,height : 40, fontWeight : "bold", border : "1.5px solid "}}
       onClick={handleOpen}>Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <AppBar position='static' style={{backgroundColor : "transparent", color : "black"}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant='fullWidth'
                    style={{borderRadius : 10}}
                >
                    <Tab label="Login In"/>
                    <Tab label="Register"/>

                </Tabs>
            </AppBar>
            {value === 0 && <Login handleClose = {handleClose}/>}
            {value === 1 && <Register handleClose = {handleClose}/>}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}