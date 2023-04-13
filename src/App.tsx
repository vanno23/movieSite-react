import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/header/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieTv from './pages/MovieTv';
import Footer from './components/footer/Footer';
import Detail from './pages/Detail';
import Actors from './pages/Actors';
function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />

        <Route
          path='/:type'
          element={<MovieTv />}
        />

        <Route
          path='/:type/search/:searchKey'
          element={<MovieTv />}
        />
        <Route
          path='/:type/:id'
          element={<Detail />}
        />

        <Route
          path='actors/:actorsId/:actorName'
          element={<Actors />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
