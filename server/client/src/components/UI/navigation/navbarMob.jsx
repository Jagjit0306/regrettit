import { Flex, Box } from "@chakra-ui/react"

import HomeButton from "./components/homeButton"
import { SubsButton } from './components/actionButtons'

export default function NavbarMob() {
    return (
        <>
        <Box style={{
            backgroundColor: 'gray',
            width: '100vw',
            height: '8vh',
            color:'white'
        }}>
            <Flex alignItems={'center'} justifyContent={'space-between'} >
                <Flex style={{boxSizing:"border-box", width: '100%'}} justifyContent={'space-evenly'} alignItems={'center'}>
                    <SubsButton/>
                </Flex>
                <Flex alignItems='center' justifyContent={'center'}>
                    <HomeButton mobile/>
                </Flex>
                <Flex style={{boxSizing:"border-box", width: '100%'}} justifyContent={'space-evenly'} alignItems={'center'} >
                </Flex>
            </Flex>
        </Box>
        </>
    )
}