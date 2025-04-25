import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DivMovies = styled.div`
  & h2 {
    font-weight: bold;
    font-size: 40px;
    font-family: Baskerville;
    text-shadow: 1px 1px 4px Red;
    margin-bottom: 30px;
    margin-left: 600px;
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
  @media (max-width: 1024px) {
    & li {
      width: 150px;
    }
  }

  @media (max-width: 768px) {
    & li {
      width: 130px;
    }
    & h2 {
      font-size: 28px;
      margin-left: 200px;
    }
  }

  @media (max-width: 480px) {
    & li {
      width: 100px;
    }
    & h2 {
      font-size: 24px;
      margin-left: 30px;
    }
    & a {
      font-size: 14px;
    }
  }
`;

const Movies = () => {
  const API_KEY = '92a29a208697474804603c1dc44ad181';
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchAllTrending = async () => {
      try {
        let allResults = [];

        for (let page = 1; page <= 10; page++) {
          const response = await fetch(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
          );
          const data = await response.json();
          const filtered = data.results.filter(
            item => item.media_type === 'movie'
          );
          allResults = [...allResults, ...filtered];
        }

        setPopularMovies(allResults);
      } catch (error) {
        console.error('Error fetching popular movies and series:', error);
      }
    };

    fetchAllTrending();
  }, []);

  return (
    <DivMovies>
      <h2>Movies</h2>
      <ul>
        {popularMovies.map(movie => (
          <li key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title || movie.name}
              />
            ) : (
              <img src="/img/placeholder.png" alt="No poster" />
            )}
            <Link to={`/movies/${movie.id}`}>
              {movie.title || movie.name}
              <br />
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
