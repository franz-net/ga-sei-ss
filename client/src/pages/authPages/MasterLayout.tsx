import {Box, CssBaseline, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import {AddCircleOutlineOutlined, SubjectOutlined} from "@mui/icons-material";

export default function MasterLayout() {
    const [open, setOpen] = useState<any>(false);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const toggleDrawer = () => {
        setOpen(!open)
    }

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        path: string
    ) => {
        setSelectedIndex(index)
        navigate(path)
    }

    const navigate = useNavigate()

    const menuItems = [
        {
            text: 'dashboard',
            icon: <SubjectOutlined color="secondary"/>,
            path: '/'
        },
        {
            text: 'Add Reservations',
            icon: <AddCircleOutlineOutlined color="secondary"/>,
            path: '/calendar'
        },

    ]

    return (
        <Box
            sx={{
                display: 'flex',
            }}>
            <CssBaseline/>
            {/*@ts-ignore*/}
            {/*<AppBar position="fixed">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>*/}
            <Drawer
                variant="permanent"
                className="drawer"
                anchor="left"
                sx={{
                    width: 240,
                    '& .MuiPaper-root': {
                        width: 240
                    }
                }}
            >
                <div>
                    <Typography variant="h5">
                        Menu
                    </Typography>
                </div>
                <List>
                    {menuItems.map((item, index) => (
                        <ListItemButton
                            key={index}
                            selected={selectedIndex === index}
                            onClick={
                                (event) => handleListItemClick(event, index, item.path)
                            }>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    ))}
                </List>

            </Drawer>
            <div className="page">
                <Outlet/>
            </div>
        </Box>
    )
}