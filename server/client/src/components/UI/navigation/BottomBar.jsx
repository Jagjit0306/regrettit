import NavbarMob from "./navbarMob"
import { useState } from "react"

function BottomBar() {

    let [width, setWidth] = useState(window.innerWidth)

    setInterval(()=>{
        if(window.innerWidth != width) setWidth(window.innerWidth)
    },200)

    return (
        <>
            {(width<=950)?(
                <NavbarMob/>
            ):''}
        </>
    )
}

export default BottomBar