import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DivMovies = styled.div`
  padding: 20px;
  background-image: url('/img/fondo.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh;

  & h2 {
    font-weight: bold;
    font-size: 40px;
    font-family: cursive;
    color: white;
    text-shadow: 1px 1px 4px black;
    margin-bottom: 30px;
  }

  & ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  & li {
    width: 180px;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.2s ease;
  }

  & li:hover {
    transform: scale(1.05);
  }

  & img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  & a {
    color: white;
    font-size: 16px;
    text-decoration: none;
    display: block;
    margin-top: 5px;
  }

  & a:hover {
    text-decoration: underline;
  }
`;

const Movies = () => {
  const API_KEY = '92a29a208697474804603c1dc44ad181';
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const filteredMovies = data.results.filter(
          movie => movie.title || movie.name
        );
        setPopularMovies(filteredMovies);
      })
      .catch(error => console.error('Error fetching popular movies:', error));
  }, []);

  return (
    <DivMovies>
      <h2>Popular Movies</h2>
      <ul>
        {popularMovies.map(movie => (
          <li key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title || movie.name}
              />
            ) : (
              <img
                src="/img/placeholder.png" // Asegúrate de tener esta imagen o cambia la URL
                alt="No poster"
              />
            )}
            <Link to={`/movies/${movie.id}`}>
              {movie.title || movie.name} <br />
              <small>
                (
                {(movie.release_date || movie.first_air_date || 'N/A').slice(
                  0,
                  4
                )}
                )
              </small>
            </Link>
          </li>
        ))}
      </ul>
    </DivMovies>
  );
};

export default Movies;
