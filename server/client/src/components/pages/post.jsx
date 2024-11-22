import { VStack, HStack, Text, Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import getData from "../../backend/getData"

export default function Post(props) {

    const [OP, setOP] = useState('loading...')
    const[votes, setVotes] = useState(props.data.upvotes-props.data.downvotes)

    useEffect(()=>{
        async function fetchOP() {
            const response = await getData('/api/getuserbyid', {id:props.data.OP})
            if(response) setOP(response.data.data.username)
        }
        fetchOP()
    },[props.data.OP])

    const [statuscode, setStatuscode] = useState(69)

    async function getvotestatus() {
        const response = await getData('/api/votestatus', {postid:props.data._id})
        if(response && response.data.statuscode!==statuscode) setStatuscode(response.data.statuscode)
    }
    useEffect(()=>{
        getvotestatus()
    })

    async function SubmitVote(upvote) {
        const response = await getData('/api/vote', {postid:props.data._id, upvote:upvote})
        if(response) {
            await getvotestatus()
            setVotes(response.data.newvotes)
        }
    }

    return (
        <VStack style={{border:"1px solid black", padding:'10px', margin:'20px', borderRadius:"5px"}}>
            <Text textAlign={'left'} width={'100%'}><b>{props.data.title||'Title not loaded :/'}</b></Text>
            <Text textAlign={'left'} width={'100%'} color='gray' fontSize={'small'}>
            {
                window.location.pathname.split('/')[1]==='r'?'':
                <a href={`/r/${props.data.sub}`}>
                r/{props.data.sub}
                </a>
            }
            {
                window.location.pathname.split('/')[1]==='u'?'':
                <>
                    {
                        !OP?'Loading...':
                        <a href={`/u/${OP}`}>
                        u/{OP}
                        </a>
                    }
                </>
            }
            </Text>
            {
                !props.data.image?'':
                <img src={`${props.data.image}`} style={{maxHeight:"35vh"}} alt='attatched_image'/>
            }
            {
                !props.data.content?"":
                <Box style={{padding:'15px', margin:'3px', width:"100%", border:"1px solid gray", borderRadius:"10px", textAlign:'justify'}}>
                    {props.data.content}
                </Box>
            }
            <HStack>
                <Box 
                    onClick={()=>{SubmitVote(true)}}
                    style={{padding:"2px", aspectRatio:"1", color:'white', border:(statuscode===2?'3px solid cyan':''), borderRadius:'2px', cursor:'pointer', userSelect:"none", backgroundColor:"red"}}
                >+</Box>
                <Text>{votes}</Text>
                <Box 
                    onClick={()=>{SubmitVote(false)}}
                    style={{padding:"2px", aspectRatio:"1", color:'white', border:(statuscode===3?'3px solid cyan':''), borderRadius:'2px', cursor:'pointer', userSelect:"none", backgroundColor:"blue"}}
                >-</Box>
            </HStack>
            <Text>STATUS CODE IS {statuscode}</Text>
        </VStack>
    )
}