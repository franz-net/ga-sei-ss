import React from 'react';

import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>Welcome!</h1>}/>
                <Route path="*" element={<h1>404!! Not Found!!</h1>}/>
            </Routes>
        </BrowserRouter>
    );
}
