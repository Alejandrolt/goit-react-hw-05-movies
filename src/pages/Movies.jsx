import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DivMovies = styled.div`
  & h2 {
    font-size: 40px;
    font-family: cursive;
    margin: 30px;
  }
  & input {
    margin-left: 50px;
    margin-right: 10px;
    height: 27px;
    width: 200px;
    padding-left: 20px;
  }
  & button {
    background-color: #184475;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    &:hover {
      opacity: 0.9;
      padding: 12px 22px;
    }
  }
`;

const Movies = () => {
  const API_KEY = 'ea4896c7073ba93706d570dd6a3e937d';
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
    )
      .then(response => response.json())
      .then(data => setSearchResults(data.results))
      .catch(error => console.error('Error searching movies:', error));
  };

  return (
    <DivMovies>
      <h2>Search Movies</h2>
      <div>
        <input
          type="text"
          placeholder="Enter keywords"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {searchResults.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </DivMovies>
  );
};

export default Movies;
