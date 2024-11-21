async function login(payload){
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/login', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json',},
        credentials: 'include'
      })
        if(response.status === 500) console.log('Couldnt Login due to server issue')
        else if(response.status === 401) console.log('Incorrect credentials')
        else if (response.status === 200){
          const data = await response.json()
          if(data){
            console.log('logged in')
            return true        
          }
        }
    }
    catch(e) {console.log(e)}
    
    return false
}

export default login