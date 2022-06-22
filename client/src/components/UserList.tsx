import {useAppContext} from "../context/appContext";
import {useEffect} from "react";
import {Box, Paper, Typography} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {Loader} from "./index";

const columns: GridColDef[] = [
    {field: 'email', headerName: 'e-mail', width: 130},
    {field: 'name', headerName: 'First Name', width: 130},
    {field: 'lastName', headerName: 'Last Name', width: 130},
    {field: 'role', headerName: 'Role', width: 130, sortable: true},
    
]

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
            <Box component='div' 
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    height: '400px'
                }}
            >
                <DataGrid
                    columns={columns}
                    rows={userList}
                />
            </Box>
        </>
    )
}