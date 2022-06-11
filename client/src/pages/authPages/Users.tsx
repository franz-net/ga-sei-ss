import {Box, Paper, Typography} from "@mui/material";
import {UserList} from "../../components";

export default function Users() {
    return (
        <>
            <Paper
                elevation={8}
            >
                <Box
                    sx={{
                        margin: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        fontWeight={600}
                        gutterBottom
                        sx={{
                            mt: 4,
                            mb: 4,
                            typography: {xs: 'h5', md: 'h4'}
                        }}>
                        Users
                    </Typography>
                </Box>
            </Paper>
            <UserList/>
        </>
    )
}