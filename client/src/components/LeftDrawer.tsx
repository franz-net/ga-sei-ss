import {Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme} from "@mui/material";
import {AddCircleOutlineOutlined, HomeOutlined} from "@mui/icons-material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function LeftDrawer() {
    const theme = useTheme();
    const navigate = useNavigate()
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        path: string
    ) => {
        setSelectedIndex(index)
        navigate(path)
    }


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

    )
}