import {AppBar, IconButton, Toolbar, Typography, useTheme} from "@mui/material";
import {MenuOutlined} from "@mui/icons-material";
import {format} from "date-fns";
import UserButton from "./UserButton";
import {useAppContext} from "../context/appContext";

interface TopBarProps {
    drawerWidth: number

}

export default function TopBar({drawerWidth}: TopBarProps) {
    const theme = useTheme();

    // @ts-ignore
    const {toggleSidebar} = useAppContext()


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
                    onClick={toggleSidebar}
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