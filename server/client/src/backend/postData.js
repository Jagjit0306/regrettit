import getNewToken from "./getNewToken";

async function postData(destination, payload) {
    try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL+destination, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        if (response.status == 403 || response.statud == 401) {
            const refreshAttempt = await getNewToken(()=>postData(...arguments))
            return refreshAttempt
        }
        else if(response.status == 200) {
            const data = await response.json()
            if(!data) return {data: false, status: response.status}
            return {data: data, status: response.status}
        }
        else return {data: false, status: response.status}

    }
    catch(e) {console.log('Error posting data',e);return {data: false, status: false}} // or even return e, who knows
}

export default postData