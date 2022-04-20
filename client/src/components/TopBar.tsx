import {AppBar, IconButton, Toolbar, Typography, useTheme} from "@mui/material";
import {MenuOutlined} from "@mui/icons-material";
import {format} from "date-fns";
import UserButton from "./UserButton";

export default function TopBar() {
    const theme = useTheme();


    return (
        <AppBar
            position="fixed"
            sx={{
                width: 'calc(100% - 240px)'
            }}
            elevation={0}
        >
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
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