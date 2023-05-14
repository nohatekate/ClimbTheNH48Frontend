import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
// import { Link } from 'react-router-dom'
import { HIKE_BASE_URL } from '../../utilities/constants'

export default function Hikes(props) {

    const [isLoading, setIsLoading] = useState(true)
    const [hikes, setHikes] = useState([]);
    const { user, isAuthenticated } = useAuth0();
    console.log(user)

    // I need conditionals in here that say if the user has hikes then show the mountain with the hike details - if no hikes message to tel them to get hiking and check mountains off the list
    //if hiker === logged in user show all their hikes
    const getHikes = async () => {
        const options = {
            method: "GET"
        }
        try {
            const response = await fetch(HIKE_BASE_URL, options)
            const allHikes = await response.json()
            console.log(allHikes)
            setHikes(allHikes)
            setIsLoading(false)
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => { getHikes() }, [])
    console.log(`There are ${hikes.length} hikes available to render`)


    const loading = () => {
        return (<h1>Loading Hikes...</h1>)
    }

    const loaded = () => {

        return hikes?.map((hike) => {
            if (hike.hiker === user.sub) {
                return (
                    <div className='flex flex-col flex-wrap space-y-9' key={hike._id}>
                        <div className='shadow-xl bg-tan p-5 m-3 max-w-2xl rounded-lg'>
                            <h1>{hike.mountain}</h1>
                            <p>{hike.date}</p>
                            <p >{hike.comments}</p>
                            <p>{hike.summit}</p>
                        </div>
                    </div>)
            } else{
                return null
            }


        })
    }

    return (
        isAuthenticated &&
        (<>

            <h1 className="mb-5 flex justify-center">🥾 Hikes Page 🥾</h1>
            {isLoading ? loading() : loaded()}
        </>)

    )
}