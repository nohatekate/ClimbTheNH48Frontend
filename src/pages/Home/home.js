import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function HOME(props) {
    const { isAuthenticated } = useAuth0();
    if (isAuthenticated) {
        return (<Navigate replace to="/nh-48" />)
    } else {
        return (

            <div>
                <h1>Welcome to Climb the NH-48!</h1> <p className="">This app was created so that you can track your hikes throughout the White Mountains. When you've summited all 48 4000 foot mountains don't forget to <a href="http://www.amc4000footer.org/how-to-apply.html" className="text-blue-600">apply for your badge! </a></p>
                <p>Please Log in to start keeping track of your hikes.</p>
            </div>

        )
    }
}

