import {Avatar, IconButton, Menu, MenuItem, Paper, useTheme} from "@mui/material";
import {useAppContext} from "../context/appContext";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {deepOrange} from "@mui/material/colors";

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
            <IconButton
                size="small"
                id="basic-button"
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                disableRipple
                sx={{
                    '& :hover': {
                        bgcolor: deepOrange[700],
                    }
                }}
            >
                <Avatar
                    component={Paper}
                    variant="square"
                    sx={{
                        mr: 2,
                        bgcolor: deepOrange[500]
                    }}
                >
                    {user.name[0]}
                </Avatar>

            </IconButton>

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