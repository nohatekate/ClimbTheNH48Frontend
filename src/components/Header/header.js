import { Link } from 'react-router-dom';



export default function Header(props) {



return (
    <header>
        <nav>
            <Link to="/">Climb the NH 48
            </Link>
            <div>
            <Link to="/nh-48">List of all mountains
            </Link>
            </div>
        </nav>
    </header>)
}