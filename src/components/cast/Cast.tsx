import React, { useState, useEffect } from 'react';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import './cast.scss'
import { Link } from 'react-router-dom';

interface castProps {
  type: string | undefined,
  id: string | undefined,
}

interface castItemsProps {
  name: string,
  profile_path: string,
  backdrop_path: string,
  id: string,
}

const Cast = ({ type, id }: castProps) => {
  const [castItems, setCastItems] = useState<castItemsProps[]>([]);


  useEffect(() => {
    const getDetailItems = async () => {
      const data = await tmdbApi.credits(type, id);
      setCastItems(data.cast.slice(0, 5));
    }

    getDetailItems();
  }, [type, id])


  return (
    <div className='castContainer'>
      <h1 className='castTitle'>Casts</h1>
      <div className='castItems'>
        {castItems.map((item, i) => {
          const { name, profile_path, backdrop_path, id } = item;
          return (
            <Link to={`/actors/${id}/${name}`} key={i}>
              <div className='castInfo'>
                <div className='castImage' style={{
                  backgroundImage: profile_path || backdrop_path
                    ? `url(${apiConfig.w500Image(profile_path || backdrop_path)})`
                    : `url(${'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'})`,
                }}></div>
                <p className='name'>{name}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Cast;