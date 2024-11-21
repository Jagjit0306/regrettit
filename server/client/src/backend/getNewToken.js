import newToken from "./refreshToken"

async function getNewToken(todo) {
    console.log('Token Expired... Attempting to refresh Access Token')
    let approval = await newToken()
    if (approval == 'completed') {
      console.log('ready to fetch data again')
      const data = await todo()
      return data
    }
    else if (approval == 'token invalid'){
      // logout or something
      console.log('approval says token is invalid')
      console.log("Couldnt verify. Logging out.")
      window.location.href='/login'
      return false
    }
}

export default getNewToken