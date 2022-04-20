import {Box, Container, Toolbar, useTheme} from "@mui/material";
import {Outlet} from "react-router-dom";
import {LeftDrawer, TopBar} from "../../components";

export default function MasterLayout() {

    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
            }}>

            <TopBar/>
            <LeftDrawer/>
            <Container component="main" className="page">
                <Toolbar/>
                <Outlet/>
            </Container>
        </Box>
    )
}