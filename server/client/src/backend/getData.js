import getNewToken from "./getNewToken";

function toQuery(jsonValue) {
  jsonValue = JSON.stringify(jsonValue)
  jsonValue = jsonValue.replace(/{/g, "")
  jsonValue = jsonValue.replace(/}/g, "")
  jsonValue = jsonValue.replace(/:/g, "=")
  jsonValue = jsonValue.replace(/,/g, "&")
  jsonValue = jsonValue.replace(/"/g, "")
  jsonValue = jsonValue.replace(/ /g, "+")
  return jsonValue
}

async function getData(destination, payload) { //payload should be in JSON format
    const responses = await fetch((process.env.REACT_APP_BACKEND_URL+destination+'?'+toQuery(payload)), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
    if(!responses) {console.log("Server did not respond."); return {data:false, status: false}}
    else {
      if(responses.status == 403 || responses.status == 401) {
        const refreshAttempt = await getNewToken(()=>getData(...arguments))
        return refreshAttempt
      }   
      else if(responses.status == 200){
        let data = await responses.json()
        if (data) {
          return {data:data, status:responses.status}
        }
        else return {data:false, status:responses.status}
      } 
      else return{data: false, status: responses.status}
    }
}

export default getData