import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieTvList from '../components/MovieTvList/MovieTvList';
import ActorsHeader from '../components/actorsHeader/ActorsHeader';

const Actors = () => {

  const { actorsId } = useParams();
  const [mediaType, setMediaType] = useState<string>('movie');
  const [orderBy, setOrderBy] = useState<string>('desc');

  return (
    <>
      <ActorsHeader setMediaType={setMediaType} mediaType={mediaType} setOrderBy={setOrderBy} orderBy={orderBy}/>
      <MovieTvList actorsId={actorsId} mediaType={mediaType} orderBy={orderBy}/>
    </>
  )
}

export default Actors