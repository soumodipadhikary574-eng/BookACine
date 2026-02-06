import styled from "@emotion/styled";
import { useState } from "react";
import { FormControl, FormGroup, InputLabel, Input, TextField, Typography ,Button, Styled} from "@mui/material";
import { addUser } from "../service/api";
const Container= styled(FormGroup)
`width:50%;
margin:5% auto 0 auto;
&>div{
    margin-top:20px
}`
const initialValues={
    name: '',
    email: '',
    phno: '',
    password: ''
}
const Register=()=>{
    const [user,setUser]=useState(initialValues)
    const onValueChange=(e)=>{
       
        setUser({...user,[e.target.name]:e.target.value})
        console.log(user)
    }

    const addUserDetails=async()=>{
       await addUser(user);

    }
    return(
        //<p>Hello Register</p>
        <Container>
           
            <Typography variant="h3">Add User</Typography>
            <FormControl>
                <InputLabel>Name</InputLabel>
               <Input onChange={(e)=> onValueChange(e)}name="name"/>
            </FormControl>

            <FormControl>
                <InputLabel>Email </InputLabel>
                <Input onChange={(e)=> onValueChange(e)}name="email"/>
            </FormControl>
            <FormControl>

                <InputLabel>Phno</InputLabel>
                <Input onChange={(e)=> onValueChange(e)}name="phno"/>
            </FormControl>
            
            <FormControl>
            <TextField id="outlined-password-input"
             label="Password" 
            type="password"
            autoComplete="current-password" onChange={(e)=> onValueChange(e)}name="password"/>
         </FormControl>
         <FormControl>
         {/* <Button variant="contained">AddUser</Button> */}
         <Button onClick={()=>addUserDetails()}variant="contained">AddUser</Button>
         </FormControl>
        </Container>
    )
}
export default Register;