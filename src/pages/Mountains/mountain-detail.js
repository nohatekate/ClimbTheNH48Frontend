import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { HIKE_BASE_URL } from '../../utilities/constants'

export default function MountainDetail(props) {

    let { state } = useLocation()
    let { mountain } = state

    const [hikeIsLoading, setHikeIsLoading] = useState(true)
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [mountainHikes, setMountainHikes] = useState([]);
    console.log(user.sub)
    // const [isLoading, setIsLoading] = useState
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
            const response = await fetch(`${HIKE_BASE_URL}/${mountain.name}/${user.sub}`, options)
            const data = await response.json()
            console.log("some stupid string", data)
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
            // console.log(options.body)
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
            <div>
                <h1>{mountain.name}</h1>
                <p>elevation {mountain.elevation}</p>

            </div>
            {!hikeIsLoading && mountainHikes?.map((hike) => {
                if (hike.hiker === user.sub) {
                    return (
                        <div key={hike._id}>
                            <p>{hike.date}</p>
                            <p>{hike.comments}</p>
                            {hike.summit && <p>✅</p>}
                        </div>)
                } else {
                    return null
                }

            })}
            {/* I need something here that makes a conditional so that if the user has a hike they only see that hike - maybe eventually lead to an edit page / maybe also "create" page so we can create multiple hikes but I'm planning for one summit per mountain */}
            <div>

                <h2>Track Your Hike!</h2>
                {isAuthenticated  ? (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={newForm.comments}
                            name="comments"
                            placeholder="Keep your favorite details about your hike here - weather, hiking companions"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
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
                        <input type="submit" value="Create Hike" />
                    </form>
                ) : (
                    <p>Log in to track your hike</p>
                )}
            </div>
        </>

    )
}


