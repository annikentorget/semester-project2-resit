import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/articles?query=${searchQuery}`);
    };

    return (
        <div className="searchbar">
            <input className="searchbar__input"
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="searchbar__button" onClick={handleSearch}>
                 <FontAwesomeIcon className="searchbar__icon" icon={faSearch} />
            </button>
        </div>
    );
}

export default Search;