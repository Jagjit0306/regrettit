import { VStack, Text, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import MainContainer from "../UI/MainContainer";
import getData from "../../backend/getData";
import { useEffect, useState } from "react";

export default function UsersList() {
    const navigate = useNavigate()
    const toast = useToast()

    const [userlist, setUserlist] = useState()
    

    async function fetchUsers() {
        const response = await getData('/api/getallusers')
        if(response) setUserlist(response.data.data)
    }
    useEffect(()=>{
        fetchUsers()
    },[])

    function UserCards(props) {
        return(
            <VStack style={{width:"100%", border:"1px solid black", borderRadius:"5px", padding:"10px", margin:'auto'}}>
                {/* <Text>{JSON.stringify(props.data)}</Text> */}
                <Text>u/{props.data.username}</Text>
                <Text color={'gray'}>{props.data.name}</Text>
                <Button colorScheme="green" margin={'auto'} onClick={()=>{navigate(`/u/${props.data.username}`)}}>Checkkit</Button>
            </VStack>
        )
    }

    function Users(props){
        return (
            <VStack style={{margin:"40px 0px 40px 0px"}}>
            {
                props.data.map((p)=>(<UserCards data={p}/>))
            }
            </VStack>
        )
    }

    return (
        <MainContainer heading='Regretters'>
            {
                !(userlist&&userlist.length)?'No users exist... HOW ARE YOU SEEING THIS ???':
                <Users data={userlist} />
            }
        </MainContainer>
    )
}