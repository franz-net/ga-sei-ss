import React from 'react';
import {Landing, NotFoundError, ProtectedRoute, Signup} from './pages';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {
    AddCourt,
    AddReservation,
    Courts,
    Dashboard,
    MasterLayout,
    Profile,
    Reservations,
    Users
} from "./pages/authPages";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: "Quicksand",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700
    },
    palette: {
        primary: {
            main: '#009688',
            light: '#33AB9F',
            dark: '#00695F'
        },
        secondary: {
            main: '#ff6d00',
            light: '#ff8a33',
            dark: '#b24c00',
        }
    }
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <ProtectedRoute>
                            <MasterLayout/>
                        </ProtectedRoute>
                    }>
                        {/* Roles: [user, admin, instructor] */}
                        <Route index element={<Dashboard/>}/>
                        <Route path='/reservations' element={<Reservations/>}/>
                        <Route path='/add-reservation' element={<AddReservation/>}/>
                        <Route path='/profile' element={<Profile/>}/>

                        {/* Roles: [admin] */}
                        <Route path='/admin/courts' element={<Courts/>}/>
                        <Route path='/admin/add-court' element={<AddCourt/>}/>
                        <Route path='/admin/users' element={<Users/>}/>
                        {/*

                        <Route path='/admin/stats' element={<Stats/>}/>
                        */}

                    </Route>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/landing" element={<Landing/>}/>
                    <Route path="*" element={<NotFoundError/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
