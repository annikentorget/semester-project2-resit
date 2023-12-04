import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleSignOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        navigate('/login');
    }

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__hamburger" onClick={toggleMenu}>
                    {isMenuOpen ? (
                        <>
                            <div className="navbar__bar"></div>
                            <div className="navbar__bar"></div>
                        </>
                    ) : (
                        <>
                            <div className="navbar__bar-top"></div>
                            <div className="navbar__bar-middle"></div>
                            <div className="navbar__bar-bottom"></div>
                        </>
                    )}
                </div>
                <div className="navbar__logobox">
                    <a className="navbar__logo" href="/">annipedia</a>
                    <h2 className="navbar__slogan">The Encyclopedia for Developers</h2>
                </div>
                <div className={`navbar__menu-left ${isMenuOpen ? 'active' : ''}`}>
                    <a className="navbar__item-left" href="/">Home</a>
                    <a className="navbar__item-left" href="/articles">Articles</a>
                    {localStorage.getItem('user') ? (
                        <Link className="navbar__item-left" onClick={handleSignOut}>
                            {isMenuOpen ? 'Sign out' : 'Sign out'}
                        </Link>
                    ) : (
                        <Link to="/login" className="navbar__item-left">
                            {isMenuOpen ? 'Sign in' : 'Login' }
                        </Link>
                    )}
                    <a href="https://github.com/annikentorget/semesterproject2_resit">
                        <button className="navbar__github">
                            <FontAwesomeIcon icon={faGithub} />
                            GitHub
                        </button>
                    </a>
                    {localStorage.getItem('user') ? (
                            <button className="navbar__sign-out-button" onClick={handleSignOut}>
                                <FontAwesomeIcon icon={faRightToBracket} />
                                Sign out
                            </button>
                    ) : (
                        <a href="/login">
                            <button className="navbar__sign-in">
                                <FontAwesomeIcon icon={faRightToBracket} />
                                Sign in
                            </button>
                        </a>
                    )}
                </div>
            </div>
            <div className={`navbar__menu-right ${isMenuOpen ? 'active' : ''}`}>
                {localStorage.getItem('user') ? (
                    <>
                        <button className="navbar__sign-out" onClick={handleSignOut}>
                            Sign Out
                        </button>
                        <button className="navbar__add-article">
                            <Link to="/add-article">
                                <FontAwesomeIcon icon={faPlus} />
                                Add Article
                            </Link>
                        </button>
                    </>
                ) : (
                    <>
                        <div className="navbar__menu-right">
                            <Link to="/login" className="navbar__item-right">
                                Login
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;