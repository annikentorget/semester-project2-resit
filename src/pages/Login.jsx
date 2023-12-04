import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === 'demo' && password === 'password') {
            const user = { username: 'demo', userRole: 'editor' };


            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('userRole', user.userRole);

            onLogin(user);
            navigate('/');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div>
            <NavBar />
            <div className="login">
                <div className="login__column-left">
                <div className="login__form">
                    <h2 className="login__header">Sign in to your Account</h2>
                            <label className="login__label">
                                Username:
                                <input className="login__input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </label>
                            <label className="login__label">
                                Password:
                                <input className="login__input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                            <button className="login__button" onClick={handleLogin}>Sign in</button>
                        </div>
                </div>
            
                <div className="login__column-right">
                    <h2 className="login__header-right">
                        Don't have an account?
                    </h2>
                    <p className="login__text">
                        Sign up to unlock a great amount of new opporunities!
                    </p>
                    <button className="login__button-right">
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;