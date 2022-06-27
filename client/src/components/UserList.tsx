import {useAppContext} from "../context/appContext";
import {useEffect} from "react";
import {Box, IconButton, Paper, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
import {Loader} from "./index";
import { UserListStyledStatus } from "./UserListStyledStatus";

const columns = [
    {uid: 'name', name: 'Name'},
    {uid: 'email', name: 'E-mail'},
    {uid: 'role', name: 'Role'},
    {uid: 'disabled', name: 'Status'},
    {uid: "actions", name: "Actions"}
    
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

    const renderCell = (user:any, columnKey:any) => {
        const cellValue = user[columnKey]
        switch (columnKey) {
            case "name":
                return (
                    <Text b size={14} css={{tt:"capitalize"}}>
                        {user.name} {user.lastName}
                    </Text>
                )
            case "role":
                return (
                    <Text b size={14} css={{tt:"capitalize"}}>
                        {user.role}
                    </Text>
                )
            case "disabled":
                return (
                    <UserListStyledStatus
                        type={user.disabled?"disabled":"enabled"}
                    >
                        {user.disabled?"disabled":"enabled"}
                    </UserListStyledStatus>
                )
            case "actions":
                return (
                    <Row justify="center" align="center">
                        <Col css={{d: "flex"}}>
                            <Tooltip content="Delete">
                            <IconButton
                                aria-label="delete"
                                color="error"
                                //onClick={() => deleteUser(user.id)}
                                onClick={() => console.log(`will delete user ${user.id}`)}
                            >
                                <DeleteIcon />
                            </IconButton>
                            </Tooltip>
                        </Col>
                    </Row>
                )
                default:
                    return cellValue
        }
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
                <Table
                    aria-label="Users table"
                    css={{
                        height: "auto",
                        minWidth: "100%"
                    }}
                    selectionMode="none"
                >
                    <Table.Header columns={columns}>
                        {(column)=> (
                            <Table.Column
                                key={column.uid}
                                hideHeader={column.uid==="actions"}
                                align={column.uid==="actions"? "center":"start"}
                                >
                                    {column.name}
                                </Table.Column>
                        )}
                    </Table.Header>
                    <Table.Body items={userList}>
                        {(item)=> (
                            <Table.Row>
                                {(columnKey)=> (
                                    <Table.Cell>
                                        {renderCell(item, columnKey)}
                                    </Table.Cell>
                                )}
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Box>
        </>
    )
}