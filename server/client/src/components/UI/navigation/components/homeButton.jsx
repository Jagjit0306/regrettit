import { Box, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

function HomeButton() {

    const homeButtonStyle = {
        height: '8vh',
        width: '8vh',
        userSelect: 'none',
        cursor: 'pointer',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
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