import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const CastContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const CastItem = styled.div`
  text-align: center;
  max-width: 150px;

  img {
    width: 100%;
    max-width: 150px;
    height: auto;
    border-radius: 8px;
  }

  h4 {
    margin-top: 10px;
    font-size: 1rem;
  }

  p {
    font-size: 0.9rem;
  }
`;

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=92a29a208697474804603c1dc44ad181`
    )
      .then(res => res.json())
      .then(data => setCast(data.cast));
  }, [movieId]);

  return (
    <CastContainer>
      {cast.map(actor => (
        <CastItem key={actor.cast_id}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : 'https://via.placeholder.com/150'
            }
            alt={actor.name}
          />
          <h4>{actor.name}</h4>
          <p>{actor.character}</p>
        </CastItem>
      ))}
    </CastContainer>
  );
};

export default Cast;
