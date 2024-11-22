import { background, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const bStyle = {
    fontSize:'large',
    fontWeight:'500',
    borderRadius:'5px',
    padding:"0px 5px",
    border:"1.5px solid lightgray",
}

export function SubsButton() {
    return (
        <>
            <Link to='/r'>
                <Text style={bStyle}>
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
                <Text style={bStyle}>
                    USERS
                </Text>
            </Link>
        </>
    )
}