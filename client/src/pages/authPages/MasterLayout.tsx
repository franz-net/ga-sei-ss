import {Container} from "@mui/material";
import {Outlet} from "react-router-dom";

export default function MasterLayout() {
    return (
        <Container>
            <div>Layout</div>
            <Outlet/>
        </Container>
    )
}