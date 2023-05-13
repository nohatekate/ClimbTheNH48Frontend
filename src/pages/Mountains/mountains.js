import React from 'react';
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";


import mountainData from '../../mountain-data/nh48mountains.json';

export default function Mountains(props) {
    const { isAuthenticated } = useAuth0();

    return (

        <div>

            <h1>The 48 NH 4000 footers</h1>

            {Object.entries(mountainData).map(([key, value]) => (
                <Link to={`/nh-48/${key}`} className={!isAuthenticated ? "disabled-link" : ""} key={key}>
                    <div >
                        <p>{value.name}</p>
                        <p>{value.elevation}</p>
                    </div>
                </Link>
            ))}

        </div>
    )


}