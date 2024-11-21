async function newToken() {
    // 401 -> token not sent
    // 403 -> refresh token invalid
    try {
        const fetchResponse = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/token', {
          method: "POST",
          headers: { 'Content-Type': 'application/json',},
          credentials: 'include'
        })
        if(fetchResponse.status == 200){
          const data = await fetchResponse.json();
          return 'completed'
        }
        return 'token invalid'
    } catch (e) {
        return e;
    }
}

export default newToken