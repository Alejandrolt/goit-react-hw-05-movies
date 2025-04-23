import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DivHome = styled.div`
  & h2 {
    font-size: 50px;
    font-family: cursive;
    margin-left: 460px;
    margin-top: 100px;
    color: white;
  }
  & input {
    margin-left: 450px;
    margin-right: 10px;
    height: 27px;
    width: 300px;
    padding-left: 10px;
    border-radius: 5px;
  }
  & button {
    background-color: #184475;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
      padding: 12px 22px;
    }
  }
  & ul {
    list-style: none;
    padding: 0;
    margin-top: 30px;
    margin-left: 450px;
    color: white;
  }
  & li {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  & img {
    width: 80px;
    border-radius: 8px;
    margin-right: 15px;
  }
  & a {
    color: white;
    font-size: 18px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Home = () => {
  const API_KEY = '92a29a208697474804603c1dc44ad181';
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') return;

    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
    )
      .then(response => response.json())
      .then(data => setSearchResults(data.results))
      .catch(error => console.error('Error searching movies:', error));
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <DivHome>
      <h2>Search Movies</h2>
      <div>
        <input
          type="text"
          placeholder="Enter keywords"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResults.length === 0 && searchQuery && (
        <p style={{ color: 'white', marginLeft: '450px', marginTop: '20px' }}>
          No results found.
        </p>
      )}

      <ul>
        {searchResults.map(movie => (
          <li key={movie.id}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <Link to={`/movies/${movie.id}`}>
              {movie.title} ({movie.release_date?.slice(0, 4)})
            </Link>
          </li>
        ))}
      </ul>
    </DivHome>
  );
};

export default Home;
