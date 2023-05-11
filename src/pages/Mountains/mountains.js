import React from 'react';
import { Link } from 'react-router-dom'

import data from '../../mountain-data/nh48mountains.json';

export default function Mountains(props) {

    return (
        <>
            <h1>The 48 NH 4000 footers</h1>
            {data.map(mountain => (


                <div key={mountain.name}>

                    <Link to={`/nh-48/${mountain.name}`} state={{ mountain }}>
                        <p>{mountain.name}</p>
                        <p>{mountain.elevation}</p>
                    </Link>
                </div>

            ))}

        </>

    )


}