import MainContainer from '../UI/MainContainer'
import { VStack, Text } from '@chakra-ui/react'
import Post from './post'
import { useState, useEffect } from 'react'
import getData from '../../backend/getData'

function HomePage() {

    const [homeposts, setHomeposts] = useState()

    useEffect(()=>{
        async function fetchPosts() {
            const response = await getData('/api/homepage')
            if(response) {setHomeposts(response.data.data); console.log(JSON.stringify(response))}
        }
        fetchPosts()
        console.log("homeposts are", homeposts)
    },[])

    return (
        <MainContainer heading={'The Second Page of the Internet'}>
            <br />
            {
                !(homeposts && homeposts.length)?
                <Text textAlign={'center'}> <br />
                    There seems to be nothing here...
                </Text>
                :
                <>
                {homeposts.map(p=>(<Post data={p}/>))}
                </>
            }
        </MainContainer>
    )
}

export default HomePage