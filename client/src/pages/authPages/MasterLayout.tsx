import {AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Outlet} from "react-router-dom";
import {useState} from "react";

export default function MasterLayout() {
    const [open, setOpen] = useState<any>(false);
    const toggleDrawer = () => {
        setOpen(!open)
    }


    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            {/*@ts-ignore*/}
            <AppBar position="fixed" open={open}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className="drawer"
                anchor="left"
                classes={{}}
            >
                <div>
                    <Typography variant="h5">
                        Menu
                    </Typography>
                </div>

            </Drawer>
            <div className="page">
                <Outlet/>
            </div>
        </Box>
    )
}