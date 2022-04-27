import {Box, Container, Toolbar, useTheme} from "@mui/material";
import {Outlet} from "react-router-dom";
import {Footer, LeftDrawer, TopBar} from "../../components";
import {useState} from "react";
import {lightGreen, teal} from "@mui/material/colors";

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

            <TopBar drawerWidth={drawerWidth}/>
            <LeftDrawer drawerWidth={drawerWidth}/>

            {/* Main Content will render here... */}
            <Box
                component="main"
                sx={{
                    backgroundColor: theme.palette.mode === 'light'
                        ? lightGreen[50]
                        : teal[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto'
                }}
            >
                <Toolbar/>
                <Container
                    maxWidth="lg"
                    sx={{
                        mt: 4,
                        mb: 4,
                        minHeight: 'calc(80vh - 60px)',
                    }}
                >
                    <Outlet/>
                </Container>
                <Footer/>
            </Box>

        </Box>
    )
}