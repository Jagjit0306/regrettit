import { Flex } from "@chakra-ui/react"

import HomeButton from "./components/homeButton"
import LogoutButton from "./components/logoutButton"
import { SubsButton, UsersButton } from './components/actionButtons'

export default function Navbar() {
    return (
        <>
        <div style={{
            backgroundColor: '#e74727',
            height: '8vh',
            color:'white'
        }}>
            <Flex alignItems={'center'} justifyContent={'space-between'} >
                <Flex style={{boxSizing:"border-box", width: '100%'}} justifyContent="space-evenly">
                    <SubsButton/>
                    <UsersButton/>
                </Flex>
                <Flex alignItems='center' justifyContent={'center'}>
                    <HomeButton/>
                </Flex>
                <Flex style={{boxSizing:"border-box", width: '100%'}} justifyContent={'flex-end'} alignItems={'center'} >
                    <div style={{marginRight:"20px"}}>
                    <LogoutButton/>
                    </div>
                </Flex>
            </Flex>
        </div>
        </>
    )
}