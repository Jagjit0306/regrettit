
import { Box } from "@chakra-ui/react"

import Navbar from "./navbar"
import NavbarMobTop from "./navbarMobTop"
import { useState, useEffect } from "react"
import { useLocation } from "react-router"

// const checkTokens = require('../../../backend/checkTokens')
import checkTokens from "../../../backend/checkTokens"



function TopBar() {
    const location = useLocation()
    useEffect(()=>{

        const checkTokensBooster = async ()=>{ // this will log you out if you lose hold of your refresh tokens at any point
            const pageLocation = window.location.pathname.split('?')[0].split('/')[1]
            if(!(pageLocation === 'login' || pageLocation === 'register')) await checkTokens()
            else return
        }

        checkTokensBooster()

    },[location.pathname])

    let [width, setWidth] = useState(window.innerWidth)

    setInterval(()=>{
        if(window.innerWidth !== width) setWidth(window.innerWidth)
    },200)

    return (
        <Box zIndex={'100'}>
            {(width>950)?(
                <Navbar/>
            ):(
                <NavbarMobTop/>
            )}
        </Box>
    )
}

export default TopBar