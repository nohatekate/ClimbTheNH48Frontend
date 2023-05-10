import { useState, useEffect } from 'react';

export default function Hikes(props) {

    const [isLoading, setIsLoading] = useState(true)
    const [hikes, setHikes] = useState([]);

    const BASE_URL = "http://localhost:4000/hike"

    const getHikes = async () => {
        const options = {
            method: "GET"
        }
        try {
            const response = await fetch(BASE_URL, options)
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

    const loaded = () => {
        return hikes?.map((hike) => {
            return (
                <div key={hike._id}>
                    <h1>{hike.mountain}</h1>
                </div>
            )
        })
    }

    return (
        <>
            <h1>🥾 Hikes Page 🥾 </h1>
            {loaded()}
        </>

    )
}