import {
    AppBar,
    Box,
    Container,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import {Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import {AddCircleOutlineOutlined, HomeOutlined, MenuOutlined} from "@mui/icons-material";

export default function MasterLayout() {

    const theme = useTheme();

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
            text: 'Home',
            icon: <HomeOutlined color="secondary"/>,
            path: '/'
        },
        {
            text: 'Add Reservation',
            icon: <AddCircleOutlineOutlined color="secondary"/>,
            path: '/calendar'
        },

    ]

    return (
        <Box
            sx={{
                display: 'flex',
            }}>


            {/*@ts-ignore*/}
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

                    <Typography>
                        Welcome
                    </Typography>
                </Toolbar>
            </AppBar>


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
                    <Typography variant="h5" sx={{padding: theme.spacing(2)}}>
                        Smash Studio
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

            <Container component="main" className="page">
                <Toolbar/>
                <Outlet/>
            </Container>
        </Box>
    )
}