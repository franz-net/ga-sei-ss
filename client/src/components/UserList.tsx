import {useAppContext} from "../context/appContext";
import {useEffect} from "react";
import {Box, Paper, Typography} from "@mui/material";
import {Loader} from "./index";

export default function UserList() {
    const {getUserList, totalUsers, userList, isLoading} = useAppContext()

    useEffect(() => {
        getUserList()
    }, [])

    if (isLoading) {
        return <Paper><Loader/></Paper>
    }

    if (userList.length === 0) {
        return (
            <Paper>
                <Typography>
                    No Users found...
                </Typography>
            </Paper>
        )
    }

    return (
        <>
            <Typography color='secondary' sx={{ml: 1}}>
                {totalUsers} user {userList.length > 1 && 's'} found
            </Typography>
            <Box component='div' sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center'
            }}>
                {userList.map((user: any, index: number) => {
                        return (
                            <h1 key={index}>{user.name}</h1>
                        )
                    }
                )
                }
            </Box>
        </>
    )
}