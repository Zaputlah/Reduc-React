import { useEffect, useState } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Your authentication logic here, e.g., check if the user is logged in
        // For simplicity, I'm setting isAuthenticated to true by default
        setIsAuthenticated(true);
    }, []);

    return isAuthenticated;
};

export default useAuth;
