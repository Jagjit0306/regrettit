import postData from "./postData"

async function checkTokens() {
    const response = await postData('/api/validateToken')
    if(!response.data.validity) window.location.href='/login'
}

export default checkTokens