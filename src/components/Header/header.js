import { Link } from 'react-router-dom';
import LoginButton from '../LoginButton';
import LogoutButton from '../Logout.js';
import { useAuth0 } from "@auth0/auth0-react";



export default function Header(props) {
    const { isAuthenticated } = useAuth0();
    return (
        <header className='shadow-md flex w-full justify-center'>
            <nav className="flex justify-between space-x-4 bg-darkest-green text-tan w-full max-w-5xl">
                <Link to={'/nh-48'} className={"rounded-lg px-3 py-2 text-tan font-medium hover:bg-tan hover:text-darkest-green ease-in-out duration-300 "}>NH-48</Link>
                <div>
                    { isAuthenticated && <Link to={'/my-hikes'} className={"rounded-lg px-3 py-2 text-tan font-medium hover:bg-tan hover:text-darkest-green ease-in-out duration-300"}>My Hikes</Link>}
                    <LoginButton />
                    <LogoutButton />
                </div>
            </nav >
        </header >)
}



