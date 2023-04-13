import React, { useEffect, useState } from 'react';
import tmdbApi from '../../api/tmdbApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import apiConfig from '../../api/apiConfig';
import './ShortListItem.scss';
import { Link } from 'react-router-dom';
import { Button } from '../button/Button';
import { BsFillPlayFill } from 'react-icons/bs';


interface movieItemsProps {
	category: string | undefined,
	type: string,
	id?: string,
}

interface movieDataProps {
	id: number,
	title: string,
	poster_path: string,
	backdrop_path: string,
	name: string,
}

const ShortListItem = ({ category, type, id }: movieItemsProps) => {
	const [movieItems, setMovieItems] = useState<movieDataProps[]>();
	const [similarTrue, setSimilarTrue] = useState<boolean>(false);


	useEffect(() => {
		const fetchMovieItems = async () => {
			let response;
			try {
				if (type === 'similar') {
					response = await tmdbApi.similar(category, id);
					setSimilarTrue(response.results.length > 0);
				} else {
					if (category === 'tv') {
						response = await tmdbApi.getTvList(type);
					} else {
						response = await tmdbApi.getMoviesList(type);
					}
					setSimilarTrue(false);
				}
				setMovieItems(response?.results || []);
			} catch (error) {
				console.error('Failed to fetch movie data:', error);
			}
		};
		fetchMovieItems();
	}, [category, type, id]);

	return (
		<div className='movieItems'>
			{
				similarTrue ? (
					<div className='similarContainer'>
						<h2 className='similarTitle' style={{ marginBottom: '1.5rem' }}>Similar</h2>
					</div>
				) : ''
			}
			<Swiper
				spaceBetween={10}
				slidesPerView={'auto'}

			>
				{movieItems?.map((item) => {
					const { poster_path, name, title, id, backdrop_path } = item
					return (
						<SwiperSlide key={id}>
							<Link to={`/${category}/${id}`}>
								<div className='movieItem'>
								<div className='movieItem-bg' style={{
											backgroundImage: poster_path || backdrop_path
											? `url(${apiConfig.w500Image(poster_path || backdrop_path)})`
											: `url(${'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'})`,
										}}>
											<Button className={'itemIcon'}><BsFillPlayFill /></Button>
										</div>
									<h3 className='movieItem-title'>
										{title || name}
									</h3>
								</div>
							</Link>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</div>
	)
}

export default ShortListItem;