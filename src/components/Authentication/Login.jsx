import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'

function Login({handleClose}) {
  const fileds = ['email','password']
  const [registerData, setRegisterData] = useState({
      email : "",
      password : "",
  });

  const handleSubmit = () =>{

  }
  return (
    <>
         <Box p={3} style={{display:"flex", flexDirection:"column", gap :"20px",color:"white"}}>
        {fileds.map((val)=>
        <TextField
        style={{color:"white", margin:"1rem 1rem 0 1rem"}}
            variant='outlined'
            type = {val === 'confirmPassword' ? 'password' : val }
            label = {`Entre ${val}`}
            value=  { registerData.val}
            onChange={(e)=>{
                const value = e.target.value;
                const name  = e.target.name;
                
                setRegisterData((preVal)=>{
                    
                   return{ ...preVal,[name] : value}
                
                })
            }}
        />)}
        <Button 
          variant='contained'
          size='large'
          style={{backgroundColor:"#EEBC1D",margin:"1rem "}}
          onClick={handleSubmit}
        >
            Login in
        </Button>
      </Box>
    </>
  )
}

export default Login
