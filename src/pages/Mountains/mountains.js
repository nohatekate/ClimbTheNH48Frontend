import React from 'react';
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

import mountainData from '../../mountain-data/nh48mountains.json';

export default function Mountains(props) {
    const { isAuthenticated } = useAuth0();
    return (
        <>
            <h1 className="mb-5 flex justify-center">The 48 NH 4000 footers</h1>
            
                {Object.entries(mountainData).map(([key, value]) => (
                    <Link to={`/nh-48/${key}`} className={!isAuthenticated ? "disabled-link w-full max-w-2xl" : "w-full max-w-2xl"} key={key}>
                    <div className='flex flex-col w-full shadow-xl bg-tan p-5 rounded-lg m-1 max-w-2xl mb-3'>
                        
                            <div className=''>
                                <h2 className='font-medium'> Mt. {value.name}</h2>
                                <p>Elevation | {value.elevation}ft</p>
                            </div>
                        
                    </div>
                    </Link>
                ))}

        </>
    )
}