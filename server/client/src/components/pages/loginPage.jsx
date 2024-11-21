import { useState } from "react";
import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import login from "../../backend/login";

function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

function LoginForm() {

    let [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    function handleChange(e) {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    async function submitForm(){
        if(formData.username && formData.password) {
            const loginStatus = await login(formData)
            if(loginStatus) window.location.href = '/'
        }
        else alert('Fill the form first')
        setFormData({username:'', password:''})
    }

    return (
        <>
        <FormControl mt={4}>
            <FormLabel>Username</FormLabel>
            <Input
            placeholder='username'
            id='username'
            value={formData.username}
            onChange={handleChange}
            />
            <FormLabel>Password</FormLabel>
            <Input
            placeholder='password'
            id='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            />
        </FormControl>
        <Button colorScheme='blue' onClick={submitForm}>LOGIN</Button>
        </>
    )
}

async function handleAutoLogin_Fetch() {
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/validateToken', {
            method: "POST",
            body: JSON.stringify({token: getCookie('REFRESHTOKEN')}),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        if (response.status == 200) {
            const validity = await response.json()
            if(!validity) return false
            if(!validity.validity) return false
            return true
        }
        else return false
    }
    catch(e) {return e}
}

async function handleAutoLogin() {
    const autoLoginStatus = await handleAutoLogin_Fetch()
    if(autoLoginStatus) {
        console.log('Logged in automatically !')
        window.location.href = '/'
    }
    else console.log('No saved login found.')
}

function LoginPage() {

    setTimeout(handleAutoLogin)
    
    return (
        <>
        <LoginForm/>
        <br/>
        <Link to='/register'>
            <Button>Create an account</Button>
        </Link>
        </>
    )
}

export default LoginPage