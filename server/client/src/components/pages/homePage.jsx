import MainContainer from '../UI/MainContainer'
import { Text } from '@chakra-ui/react'
import Post from './post'
import { useState, useEffect } from 'react'
import getData from '../../backend/getData'
import NewPost from '../others/newPost'

function HomePage() {

    const [homeposts, setHomeposts] = useState()
    const [subList, setSubList] = useState()

    async function fetchPosts() {
        const response = await getData('/api/homepage')
        if(response) {setHomeposts(response.data.data); setSubList(response.data.subs)}
    }
    useEffect(()=>{
        fetchPosts()
    },[])

    return (
        <MainContainer heading={'The Second Page of the Internet'}>
            {
                !subList?'':
                <NewPost refresh={fetchPosts} subs={subList} />
            }
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