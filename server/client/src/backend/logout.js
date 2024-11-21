import getNewToken from "./getNewToken";
  
async function logout() { 
    try {
      const fetchResponse = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/logout', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include'
      })
      if(fetchResponse.status === 200) {
        console.log('Logged out successfully.')
        window.location.href='/login'
      }
      else if(fetchResponse.status === 403){ // also use code 401 ?
        getNewToken(logout)
      }
  } 
  catch (e) {
      return false;
  }
}

export default logout