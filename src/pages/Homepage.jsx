import React, { useState } from 'react';
import Search from '../components/Search';
import NavBar from '../components/NavBar';

function Homepage() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return(
        <div className="homepage">
            <NavBar user={user} onLogout={handleLogout} />
            <div className="homepage__container">
                <h2 className="homepage__header">Search articles</h2>
                <Search />
            </div>
        </div>
    );
}

export default Homepage;