import { Link } from 'react-router-dom';
import LoginButton from '../LoginButton';
import LogoutButton from '../Logout.js';



export default function Header(props) {
return (
    <header>
        <nav>
            <Link to="/">Climb the NH 48
            </Link>
            <div>
            <Link to="/nh-48">List of all mountains
            </Link>
            <LoginButton/>
            <LogoutButton/>
            </div>
        </nav>
    </header>)
}