import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from 'pages/Home';
import Movies from 'pages/Movies';
import MovieDetails from './MovieDetails';
import Cast from './Cast';
import Reviews from './Reviews';
import styled from 'styled-components';

const NavHeader = styled.nav`
  background-color: #184475;
  height: 70px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 50px;
  gap: 50px;
  border-bottom: 2px solid #000;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
  & a {
    color: #fff;
    text-decoration: none;
    font-family: new times roman;
    font-size: 23px;
    font-weight: bold;
    text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
      0px -4px 10px rgba(255, 255, 255, 0.3);
    &:hover {
      font-size: 25px;
    }
    &.active {
      color: #f2d28b;
    }
  }
`;

const App = () => {
  return (
    <div>
      <NavHeader>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movie</NavLink>
      </NavHeader>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="/movies/:movieId/cast" element={<Cast />} />
          <Route path="/movies/:movieId/reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
