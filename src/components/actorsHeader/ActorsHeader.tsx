import React from 'react';
import { OutLineButton } from '../button/Button';
import footerImage from '../../images/footerImage.jpg';
import './ActorsHeader.scss';
import { useParams } from 'react-router-dom';

interface ActorsHeaderProps {
  setMediaType: React.Dispatch<React.SetStateAction<string>>;
  mediaType: string;
  setOrderBy: React.Dispatch<React.SetStateAction<string>>;
  orderBy: string,
}

const ActorsHeader = ({ setMediaType, mediaType, setOrderBy, orderBy }: ActorsHeaderProps) => {
  const { actorName } = useParams();

  return (
    <div className='ActorsHeader'>
      <div style={{ backgroundImage: `url(${footerImage})` }} className='ActorsTitle'>
        <h2>{actorName}</h2>
      </div>
      <div className='ActorsButton'>
        <div>
          <OutLineButton 
            onClick={() => setOrderBy('desc')}
            className={orderBy === 'desc' ? 'active' : ''}
          >
            Date Desc
          </OutLineButton>
          <OutLineButton 
            onClick={() => setOrderBy('asc')}
            className={orderBy === 'asc' ? 'active' : ''}
          >
            Date Asc
          </OutLineButton>
          <OutLineButton 
            onClick={() => setOrderBy('popularity')}
            className={orderBy === 'popularity' ? 'active' : ''}
          >
            Popularity
          </OutLineButton>
        </div>

        <div>
          <OutLineButton
            onClick={() => setMediaType('movie')}
            className={mediaType === 'movie' ? 'active' : ''}
          >
            movies
          </OutLineButton>
          <OutLineButton
            onClick={() => setMediaType('tv')}
            className={mediaType === 'tv' ? 'active' : ''}
          >
            tv
          </OutLineButton>
        </div>
      </div>
    </div>
  );
}

export default ActorsHeader;
