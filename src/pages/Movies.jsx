import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DivHome = styled.div`
  min-height: 100vh;
  background-color: black;
  color: white;
  padding: 0.2px 20px;
  box-sizing: border-box;

  & h2 {
    font-size: 50px;
    font-family: Baskerville;
    text-align: center;
    text-shadow: 3px 3px 4px rgb(255, 3, 3);
    margin-bottom: 30px;
  }

  & ul {
    list-style: none;
    padding: 0;
    margin-top: 30px;
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
    color: white;
    font-size: 18px;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const SearchBox = styled.div`
  background-image: ${({ bg }) =>
    bg
      ? `url('https://image.tmdb.org/t/p/original${bg}')`
      : `url('https://image.tmdb.org/t/p/original/9ZpKrS2hWz2toYOu2aKIsngG3eN.jpg')`};
  background-size: cover;
  background-position: center;
  padding: 200px 0px;
  border-radius: 20px;
  margin: 0 auto 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transition: background-image 0.4s ease-in-out;
  max-width: 100%;
  width: 100%;

  & input {
    height: 30px;
    width: 90%;
    max-width: 300px;
    padding-left: 10px;
    border-radius: 5px;
    display: block;
    margin: 0 auto 10px;
  }

  & button {
    background-color: #184475;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    display: block;
    margin: 0 auto;
    &:hover {
      opacity: 0.9;
      padding: 12px 22px;
    }
  }
`;

const Home = () => {
  const API_KEY = '92a29a208697474804603c1dc44ad181';
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [backgroundPoster, setBackgroundPoster] = useState(null);

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

  useEffect(() => {
    const fetchRandomBackdrop = () => {
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
          if (data.results.length > 0) {
            const randomMovie =
              data.results[Math.floor(Math.random() * data.results.length)];
            setBackgroundPoster(randomMovie.backdrop_path);
          }
        })
        .catch(err => console.error('Error loading backdrop:', err));
    };

    fetchRandomBackdrop(); // Imagen inicial
    const intervalId = setInterval(fetchRandomBackdrop, 10000); // Cada 10 segundos

    return () => clearInterval(intervalId);
  }, []);

  return (
    <DivHome>
      <h2>Search Movies</h2>
      <SearchBox bg={backgroundPoster}>
        <input
          type="text"
          placeholder="Enter keywords"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearch}>Search</button>
      </SearchBox>

      {searchResults.length === 0 && searchQuery && (
        <p style={{ color: 'white', textAlign: 'center' }}>No results found.</p>
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
