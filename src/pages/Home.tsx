import React from 'react'
import Movie_slide from '../components/movie-slide/Movie_slide';
import ShortListContainer from '../components/ShortListContainer/ShortListContainer';

const Home = () => {
  return (
    <div>
        <Movie_slide />
        <ShortListContainer />
    </div>
  )
}

export default Home;