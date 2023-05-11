import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";


export default function MountainDetail(props) {

    let { state } = useLocation()
    let { mountain } = state

    const { user, isAuthenticated, isLoading } = useAuth0();

    // const [isLoading, setIsLoading] = useState

    const [newForm, setNewForm] = useState({
        mountain: mountain.name,
        comments: "",
        date: "",
        summit: "",
        hiker: ""
    })

    useEffect(() => {

    }, [isLoading])

    // if (isLoading) {
    //     return <div>Loading ...</div>;
    // }
    console.log(user)

    // async function handleRequest() {
    //     try {
    //         const apiResponse = await getHike()
    //         setHike(apiResponse)
    //         setIsLoading(false)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }




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
            console.log(options.body)
            const response = await fetch("http://localhost:4000/hike", options)

            if (response.ok) {
                setNewForm({
                    mountain: mountain.name,
                    comments: "",
                    date: "",
                    summit: "",
                    hiker: ""
                })
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

            <div>

                <h2>Track Your Hike!</h2>
                {isAuthenticated ? (
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
                            placeholder="true or false"
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


