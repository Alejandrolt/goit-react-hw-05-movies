import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

const DivButton = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  height: 50px;
  padding: 0 20px;

  & button {
    background-color: #184475;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    margin-right: 10px;

    &:hover {
      opacity: 0.9;
      padding: 12px 22px;
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
    height: auto;
    margin-bottom: 10px;
  }
`;

const DivContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin: 30px;

  & h2 {
    font-weight: bold;
    font-size: 40px;
    font-family: cursive;
  }

  & h3 {
    font-size: 30px;
    font-family: cursive;
  }

  & img {
    padding-right: 40px;
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;

    & h2 {
      font-size: 28px;
    }

    & h3 {
      font-size: 24px;
    }

    & img {
      padding-right: 0;
      max-width: 80%;
    }
  }
`;

const MovieDetails = () => {
  const API_KEY = '92a29a208697474804603c1dc44ad181';
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(data => setMovieDetails(data))
      .catch(error => console.error('Error fetching movie details:', error));
  }, [movieId]);

  return (
    <div>
      <DivButton>
        <Link to="/">
          <button>Regresar</button>
        </Link>
      </DivButton>
      <div>
        {movieDetails && (
          <DivContent>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
            <div>
              <h2>
                {movieDetails.title} (
                {new Date(movieDetails.release_date).getFullYear()})
              </h2>
              <p>User Score: {movieDetails.vote_average}</p>
              <h3>Overview</h3>
              <p>{movieDetails.overview}</p>
              <h3>Genres</h3>
              <ul>
                {movieDetails.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </DivContent>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
