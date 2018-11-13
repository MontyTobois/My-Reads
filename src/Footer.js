
import React from 'react'
import { Link } from 'react-router-dom'

function Footer(props) {
	return (
		<footer className="footer-nav">
			<nav>
				<Link
				  to="/"
					className="nav-link"
				>Home</Link>
			</nav>
		</footer>
	);
}

export default Footer
