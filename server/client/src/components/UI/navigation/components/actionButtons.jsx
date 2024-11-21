import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function PlaceButton() {
    return (
        <>
            <Link to='/errands'>
                <Text>
                    To_Place
                </Text>
            </Link>
        </>
    )
}