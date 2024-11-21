import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function SubsButton() {
    return (
        <>
            <Link to='/r'>
                <Text>
                    SUBS
                </Text>
            </Link>
        </>
    )
}

export function UsersButton() {
    return (
        <>
            <Link to='/u'>
                <Text>
                    USERS
                </Text>
            </Link>
        </>
    )
}