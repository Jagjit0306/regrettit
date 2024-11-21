import React from "react";
import { useState } from "react";
import { Heading, Box } from "@chakra-ui/react";
import { containerStyle } from "../others/style";

function MainContainer(props) {
    let [width, setWidth] = useState(window.innerWidth)

    setInterval(()=>{
        if(window.innerWidth !== width) setWidth(window.innerWidth)
    },200)
    return (
        <Box style={containerStyle(width<950)}>
            {
            !props.heading?'':
            <>
                <Heading style={{textAlign:"center"}}>
                    {props.heading}
                </Heading>
            </>
            }
            {props.children}
        </Box>
    )
}

export default MainContainer