import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <button className="rounded-lg px-3 py-2 text-tan font-medium hover:bg-tan hover:text-darkest-green ease-in-out duration-300 " onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
            </button>
        ));
};

export default LogoutButton;


