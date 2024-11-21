import { Flex } from "@chakra-ui/react"
import { useNavigate } from "react-router"
import { FaArrowLeft } from 'react-icons/fa'

import LogoutButton from "./components/logoutButton"

function NavbarMobTop() {
    const navigate = useNavigate()

    return (
        <>
        <div style={{
            backgroundColor: 'gray',
            height: '8vh',
            color:'white',
            alignContent:'center'
        }}>
           <Flex alignItems={'center'} justifyContent={'space-between'} padding={'1em'}>
                <FaArrowLeft onClick={()=>navigate(-1)} size='2.5em'/>
                <LogoutButton/>
           </Flex>
        </div>
        </>
    )
}

export default NavbarMobTop