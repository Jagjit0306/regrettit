import { Heading, Box } from '@chakra-ui/react'

import { heading, containerStyle } from '../others/style'
import MainContainer from '../UI/MainContainer'

function HomePage() {
    return (
        <MainContainer heading={'HOME PAGE'}>
                welcome to home page<br/>
        </MainContainer>
    )
}

export default HomePage