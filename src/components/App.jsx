import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from 'pages/Home';
import Movies from 'pages/Movies';
import MovieDetails from './MovieDetails';
import Cast from './Cast';
import Reviews from './Reviews';
import styled from 'styled-components';

const NavHeader = styled.nav`
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  padding-left: 50px;
  gap: 50px;
  & a {
    color: black;
    text-decoration: none;
    font-family: new times roman;
    font-size: 30px;
    font-weight: bold;
    text-shadow: 2px 7px 5px rgba(255, 0, 0, 0.59),
      0px -4px 10px rgba(255, 0, 0, 0.59);
    &:hover {
      font-size: 25px;
    }
    &.active {
      color: rgb(248, 12, 4);
      text-shadow: 2px 7px 5px rgb(0, 0, 0);
    }
  }
`;

const App = () => {
  return (
    <div>
      <NavHeader>
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/movies">Biblioteca</NavLink>
      </NavHeader>
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies" element={<Home />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="/movies/:movieId/cast" element={<Cast />} />
          <Route path="/movies/:movieId/reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
