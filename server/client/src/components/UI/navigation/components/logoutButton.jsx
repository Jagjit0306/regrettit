import { Button } from "@chakra-ui/react";

import logout from "../../../../backend/logout";

function LogoutButton () {
    return (
        <>
            <Button colorScheme="gray" color='red' size='sm' onClick={logout}>
                LOGOUT
            </Button>
        </>
    )
}

export default LogoutButton