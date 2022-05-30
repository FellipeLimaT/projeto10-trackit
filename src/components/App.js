import React from 'react'
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserContext from "../contexts/UserContext";
import HabitsContext from "../contexts/HabitsContext";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import HabitsScreen from "./HabitsScreen";
import TodayHabitsScreen from "./TodayHabitsScreen.js";
import HistoryScreen from "./HistoryScreen";

export default function App() {
    
    const [userData, setUserData] = useState({email: "", name: "", image: "", password: ""});
    const getData = {userData, setUserData};
    const [habitsPercentage, setHabitsPercentage] = useState(null);
    const getHabitsPercentage = {habitsPercentage, setHabitsPercentage};

    return (
        <UserContext.Provider value={getData}>
            <HabitsContext.Provider value={getHabitsPercentage}>

                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginScreen />}> </Route>
                        <Route path="/cadastro" element={<RegisterScreen />}> </Route>
                        <Route path="/habitos" element={<HabitsScreen />}> </Route>
                        <Route path="/hoje" element={<TodayHabitsScreen />}> </Route>
                        <Route path="/historico" element={<HistoryScreen />}> </Route>
                    </Routes>
                </BrowserRouter>

            </HabitsContext.Provider>
        </UserContext.Provider>
    )
}