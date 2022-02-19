import './App.css';
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Save from './pages/Save'
import Chat from "./pages/Chat";
import Player from "./pages/Player";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/save" element={<Save />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/player" element={<Player />} />
        </Routes>
    );
};

export default App;
