import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { HIKE_BASE_URL } from '../../utilities/constants';

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
        hiker: "",
        urlName: mountainurl
    }

    const [newForm, setNewForm] = useState(initialState)


    const getMountainHikes = async () => {
        const options = {
            method: "GET"
        }

        try {
            const response = await fetch(`${HIKE_BASE_URL}/${mountainurl}/${user?.sub}`, options)
            const data = await response.json()
            console.log(data)
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
        if (evt.target.name === 'summit') {
            setNewForm({ ...newForm, summit: !newForm.summit })
        } else {
            setNewForm({ ...newForm, [evt.target.name]: evt.target.value });
        }
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

            <div className='flex justify-between mb-5 w-full max-w-xl'>
                <h1 className=''>Mt. {mountain.name}</h1>
                <p className=''>{mountain.elevation}ft</p>

            </div>

            <div className='w-full'>
                <h2 className='flex justify-center'>Track Your Hike!</h2>
                {isAuthenticated ? (
                    <form className="flex flex-col items-center w-full " onSubmit={handleSubmit}>
                        <textarea className='w-full shadow-sm   max-w-2xl rounded-lg'
                            value={newForm.comments}
                            name="comments"
                            placeholder="Keep your favorite details about your hike here - weather, hiking companions, etc."
                            onChange={handleChange}></textarea>
                        <div className='flex justify-between items-center mb-5'>
                            <input className='w-full shadow-sm  max-w-2xl rounded-sm mr-5 p-1'
                                type="date"
                                value={newForm.date}
                                name="date"
                                placeholder="date hiked"
                                required
                                onChange={handleChange}
                            />
                            <label className="mr-2 " htmlFor="summit">Summit!?</label>
                            <input
                                type="checkbox"
                                name="summit"
                                value={newForm.summit}
                                onChange={handleChange}
                                title="If you reached the top click me!"
                            />

                        </div>
                        <input className="rounded-lg px-3 py-2 text-tan bg-darkest-green font-medium hover:bg-tan hover:text-darkest-green ease-in-out duration-300 mb-5 max-w-xs flex self-center" type="submit" value="Create Hike" />
                    </form>
                ) : (
                    <p>Log in to track your hike</p>
                )}
            </div>

            {!hikeIsLoading && mountainHikes?.map((hike) => {
                // if (hike.hiker === user.sub) {
                return (
                    <div className='flex flex-col w-full shadow-xl bg-tan p-5 rounded-lg max-w-2xl mb-5 ' key={hike._id}>

                        <p className='mb-3'>{hike.date}</p>
                        <p className='mb-3'>{hike.comments}</p>
                        {hike.summit && <p className='mb-5'>Summited: ✅</p>}
                        <Link className='flex self-center' to={`/hike/${hike._id}/edit`}><button className="rounded-lg px-3 py-2 text-tan bg-darkest-green font-medium hover:bg-light-tan hover:text-darkest-green ease-in-out duration-300 mb-1 max-w-xs ">Edit Hike</button></Link>

                    </div>)
            })}

        </>
    )
}


