import React from 'react';
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";


import data from '../../mountain-data/nh48mountains.json';

export default function Mountains(props) {
    const { isAuthenticated } = useAuth0();
    return (

        isAuthenticated && (
        <div>
            <h1>The 48 NH 4000 footers</h1>
            {data.map(mountain => (


                <div key={mountain.name}>

                    <Link to={`/nh-48/${mountain.name}`} state={{ mountain }}>
                        {/* <h1>{mountain.rank}</h1> */}
                        <p>{mountain.name}</p>
                        <p>{mountain.elevation}</p>
                    </Link>
                </div>

            ))}

        </div>

    ))


}