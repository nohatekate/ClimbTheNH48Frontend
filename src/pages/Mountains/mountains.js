import React from 'react';
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";


import mountainData from '../../mountain-data/nh48mountains.json';

export default function Mountains(props) {
    const { isAuthenticated } = useAuth0();

    return (

        <div>

            <h1 className="mb-5 flex justify-center">The 48 NH 4000 footers</h1>
            <div className='flex flex-col flex-wrap space-y-9'>
                {Object.entries(mountainData).map(([key, value]) => (
                    <Link to={`/nh-48/${key}`} className={!isAuthenticated ? "disabled-link" : ""} key={key}>
                        
                            
                                <div className='shadow-xl bg-tan p-5 m-1 max-w-2xl rounded-lg'>
                                    <p>{value.name}</p>
                                    <p>{value.elevation}ft</p>
                                </div>
                        
                        
                    </Link>
                ))}
            </div>
        </div>
    )


}