import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Text, Divider, VStack } from "@chakra-ui/react";

import MainContainer from "../UI/MainContainer";
import getData from "../../backend/getData";

import NewPost from "../others/newPost";
import Post from "./post";

export default function Sub() {
    const [subDes, setSubDes] = useState('subregret is loading...')
    const [subOwner, setOwner] = useState('Loading...')
    const {subname} = useParams()

    useEffect(()=>{
        async function getInfo() {
            const response = await getData('/api/getsub', {name: subname})
            if(response) {
                setSubDes(response.data.data.description)
                await fetchOwner(response.data.data.owner)
            }
        }
        getInfo()
    },[])

    async function fetchOwner(ownerid){
        const response = await getData('/api/getuserbyid', {id:ownerid})
        if(response) setOwner(response.data.data.username)
    }

    function Posts() {
        const [posts, setPosts] = useState()

        async function getposts() {
            const response = await getData('/api/getsubposts', {sub: subname})
            if(response) {console.log("retrieved posts ->", response.data.data);setPosts(response.data.data)}
        }
        useEffect(()=>{
            getposts()
        },[])

        return (
            <>
            <NewPost subs={[subname]} refresh={getposts} />
            <br />
            {
                !(posts&&posts.length)?
                'Currently, there are no posts in this subregrettit':
                <>
                {/* <VStack> */}
                {posts.map(p=>(<Post data={p}/>))}
                {/* </VStack> */}
                </>
            }
            </>
        )
    }

    return (
        <MainContainer heading={`r/${subname}`}>
            <Text textAlign={'center'} color={'gray'}><b>{subDes}</b></Text>
            <Text><b>Owned By -</b> {subOwner}</Text>
            <Divider marginBottom={'40px'}/>
            <Posts/>
        </MainContainer>
    )
}