import React from 'react';
import {Landing, NotFoundError, ProtectedRoute, Signup} from './pages';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Calendar, Dashboard, MasterLayout, Profile} from "./pages/authPages";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CssBaseline} from "@mui/material";
import AddCourt from "./pages/authPages/AddCourt";

const theme = createTheme({
    typography: {
        fontFamily: "Quicksand",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700
    },
    palette: {}
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
                        <Route path='/calendar' element={<Calendar/>}/>
                        <Route path='/profile' element={<Profile/>}/>
                        {/*
                        <Route path='/reservations' element={<Reservations/>}/>
                        <Route path='/add-reservation' element={<AddReservation/>}/>
                        */}

                        {/* Roles: [admin] */}
                        <Route path='/admin/courts' element={<AddCourt/>}/>
                        <Route path='/admin/add-court' element={<AddCourt/>}/>
                        {/*
                        <Route path='/admin/users' element={<Reservations/>}/>
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
