import { VStack, HStack, Text, Box, Center } from "@chakra-ui/react"
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
        <VStack style={{border:"2px solid #2b3236", padding:'10px', color:'white', margin:'20px', borderRadius:"5px"}}>
            <Text textAlign={'left'} margin={'0px 0px -10px 0px'} width={'100%'} color='lightgray' fontSize={'small'}>
            {
                window.location.pathname.split('/')[1]==='r'?'':
                <a href={`/r/${props.data.sub}`}>
                r/{props.data.sub}
                </a>
            }
            </Text>
            <Text textAlign={'left'} margin={0} width={'100%'}><b>{props.data.title||'Title not loaded :/'}</b></Text>
            <Text textAlign={'left'} margin={'-10px 0px 0px 0px'} width={'100%'} color='lightgray' fontSize={'small'}>
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
                <img src={`${props.data.image}`} style={{maxHeight:"35vh", borderRadius:"15px", border:'1px solid gray'}} alt='attatched_image'/>
            }
            {
                !props.data.content?"":
                <Box style={{padding:'15px', margin:'3px', width:"100%", 
                border:"1px solid gray", borderRadius:"10px", textAlign:'justify',
                    backgroundColor:'#2b3236'}}>
                    {props.data.content}
                </Box>
            }
            <HStack>
                <Center 
                    onClick={()=>{SubmitVote(true)}}
                    style={{fontWeight:"800", color:(statuscode===2?'white':'red'), border:(statuscode===2?'':'3px solid red'), 
                        borderRadius:'5px', cursor:'pointer', userSelect:"none", backgroundColor:(statuscode===2?"red":''),
                        fontSize:"1.4rem", height:"5vh", width:"5vh"
                    }}
                >
                <Text>+</Text></Center>
                <Text color={statuscode===1?'darkgray':(statuscode===2?'red':'#4f3ef5')} fontWeight={'800'} fontSize={'large'}>{votes}</Text>
                <Center 
                    onClick={()=>{SubmitVote(false)}}
                    style={{fontWeight:"800", color:(statuscode===3?'white':"#4f3ef5"), border:(statuscode===3?'':'3px solid #4f3ef5'), 
                        borderRadius:'5px', cursor:'pointer', userSelect:"none", backgroundColor:(statuscode===3?"#4f3ef5":''),
                        fontSize:"1.4rem", height:"5vh", width:"5vh"
                    }}
                >
                <Text>-</Text></Center>
            </HStack>
            {/* <Text>STATUS CODE IS {statuscode}</Text> */}
        </VStack>
    )
}