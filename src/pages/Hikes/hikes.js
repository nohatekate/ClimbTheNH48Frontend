import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom'
import { HIKE_BASE_URL } from '../../utilities/constants'

export default function Hikes(props) {

    const [isHikesLoading, setIsHikesLoading] = useState(true)
    const [hikes, setHikes] = useState([]);
    const { user, isAuthenticated } = useAuth0();
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
                <div className='mb-5 flex flex-col w-full shadow-xl bg-tan p-5 rounded-lg max-w-2xl' key={hike._id}>
                    <h1 className='mb-3'>{hike.mountain}</h1>
                    <p className='mb-3'>{hike.date}</p>
                    <p className='mb-3'>{hike.comments}</p>
                    {hike.summit && <p className='mb-5'>Summited: ✅</p>}
                    <p>{hike.summit}</p>
                    <Link className='flex self-center' to={`/hike/${hike._id}/edit`}><button className="rounded-lg px-3 py-2 text-tan bg-darkest-green font-medium hover:bg-light-tan hover:text-darkest-green ease-in-out duration-300 mb-1 max-w-xs ">Edit Hike</button></Link>
                </div>
            )

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