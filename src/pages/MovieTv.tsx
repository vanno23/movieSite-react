import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect } from 'react';
import tmdbApi, { category } from '../api/tmdbApi';
import { useParams } from 'react-router-dom';
import MovieTvList from '../components/MovieTvList/MovieTvList';
import MovieTvHeader from '../components/movieTvHeader/MovieTvHeader';
const MovieTv = () => {

  const { type } = useParams();

  return (
    <>
      <MovieTvHeader urlKey={type} />
      <MovieTvList urlKey={type}/>
    </>
  )
}

export default MovieTv;