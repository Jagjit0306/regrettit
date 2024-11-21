import { VStack, HStack, Text, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import getData from "../../backend/getData"

export default function Post(props) {

    const [OP, setOP] = useState('loading...')

    useEffect(()=>{
        async function fetchOP() {
            const response = await getData('/api/getuserbyid', {id:props.data.OP})
            if(response) setOP(response.data.data.username)
        }
        fetchOP()
    },[props.data.OP])

    return (
        <VStack style={{border:"1px solid black", padding:'10px', margin:'20px', borderRadius:"5px"}}>
            <Text textAlign={'left'} width={'100%'}><b>{props.data.title||'Title not loaded :/'}</b></Text>
            <Text textAlign={'left'} width={'100%'} color='gray' fontSize={'small'}>
            {
                !OP?'Loading...':
                <a href={`/u/${OP}`}>
                u/{OP}
                </a>
            }
            </Text>
            {
                !props.data.image?'':
                <img src={`${props.data.image}`} style={{maxHeight:"25vh"}} alt='attatched_image'/>
            }
            {
                !props.data.content?"":
                <Box style={{padding:'15px', margin:'3px', width:"100%", border:"1px solid gray", borderRadius:"10px", textAlign:'justify'}}>
                    {props.data.content}
                </Box>
            }
            <HStack>
                <Box style={{padding:"2px", aspectRatio:"1", color:'white', borderRadius:'2px', cursor:'pointer', userSelect:"none", backgroundColor:"red"}}>+</Box>
                <Text>{props.data.upvotes - props.data.downvotes}</Text>
                <Box style={{padding:"2px", aspectRatio:"1", color:'white', borderRadius:'2px', cursor:'pointer', userSelect:"none", backgroundColor:"blue"}}>-</Box>
            </HStack>
        </VStack>
    )
}