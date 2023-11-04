import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

function Register({handleClose}) {

    const {setAlert} = CryptoState();
    const fileds = ['email','password','confirmPassword']
    const [registerData, setRegisterData] = useState({
        email : "",
        password : "",
        confirmPassword : ""
    });

  

    const handleSubmit = async () =>{

      if(registerData.password !== registerData.confirmPassword){
        setAlert({
          open : true,
          message: "passwords do not match",
          type:'error',

        });
      return;
      }

      try{
        const result = await createUserWithEmailAndPassword(auth,registerData.email,registerData.password);
        setAlert({
          open : true,
          message:`Sign Up Successful. Welcome ${result.user.email}`,
          type:"success",                                   
        })
        console.log(result)
        handleClose()
      }catch(err){
        setAlert({
          open : true,
          message: err.message,
          type:"error",                                   
        })
      }
      
    };




  return (
    <>
    {JSON.stringify(registerData)}
      <Box p={3} style={{display:"flex", flexDirection:"column", gap :"20px",color:"white"}}>
        {fileds.map((val)=>
        <TextField
        style={{color:"white", margin:"1rem 1rem 0 1rem"}}
            variant='outlined'
            type = {val === 'confirmPassword' ? 'password' : val }
            label = {`Entre your ${val}`}
            value=  { registerData.val}
            name={val}
            onChange={(e)=>{
                let value = e.target.value;
                let name  = e.target.name;
                
                setRegisterData((preVal)=>{
                    
                   return{ ...preVal,[name]: value}
                
                })
            }}
        />)}
        <Button 
          variant='contained'
          size='large'
          style={{backgroundColor:"#EEBC1D",margin:"1rem "}}
          onClick={handleSubmit}
        >
            Register
        </Button>
      </Box>
    </>
  )
}

export default Register
