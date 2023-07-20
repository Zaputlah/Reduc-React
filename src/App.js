import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useAuth from './login/hooks/useAuth';
import Dashboard from './login/components/Dashboard';
import Login from './login/components/Login';

const App = () => {
    const isAuthenticated = useAuth();

    return (
        <Router>
            <div>
                <nav>
                    {/* <ul> */}
                    {/* <li> */}
                    {/* <Link to="/">Login</Link> */}
                    {/* </li> */}
                    {/* {isAuthenticated && (
                            // <li>
                            //     <Link to="/dashboard">Dashboard</Link>
                            // </li>
                        )} */}
                    {/* </ul> */}
                </nav>

                <Routes>
                    <Route path="/" element={<Login />} />
                    {isAuthenticated && <Route path="/dashboard" element={<Dashboard />} />}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
