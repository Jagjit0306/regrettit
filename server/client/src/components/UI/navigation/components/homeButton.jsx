import { Box, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom"

function HomeButton(props) {

    const homeButtonStyle = {
        border: '2px solid black',
        backgroundColor: 'white',
        borderRadius: '100%',
        height: '8vh',
        // aspectRatio:"1/1",
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
                    <Text color='black'>
                        Logo
                    </Text>
                </Box>
            </Link>
        </>
    )
}

export default HomeButton