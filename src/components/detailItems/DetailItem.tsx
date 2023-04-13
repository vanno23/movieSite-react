import { useEffect, useState } from 'react'
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import './detailItems.scss'
import Cast from '../cast/Cast';
import ShortListItem from '../ShortListItem/ShortListItem';
import VideoList from '../VideoList/VideoList';

interface detailItemProps {
  type: string | undefined,
  id: string | undefined,
}

interface genresType {
  name: string
}

interface detailItemsProps {
  backdrop_path: string,
  poster_path: string,
  title: string,
  name: string,
  overview: string,
  genres: genresType[],
}
const DetailItem = ({ type, id }: detailItemProps) => {

  const [detailItems, setDetailsItems] = useState<detailItemsProps>();

  useEffect(() => {
    const getDetailItems = async () => {
      const data = await tmdbApi.detail(type, id);
      setDetailsItems(data);
      window.scrollTo(0,0);
    }

    getDetailItems();
  }, [type, id])

  return (
    <div>
      {detailItems && (
        <>
          <div className='detailBackground' style={{ backgroundImage: `url(${apiConfig.originalImage(detailItems.backdrop_path || detailItems.poster_path)})` }}>
          </div>
          <div className='detailItemContent'>
            <div className='detailPoster'>
              <div className='detailPosterImg' style={{ backgroundImage: `url(${apiConfig.w500Image(detailItems.poster_path || detailItems.backdrop_path)})` }}></div>
            </div>
            <div className='info'>
              <h1 className="title">
                {detailItems.title || detailItems.name}
              </h1>
              <div className='genres'>
                {detailItems.genres.map((item, i) => (
                  <p key={i}>{item.name}</p>
                ))}
              </div>
              <p className="overview">{detailItems.overview}</p>
              <div className='cast'>
                <Cast type={type} id={id} />
              </div>
            </div>
          </div>
          
          <VideoList type={type} id={id}/>

          <div className='similar'>
            <ShortListItem category={type} type='similar' id={id}/>
          </div>
        </>
      )}

    </div>
  )
}

export default DetailItem