import {Box, Container, Toolbar, useTheme} from "@mui/material";
import {Outlet} from "react-router-dom";
import {LeftDrawer, TopBar} from "../../components";
import {useState} from "react";

const drawerWidth = 240
export default function MasterLayout() {

    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = useState(false)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    return (
        <Box
            sx={{
                display: 'flex',
            }}>

            <TopBar
                drawerWidth={drawerWidth}
                handleDrawerToggle={handleDrawerToggle}

            />
            <LeftDrawer drawerWidth={drawerWidth}
                        handleDrawerToggle={handleDrawerToggle}
                        mobileOpen={mobileOpen}
            />
            <Container component="main" className="page">
                <Toolbar/>
                <Outlet/>
            </Container>
        </Box>
    )
}