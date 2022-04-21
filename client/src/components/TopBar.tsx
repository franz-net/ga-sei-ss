import {AppBar, IconButton, Toolbar, Typography, useTheme} from "@mui/material";
import {MenuOutlined} from "@mui/icons-material";
import {format} from "date-fns";
import UserButton from "./UserButton";

interface TopBarProps {
    drawerWidth: number
    handleDrawerToggle: () => void
}

export default function TopBar({drawerWidth, handleDrawerToggle}: TopBarProps) {
    const theme = useTheme();


    return (
        <AppBar
            position="fixed"
            sx={{
                width: {sm: `calc(100% - ${drawerWidth}px)`},
                ml: {sm: `${drawerWidth}px`}
            }}
            elevation={0}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleDrawerToggle}
                    sx={{mr: 2, display: {sm: 'none'}}}>
                    <MenuOutlined/>
                </IconButton>

                <Typography sx={{flexGrow: 1}}>
                    Today is the {format(new Date(), 'do MMMM Y')}
                </Typography>

                <UserButton/>

            </Toolbar>
        </AppBar>
    )
}