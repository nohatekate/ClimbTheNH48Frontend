import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { HIKE_BASE_URL } from '../../utilities/constants'
import { Link, useParams } from 'react-router-dom';

import mountainData from '../../mountain-data/nh48mountains.json'

export default function MountainDetail(props) {

    const [hikeIsLoading, setHikeIsLoading] = useState(true)
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [mountainHikes, setMountainHikes] = useState([]);
    const { mountainurl } = useParams();
    const mountain = mountainData[mountainurl]

    const initialState = {
        mountain: mountain.name,
        comments: "",
        date: "",
        summit: false,
        hiker: ""
    }
    const [newForm, setNewForm] = useState(initialState)

    const getMountainHikes = async () => {
        const options = {
            method: "GET"
        }
        try {
            const response = await fetch(`${HIKE_BASE_URL}/${mountain.name}/${user?.sub}`, options)
            const data = await response.json()
            setMountainHikes(data)
            setHikeIsLoading(false)
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getMountainHikes()
        // eslint-disable-next-line
    }, [hikeIsLoading, isLoading])



    const handleChange = (evt) => {
        setNewForm({ ...newForm, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {

        evt.preventDefault()

        try {
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...newForm, hiker: user.sub })
            }
            const response = await fetch(HIKE_BASE_URL, options)

            if (response.ok) {
                setNewForm(initialState)
                setHikeIsLoading(true)
                return response.json()

            } else {
                throw new Error("Invalid POST Request")
            }

        } catch (err) {
            console.log(err)
            return err
        }
    }

    return (
        <>

            <div className='flex justify-between mb-5 '>
                <h1 className=''>{mountain.name}</h1>
                <p className=''>{mountain.elevation}ft</p>

            </div>
            {!hikeIsLoading && mountainHikes?.map((hike) => {
                if (hike.hiker === user.sub) {
                    return (
                        <div key={hike._id}>
                            <p>{hike.date}</p>
                            <p >{hike.comments}</p>
                            {hike.summit && <p >✅</p>}
                            <Link to={`/hike/${hike._id}/edit`}><button className="rounded-lg px-3 py-2 text-tan bg-darkest-green font-medium hover:bg-tan hover:text-darkest-green ease-in-out duration-300 mb-5">Edit Hike</button></Link>
                        </div>)
                } else {
                    return null
                }

            })}
            <div>

                <h2 className='flex justify-center'>Track Your Hike!</h2>
                {isAuthenticated ? (
                    <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
                        <textarea
                            value={newForm.comments}
                            name="comments"
                            placeholder="Keep your favorite details about your hike here - weather, hiking companions"
                            onChange={handleChange}></textarea>
                        <div className='flex justify-between mb-5'>
                            <input
                                type="date"
                                value={newForm.date}
                                name="date"
                                placeholder="date hiked"
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                value={newForm.summit}
                                name="summit"
                                onChange={handleChange}
                            />
                        </div>
                        <input className="rounded-lg px-3 py-2 text-tan bg-darkest-green font-medium hover:bg-tan hover:text-darkest-green ease-in-out duration-300 mb-5 max-w-xs" type="submit" value="Create Hike" />
                    </form>
                ) : (
                    <p>Log in to track your hike</p>
                )}
            </div>
        </>

    )
}


