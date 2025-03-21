import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./LOGIN";
import Dashboard from "./DASHBOARD";
import DashboardHome from "./DASHBOARD HOME";
import Layout from "../views/dashboard_wrapper/layout";
import AuthWrapper from "../views/dashboard_wrapper/wrapper";

const Router = () => {

    return (
        <Routes>
            <Route path="/" element={ <Login /> } />
            <Route path="dashboard" element={ <Layout />} >
                <Route path="" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<Login />} /> } />
                <Route path="a" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<Dashboard />} /> } >
                    <Route path="b" element={ <AuthWrapper authStatus={true} redirectTo="/" component={<DashboardHome />} /> } />
                </Route>
            </Route>
        </Routes>
    );
};

export default Router;