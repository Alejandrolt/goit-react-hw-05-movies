import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DivHome = styled.div`
  & h2 {
    font-size: 50px;
    font-family: Baskerville;
    margin-top: 100px;
    text-align: center;
    text-shadow: 1px 1px 4px Red;
    margin-bottom: 30px;
  }

  & input {
    margin-top: 20px;
    height: 27px;
    width: 80%;
    max-width: 300px;
    padding-left: 10px;
    border-radius: 5px;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  & button {
    background-color: #184475;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    margin-top: 10px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    &:hover {
      opacity: 0.9;
      padding: 12px 22px;
    }
  }

  & ul {
    list-style: none;
    padding: 0;
    margin-top: 30px;
    color: white;
  }

  & li {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: center;
  }

  & img {
    width: 80px;
    border-radius: 8px;
    margin-right: 15px;
  }

  & a {
    color: black;
    font-size: 18px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  // Media Queries para hacerlo responsivo
  @media (max-width: 768px) {
    & h2 {
      font-size: 35px;
    }

    & input {
      width: 90%;
      max-width: 250px;
    }

    & button {
      width: 90%;
      max-width: 250px;
    }

    & ul {
      padding-left: 0;
    }

    & li {
      flex-direction: column;
      align-items: flex-start;
    }

    & img {
      width: 60px;
    }

    & a {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    & h2 {
      font-size: 28px;
    }

    & input {
      width: 90%;
      max-width: 200px;
    }

    & button {
      width: 90%;
      max-width: 200px;
    }

    & li {
      margin-bottom: 15px;
    }

    & a {
      font-size: 14px;
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
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchQuery}`
    )
      .then(response => response.json())
      .then(data => {
        const movies = data.results.filter(item => item.media_type === 'movie');
        setSearchResults(movies);
      })
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
                alt={movie.title || movie.name}
              />
            )}
            <Link to={`/movies/${movie.id}`}>
              {movie.title || movie.name} (
              {(movie.release_date || movie.first_air_date)?.slice(0, 4)})
            </Link>
          </li>
        ))}
      </ul>
    </DivHome>
  );
};

export default Home;
