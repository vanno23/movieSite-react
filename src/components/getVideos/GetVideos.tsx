import React from 'react';
import { OutLineButton } from '../button/Button';
import tmdbApi, { category } from '../../api/tmdbApi';
import './getVideos.scss';

interface GetVideosProps {
  id: number;
  setVideoKey: React.Dispatch<React.SetStateAction<string>>;
  setIsVideoKey: React.Dispatch<React.SetStateAction<boolean>>;
}

const GetVideos = ({ id, setVideoKey, setIsVideoKey  }: GetVideosProps) => {

  const handleButtonClick = async () => {
    try {
      const data = await tmdbApi.getVideos(category.movie, id);
      setVideoKey(data.results[0].key);
      setIsVideoKey(true);
    } catch (error) {
      console.error('Failed to fetch video key:', error);
    }
  };


  return (
    <>
      <OutLineButton onClick={handleButtonClick} className='watchTrailer'>
        Watch trailer
      </OutLineButton>
    </>
  );
};

export default GetVideos;
