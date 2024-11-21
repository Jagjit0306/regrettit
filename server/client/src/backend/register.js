async function register(payload){
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/register', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json',},
        credentials: 'include'
      })
        if(response.status === 500) console.log('Couldnt Register due to server issue')
        else if(response.status === 409) alert('A user already exists with that username.')
        else if (response.status === 200){
          const data = await response.json()
          if(data){
            console.log('logged in')          
            window.location = '/'
          }
        }
    }
    catch(e) {console.log(e)}
}

export default register