import { useParams } from "react-router"
import MainContainer from "../UI/MainContainer"
import { useEffect, useState } from "react"
import getData from "../../backend/getData"
import { Text, VStack, Heading, Divider } from "@chakra-ui/react"
import Post from "./post"

function timeDifferenceFromNow(timestamp) {
    const now = new Date();
    const targetDate = new Date(timestamp);

    // Get the total difference in milliseconds
    let diff = now - targetDate;

    // Ensure diff is positive (use Math.abs for absolute value if needed)
    diff = Math.abs(diff);

    // Time units in milliseconds
    const millisecondsInMinute = 1000 * 60;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;

    // Calculate days, hours, minutes
    const days = Math.floor(diff / millisecondsInDay);
    diff %= millisecondsInDay;

    const hours = Math.floor(diff / millisecondsInHour);
    diff %= millisecondsInHour;

    const minutes = Math.floor(diff / millisecondsInMinute);

    // Calculate years, months, and remaining days
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);
    const remainingDays = days % 365 % 30;

    return `${years} years ${months} months ${remainingDays} days ${hours} hours ${minutes} minutes`;
}

export default function User() {

    const {username} = useParams()
    const [userdata, setUserdata] = useState()

    useEffect(()=>{
        async function fetchUser(){
            const response = await getData('/api/getuserbyusername', {username: username})
            if(response) setUserdata(response.data.data)
            if(response) console.log(response.data.data)
        }
        fetchUser()
    },[])

    function Posts() {

        const [postData, setPostData] = useState()
        useEffect(()=>{
            async function fetchPosts() {
                const response = await getData('/api/getuserposts', {userid:userdata._id})
                if(response) setPostData(response.data.data)
            }
            fetchPosts()
        },[])

        return (
            <>
            <Heading style={{fontSize:"large", textAlign:"center",color:'white', textDecoration:"underline"}}>User Post History</Heading>
            {
                !(postData && postData.length)?
                <Text textAlign={'center'} color={'gray'}> <br />
                    There seems to be nothing here...
                    <br /><br />
                </Text>
                :
                <>
                {postData.map(p=>(<Post data={p}/>))}
                </>
            }
            </>
        )
    }

    return (
        <MainContainer heading={`u/${username}`}>
            {
                !userdata?'':
                <>
                <VStack style={{border:"1px solid lightgray",color:'white', padding:'20px', borderRadius:"15px", margin:'10px'}}>
                    <Text><b style={{color:'darkgray'}}>Name - </b>{userdata.name}</Text>
                    <Text><b style={{color:'darkgray'}}>Phone - </b>{userdata.phone}</Text>
                    <Text><b style={{color:'darkgray'}}>Email - </b>{userdata.email}</Text>
                    <Text><b style={{color:'darkgray'}}>Regretting Since - </b>{timeDifferenceFromNow(userdata.createdAt)}</Text>
                </VStack>
                <Divider marginBottom={'40px'}/>
                <Posts/>
                </>
            }
        </MainContainer>
    )
}