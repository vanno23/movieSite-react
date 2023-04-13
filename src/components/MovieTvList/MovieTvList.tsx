import React, { useEffect, useState } from 'react';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';
import { Button, OutLineButton } from '../button/Button';
import { BsFillPlayFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import './movieTvList.scss';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

interface MovieTvListProps {
	urlKey?: string | undefined;
	actorsId?: string | undefined;
	mediaType?: string;
	orderBy?: string,
}

interface movieDataProps {
	id: number;
	title: string;
	poster_path: string;
	backdrop_path: string;
	name: string;
}

interface sortedCastMovies {
	release_date?: string;
	first_air_date?: string;
}

const MovieTvList = ({ urlKey, actorsId, mediaType, orderBy }: MovieTvListProps) => {
	const [movieTvItems, setMovieTvItems] = useState<movieDataProps[]>([]);
	const [page, setPage] = useState<number>(1);
	const [searchValue, setSearchValue] = useState<string>('');
	const { searchKey } = useParams();
	const searchNavigate = useNavigate();
	const [totalPage, setTotalPage] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [actorsDataLength, setActorsDataLength] = useState<number>(0);

	useEffect(() => {
		const fetchMovieItems = async () => {
			try {
				let response;
				setIsLoading(true);
				if (actorsId) {
					setCurrentPage(1);
					setMovieTvItems([]);
					const data = await tmdbApi.actor(actorsId, mediaType);
				
					let sortedCast;
				
					if (orderBy === 'asc' || orderBy === 'desc') {
							sortedCast = data.cast.sort((a: any, b: any) => {
							const releaseDateA = new Date(a.release_date || a.first_air_date || '');
							const releaseDateB = new Date(b.release_date || b.first_air_date || '');
								if(orderBy === 'asc' ){
									return releaseDateA.getTime() - releaseDateB.getTime();
								} else {
									return releaseDateB.getTime() - releaseDateA.getTime();
								}
						});
					} else if (orderBy === 'popularity') {
						sortedCast = data.cast.sort((a: any, b: any) => {
							return b.popularity - a.popularity;
						});
					}
				
					const itemsForCurrentPage = sortedCast.slice(0, 15);
				
					setMovieTvItems(itemsForCurrentPage);
					setActorsDataLength(data.cast.length);
					setIsLoading(false);
					return;
				}
				else {
					if (searchKey === undefined) {
						if (urlKey === 'tv') {
							response = await tmdbApi.getTvList('popular', 1);
						} else if (urlKey === 'movie') {
							response = await tmdbApi.getMoviesList('popular', 1);
						}
					} else if (searchKey) {
						response = await tmdbApi.search('movie', 1, searchKey);
					}
				}

				setMovieTvItems(response?.results || []);
				setTotalPage(response?.total_pages || 0);

			} catch (error) {
				console.error('Failed to fetch movie data:', error);
			}
			setSearchValue('');
			setIsLoading(false);
		};
		fetchMovieItems();
	}, [urlKey, searchKey, actorsId, mediaType, orderBy]);




	useEffect(() => {
		const fetchMovieItems = async () => {
			try {
				let response;
				if (actorsId) {
					const data = await tmdbApi.actor(actorsId, mediaType);

					let sortedCast;
				
					if (orderBy === 'asc' || orderBy === 'desc') {
							sortedCast = data.cast.sort((a: any, b: any) => {
							const releaseDateA = new Date(a.release_date || a.first_air_date || '');
							const releaseDateB = new Date(b.release_date || b.first_air_date || '');
								if(orderBy === 'asc' ){
									return releaseDateA.getTime() - releaseDateB.getTime();
								} else {
									return releaseDateB.getTime() - releaseDateA.getTime();
								}
						});
					} else if (orderBy === 'popularity') {
						sortedCast = data.cast.sort((a: any, b: any) => {
							return b.popularity - a.popularity;
						});
					}

					const itemsPerPage = 15;
					const startIndex = (currentPage - 1) * itemsPerPage;
					const endIndex = currentPage * itemsPerPage;
					const itemsForCurrentPage = sortedCast.slice(startIndex, endIndex);

					setMovieTvItems([...movieTvItems, ...itemsForCurrentPage]);
					return;
				}

				if (searchKey === undefined && actorsId === undefined) {
					if (urlKey === 'tv') {
						response = await tmdbApi.getTvList('popular', page);
					} else {
						response = await tmdbApi.getMoviesList('popular', page);
					}
				} else if (searchKey) {
					response = await tmdbApi.search('movie', page, searchKey);
				}
				const itemsForCurrentPage = response ? response.results : [];
				setMovieTvItems([...movieTvItems, ...itemsForCurrentPage]);
				setTotalPage(response?.total_pages || 0);

			} catch (error) {
				console.error('Failed to fetch movie data:', error);
			}
		};

		fetchMovieItems();
	}, [page, currentPage]);


	const submit = useCallback(
		(e: React.FormEvent<HTMLFormElement>): void => {
			e.preventDefault();
			if (searchValue?.trim().length === 0) {
				searchNavigate('');
			} else if (searchValue?.trim().length > 0) {
				const url = `${`/${urlKey}/search`}/${searchValue}`;
				searchNavigate(url);
			}
		},
		[searchValue, urlKey]
	);

	return (
		<div style={{minHeight: '500px'}}>
			{isLoading ? <Loading /> : (
				<div className='movieTvListContainer'>
					{
						actorsId === undefined ? (
							<form onSubmit={(e) => submit(e)} className='searchForm'>
								<input type='text' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
								<button type="submit" className='submit'>Submit</button>
							</form>
						) : ''
					}

					<div className='movieTvList'>
						{movieTvItems?.map((item, i) => {
							const { poster_path, name, title, id, backdrop_path } = item;
							return (
								<Link to={`/${urlKey ? urlKey : mediaType}/${id}`} key={i}>
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
							);
						})}
					</div>
					{
						page < totalPage ? (
							<div className='loadMore'>
								<OutLineButton onClick={() => setPage(page + 1)}>Load more</OutLineButton>
							</div>
						) : null
					}
					{
						actorsId && actorsDataLength >= currentPage * 15 ? (
							<div className='loadMore'>
								<OutLineButton onClick={() => setCurrentPage(currentPage + 1)}>Load more</OutLineButton>
							</div>
						) : null
					}
				</div>
			)}
		</div>
	);
};

export default MovieTvList;
