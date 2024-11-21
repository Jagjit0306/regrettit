import { useState, useEffect } from "react";
import {FormControl, FormLabel, Input, Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import register from "../../backend/register";

let availability = false

function CheckAvailability(props) {
    let [availStatus, setAvailStatus] = useState(false)

    const setAvailStatus0 = (stat)=>{
        if(availStatus != stat){
            setAvailStatus(stat)
            availability = stat
        }
    }

    useEffect(()=>{
        if(!props.username) return
        fetch((process.env.REACT_APP_BACKEND_URL+'/api/usernameCheck?username='+props.username), {
              method: "GET",
              headers: { 'Content-Type': 'application/json',}
            }).then(response=>response.json()).then(data=>{
                if(data.exists) setAvailStatus0(false)
                else setAvailStatus0(true)
            })
    })

    return(
        <>
            {availStatus?(
                <p>This username is available.</p>
            ):(
                <p>This username is taken.</p>
            )}
        </>
    )
}

function RegisterForm() {

    let [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
        phone: ''
    })

    function handleChange(e) {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    async function submitForm(){
        if(formData.username && formData.password) {
            if (availability) {
                const response = await register(formData)
                if(response) window.location.href='/'
            }
            else alert('That username is taken. Please choose another one.')
        }
        else alert('Fill the form first')
        setFormData({username:'', password:'', name:'', phone:'', email:''}) // is this even needed ?
    }

    return (
        <>
        <FormControl mt={4}>
            <FormLabel>Name</FormLabel>
            <Input
            placeholder='name'
            id='name'
            value={formData.name}
            onChange={handleChange}
            />
            <FormLabel>Username</FormLabel>
            <Input
            placeholder='username'
            id='username'
            value={formData.username}
            onChange={handleChange}
            />
            {formData.username?(
                <CheckAvailability username={formData.username} />
            ):('')}
            <FormLabel>Password</FormLabel>
            <Input
            placeholder='password'
            id='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            />
            <FormLabel>Email</FormLabel>
            <Input
            placeholder='email'
            id='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            />
            <FormLabel>Phone</FormLabel>
            <Input
            placeholder='phone'
            id='phone'
            type='number'
            value={formData.phone}
            onChange={handleChange}
            />
        </FormControl>
        <Button colorScheme='blue' onClick={submitForm}>REGISTER</Button>
        </>
    )
}

function RegisterPage() {
    return (
        <>
        <RegisterForm/>
        <br/>
        <Link to='/'>
        <Button>Login</Button>
        </Link>
        </>
    )
}

export default RegisterPage