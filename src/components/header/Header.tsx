import React, { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/Movies.png';
import './header.scss'

const Header = () => {
	const navText = [
		{
			id: 0,
			text: 'home',
			path: '/',
		},
		{
			id: 1,
			text: 'movies',
			path: '/movie',
		},
		{
			id: 2,
			text: 'TV series',
			path: '/tv',
		}
	]

	const location = useLocation();
	const isActive = navText.findIndex(p => p.path === location.pathname);

	const headerScroll = useRef<HTMLDivElement>(null);

	useEffect(() => {
		window.addEventListener('scroll', function(){
			if(window.scrollY>100){
				headerScroll.current?.classList.add('headerScroll');
			} else {
        headerScroll.current?.classList.remove('headerScroll');
      }
		});
	}, [])
	
	return (
		<div ref={headerScroll} className='header'>
			<div className='header_flex'>
				<div className='title'>
					<img src={logo} alt="" className='logo'/>
					<Link to='/' className='title'>tMovies</Link>
				</div>
				<ul className='nav'>
					{navText.map((item) => {
						const { id, text, path } = item;
						return (
							<li key={id}>
								<Link to={path} className={isActive === id ? 'active' : ''}>{text}</Link>
							</li>
						)
					})}
				</ul>
			</div>
			</div>
	)
}

export default Header