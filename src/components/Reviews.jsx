import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const ReviewsContainer = styled.div`
  padding: 20px;
`;

const ReviewItem = styled.div`
  margin-bottom: 20px;
  background-color: #f0f4fa;
  padding: 15px;
  border-radius: 10px;

  h4 {
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: #184475;
  }

  p {
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=92a29a208697474804603c1dc44ad181`
    )
      .then(res => res.json())
      .then(data => setReviews(data.results));
  }, [movieId]);

  return (
    <ReviewsContainer>
      {reviews.length ? (
        reviews.map(review => (
          <ReviewItem key={review.id}>
            <h4>Author: {review.author}</h4>
            <p>{review.content}</p>
          </ReviewItem>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </ReviewsContainer>
  );
};

export default Reviews;
