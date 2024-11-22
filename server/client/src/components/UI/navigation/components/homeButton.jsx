import { Box, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

function HomeButton() {

    const homeButtonStyle = {
        height: '6vh',
        // width: '6vh',
        padding:"0px 10px 0px 10px",
        userSelect: 'none',
        cursor: 'pointer',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:"0px 7px 0px 7px",
        borderColor:'black',
        borderStyle:'solid'
    }

    return (
        <>
            <Link to='/'>
                <Box style={homeButtonStyle}>
                    <Text fontSize={'large'} textDecoration={'underline'} color='black'>
                        regrettit
                    </Text>
                </Box>
            </Link>
        </>
    )
}

export default HomeButton