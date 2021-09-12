import { useState, useEffect, useRef } from 'react';
import {
	Collapse,
	Navbar,
	NavbarBrand,
	Nav,
	NavItem,
	Button,
} from 'reactstrap';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../../redux/actions/auth';
import { connect } from 'react-redux';

const DashNav = ({ url, logout }) => {
	const navRef = useRef(null);
	const [isOpen, setIsOpen] = useState(false);
	const [navBrand, setNavBrand] = useState('generic-chat-app');

	const handleNavToggle = () => setIsOpen(!isOpen);

	const clickListener = (e) => {
		if (navRef.current && navRef.current.contains(e.target)) {
			return;
		}

		setIsOpen(false);
	};

	useEffect(() => {
		document.addEventListener('click', clickListener);
		return () => {
			document.removeEventListener('click', clickListener);
		};
		// eslint-disable-next-line
	}, []);

	const location = useLocation();

	useEffect(() => {
		const l = location.pathname;

		l.length === 5
			? setNavBrand('generic-chat-app')
			: setNavBrand(
					l.substring(6, 7).toUpperCase().concat(l.substring(7))
			  );
	}, [location]);

	return (
		<div ref={navRef} className='nav-anchor' id='nav-anchor'>
			<Navbar dark id='dash-nav'>
				<Button className='navbar-toggler' onClick={handleNavToggle}>
					<i className='fas fa-bars'></i>
				</Button>

				<NavbarBrand>{navBrand}</NavbarBrand>
				{location.pathname !== '/dash' && (
					<Link to='/dash' className='back-to-dash'>
						<i className='fas fa-times'></i>
					</Link>
				)}
			</Navbar>

			<Collapse isOpen={isOpen} navbar className='width'>
				<Nav className='ml-auto' navbar>
					{/* <NavUser /> Loading issue on initial login */}
					<NavItem className='dash-nav-settings'>
						<Link
							to={`${url}/settings`}
							onClick={() => setIsOpen(false)}
							className='nav-item-content'>
							<div className='i-bg'>
								<i className='fas fa-cog'></i>
							</div>
							<span>Settings</span>
						</Link>
					</NavItem>
					<NavItem className='dash-nav-contacts'>
						<Link
							to={`${url}/contacts`}
							onClick={() => setIsOpen(false)}
							className='nav-item-content'>
							<div className='i-bg'>
								<i className='fas fa-user'></i>
							</div>
							<span>Contacts</span>
						</Link>
					</NavItem>
					<NavItem className='dash-nav-about'>
						<Link
							to='/about'
							onClick={() => setIsOpen(false)}
							className='nav-item-content'>
							<div className='i-bg'>
								<i className='fas fa-info'></i>
							</div>
							<span>About</span>
						</Link>
					</NavItem>
					<NavItem>
						<button
							className='nav-item-content'
							onClick={() => {
								logout();
							}}>
							<div className='i-bg'>
								<i className='fas fa-sign-out-alt'></i>
							</div>
							Logout
						</button>
					</NavItem>
				</Nav>
			</Collapse>
		</div>
	);
};

export default connect(null, { logout })(DashNav);
