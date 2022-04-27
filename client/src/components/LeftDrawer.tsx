import {
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import {AddCircleOutlineOutlined, FactCheckOutlined, HomeOutlined} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppContext} from "../context/appContext";
import {orange} from "@mui/material/colors";

interface LeftDrawerProps {
    drawerWidth: number

}

export default function LeftDrawer({drawerWidth,}: LeftDrawerProps) {
    const theme = useTheme();
    const navigate = useNavigate()
    const {pathname} = useLocation()
    // @ts-ignore
    const {showSidebar, toggleSidebar} = useAppContext()

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        path: string
    ) => {
        navigate(path)
    }


    const menuItems = [
        {
            text: 'Home',
            icon: <HomeOutlined color="secondary"/>,
            path: '/',
            roles: ['user', 'admin', 'instructor']
        },
        {
            text: 'Add Reservation',
            icon: <AddCircleOutlineOutlined color="secondary"/>,
            path: '/calendar',
            roles: ['user', 'admin', 'instructor']
        },
        {
            text: 'Courts',
            icon: <FactCheckOutlined color="secondary"/>,
            path: '/admin/courts',
            roles: ['admin']
        },
        {
            text: 'Add Court',
            icon: <FactCheckOutlined color="secondary"/>,
            path: '/admin/add-court',
            roles: ['admin']
        },

    ]

    const drawer = (
        <div>
            <Typography
                sx={{
                    typography: {xs: 'h5', md: 'h5'},
                    padding: theme.spacing(2),
                    flexGrow: '1',
                    margin: '0 auto',
                    textAlign: 'center'
                }}>
                Smash
                <Typography
                    component="span"
                    display="inline"
                    sx={{
                        typography: {xs: 'h5', md: 'h5'},
                        color: orange['A700']
                    }}
                >
                    Studio.
                </Typography>
            </Typography>
            <Divider/>

            <List>
                {menuItems.map((item, index) => (
                    <ListItemButton
                        key={index}
                        selected={item.path === pathname}
                        onClick={
                            (event) => handleListItemClick(event, index, item.path)
                        }>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text}/>
                    </ListItemButton>
                ))}
            </List>
        </div>
    )

    return (
        <Box
            component="nav"
            sx={{
                width: {sm: drawerWidth},
                flexShrink: {sm: 0}
            }}
        >
            {/* mobile drawer */}
            <Drawer
                variant="temporary"
                open={showSidebar}
                onClose={toggleSidebar}
                ModalProps={{
                    keepMounted: true,
                }}
                className="drawer"
                anchor="left"
                sx={{
                    display: {xs: 'block', sm: 'none'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
                }}
            >
                {drawer}
            </Drawer>

            {/* full width drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: {xs: 'none', sm: 'block'},
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth}
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    )
}