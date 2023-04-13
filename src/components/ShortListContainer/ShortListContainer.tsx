import ShortListItem from '../ShortListItem/ShortListItem';
import { movieType, tvType } from '../../api/tmdbApi';
import './ShortListContainer.scss';
import { OutLineButton } from '../button/Button';
import { Link } from 'react-router-dom';

const ShortListContainer = () => {
	return (
		<>
			<div className='movieContainer'>
				<div className='movieContainer_header'>
					<h2 className='movieContainer-title'>Trending Movies</h2>
					<Link to='/movie'>
						<OutLineButton className='viewMore'>View more</OutLineButton>
					</Link>
				</div>
				<ShortListItem category={'movie'} type={movieType.popular} />
			</div>
			<div className='movieContainer'>
				<div className='movieContainer_header'>
					<h2 className='movieContainer-title'>Top Rated Movies</h2>
					<Link to='/movie'>
						<OutLineButton className='viewMore'>View more</OutLineButton>
					</Link>
				</div>
				<ShortListItem category={'movie'} type={movieType.top_rated} />
			</div>
			<div className='movieContainer'>
				<div className='movieContainer_header'>
					<h2 className='movieContainer-title'>Trending TV</h2>
					<Link to='/tv'>
						<OutLineButton className='viewMore'>View more</OutLineButton>
					</Link>
				</div>
				<ShortListItem category={'tv'} type={tvType.popular} />
			</div>
			<div className='movieContainer'>
				<div className='movieContainer_header'>
					<h2 className='movieContainer-title'>Top Rated TV</h2>
					<Link to='/tv'>
						<OutLineButton className='viewMore'>View more</OutLineButton>
					</Link>
				</div>
				<ShortListItem category={'tv'} type={tvType.top_rated} />
			</div>
		</>


	)
}

export default ShortListContainer;