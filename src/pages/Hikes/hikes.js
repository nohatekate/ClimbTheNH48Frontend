import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom'
import { HIKE_BASE_URL } from '../../utilities/constants'

export default function Hikes(props) {

    const [isHikesLoading, setIsHikesLoading] = useState(true)
    const [hikes, setHikes] = useState([]);
    const { user, isAuthenticated, isLoading } = useAuth0();

    // I need conditionals in here that say if the user has hikes then show the mountain with the hike details - if no hikes message to tel them to get hiking and check mountains off the list

    const getHikes = async () => {
        if (!isLoading) {
            const options = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "userid": `${user.sub}`
                }

            }

            try {
                const response = await fetch(`${HIKE_BASE_URL}`, options)
                const allHikes = await response.json()
                setHikes(allHikes)
                setIsHikesLoading(false)
            } catch (err) {
                console.log(err)
            }
        }

    }
    // eslint-disable-next-line
    useEffect(() => { getHikes() }, [isLoading])
    const loading = () => {
        return (<h1>Loading Hikes...</h1>)
    }

    const loaded = () => {
        if (!hikes.length) {
            return (<p className='flex text-center'>Once you start tracking your hikes they'll live here on this page. Come back anytime to check your progress!</p>)
        }
        return hikes.map((hike) => {

            return (

                <Link to={`/hike/${hike._id}/edit`} key={hike._id}>
                    <div className='flex flex-col flex-wrap space-y-9'>
                        <div className='shadow-xl bg-tan p-5 m-3 max-w-2xl rounded-lg '>
                            <h1>{hike.mountain}</h1>
                            <p>{hike.date}</p>
                            <p >{hike.comments}</p>
                            <p>{hike.summit}</p>
                        </div>
                    </div>
                </Link>)

        })
    }

    return (
        isAuthenticated &&
        (<>
            <h1 className="mb-5 flex justify-center">🥾 My Hikes Page 🥾</h1>
            {isHikesLoading ? loading() : loaded()}
        </>)

    )
}