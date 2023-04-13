import { useState, useEffect } from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import tmdbApi, { movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { Swiper, SwiperSlide } from 'swiper/react';
import './movie-slide.scss';
import { Button } from '../button/Button';
import { Link } from 'react-router-dom';
import GetVideos from '../getVideos/GetVideos';
import { AiOutlineClose } from 'react-icons/ai';

const Movie_slide = () => {

	const [movieItems, setMovieItems] = useState([]);
	const [videoKey, setVideoKey] = useState<string>('');
	const [isVideoKey, setIsVideoKey] = useState<boolean>(false);

	SwiperCore.use([Autoplay]);

	useEffect(() => {
		const fetchMovieItems = async () => {
			try {
				const data = await tmdbApi.getMoviesList(movieType.popular);
				setMovieItems(data.results.slice(1, 4));
			} catch (error) {
				console.error('Failed to fetch movie data:', error);
			}
		};
		fetchMovieItems();
	}, []);


	return (
		<div className='movie_slide'>
			<Swiper
				modules={[Autoplay]}
				grabCursor={true}
				spaceBetween={0}
				slidesPerView={1}
				autoplay={{ delay: 3000 }}
			>
				{
					movieItems.map((item) => {
						const { id, title, backdrop_path, poster_path, overview } = item;
						return (
							<SwiperSlide key={id}>
								{({ isActive }) => (
									<div className={`movie_slide_item ${isActive ? 'active' : ''}`} style={{ backgroundImage: `url(${apiConfig.originalImage(backdrop_path)})` }}>
										<div className='movie_slide_item_content'>
											<div className='movie_slide_item_content_overview'>
												<h2 className='movie_slide_item_title'>{title}</h2>
												<p className='overview'>{overview}</p>
												<div className='btns'>
													<Link to={`/movie/${id}`}>
														<Button>
															Watch now
														</Button>
													</Link>
													<GetVideos id={id} setVideoKey={setVideoKey} setIsVideoKey={setIsVideoKey} />
												</div>
											</div>
											<div>
												<img className='movie_slide_item_poster' src={apiConfig.w500Image(poster_path)} alt="" />
											</div>
										</div>
									</div>
								)}
							</SwiperSlide>
						);
					})
				}
			</Swiper>

			<div className={`modal ${isVideoKey ? 'modalActive' : ''}`}>
				<div className='iframe'>
					<button className='closeVideo' onClick={() => setIsVideoKey(false)}>
						<AiOutlineClose />
					</button>
					<iframe width="100%" height="500px" src={`https://www.youtube.com/embed/${videoKey}`} />
				</div>
			</div>
		</div>
	)
}

export default Movie_slide