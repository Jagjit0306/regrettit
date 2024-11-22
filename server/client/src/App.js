import './App.css';

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

import LoginPage from './components/pages/loginPage'
import RegisterPage from './components/pages/registerPage';
import HomePage from './components/pages/homePage';
import SubsList from './components/pages/subsList';
import Sub from './components/pages/sub';
import UsersList from './components/pages/usersList';
import User from './components/pages/users';

function App() {

  async function checkLoginStatus() {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/validateToken', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include'
      })
      if (response.status === 200) {
          const validity = await response.json()
          if(!validity) return false
          if(!validity.validity) return false
          return true
      }
      else return false
    } catch(e) {return false}
  }

  function Dummy(props) {
    const [loginState, setLoginState] = useState(0)// 0 for nothing, 1 for destination
    useEffect(()=>{
      console.log('running verification')
      const logInVerification = async ()=>{
        const loggedIn = await checkLoginStatus()
        if(loggedIn){
          console.log("auto log in successful")
          setLoginState(1)
        }
        else {
          window.location.href='/login'
        }
      }
      logInVerification()
    },[])

    return (
      <>
        {loginState?
          props.element
        :''}
      </>
    )
  }

  return (
    <div
      className='App'
    >

        <Routes>
          <Route path='/login' element = {<LoginPage/>} />
          <Route path='/register' element = {<RegisterPage/>} />
          <Route path='/' element = {<Dummy element={<HomePage/>}/>} />
          <Route path='/r' element = {<Dummy element={<SubsList/>}/>} />
          <Route path='/r/:subname' element = {<Dummy element={<Sub/>}/>} />
          <Route path='/u' element = {<Dummy element={<UsersList/>}/>} />
          <Route path='/u/:username' element = {<Dummy element={<User/>}/>} />
        </Routes>
    </div>
  );
}

export default App;
