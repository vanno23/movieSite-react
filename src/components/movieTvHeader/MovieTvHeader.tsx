import footerImage from '../../images/footerImage.jpg';
import { category } from '../../api/tmdbApi';
import './movieTvHeader.scss';

interface MovieTvHeaderProps {
  urlKey: string | undefined,
}

const MovieTvHeader = ({ urlKey }: MovieTvHeaderProps) => {
  return (
    <div className='movieTvHeader' style={{ backgroundImage: `url(${footerImage})` }}>
      <h2>{urlKey === category.movie ? 'Movies' : 'TV Series'}</h2>
    </div>
  )
}

export default MovieTvHeader;