import {Avatar, Button, Menu, MenuItem, useTheme} from "@mui/material";
import {useAppContext} from "../context/appContext";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function UserButton() {
    // @ts-ignore
    const {logoutUser} = useAppContext()
    const theme = useTheme();
    // @ts-ignore
    const {user} = useAppContext();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = (path: string) => {
        if (path !== '') {
            navigate(path)
        }
        setAnchorEl(null)
    }
    return (
        <>
            <Button
                variant='contained'
                color='secondary'
                startIcon={<Avatar
                    sx={{
                        width: 25,
                        height: 25
                    }}
                    src='https://www.pinclipart.com/picdir/middle/91-910388_mario-transparent-head-mario-head-clipart-3000-3000.png'
                />}
                sx={{
                    borderRadius: '25px',
                    mr: theme.spacing(2),
                }}
                size="small"
                id="basic-button"
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                {user.name}
            </Button>

            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose('')}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}>
                <MenuItem onClick={() => handleClose('/profile')}>Profile</MenuItem>
                <MenuItem onClick={logoutUser}>Logout</MenuItem>
            </Menu>
        </>
    )
}