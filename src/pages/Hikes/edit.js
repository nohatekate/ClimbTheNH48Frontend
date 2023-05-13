import { useState, useEffect } from 'react'

import { getHike, deleteHike, updateHike } from '../../utilities/hike-services'
import { useParams, useNavigate } from 'react-router-dom'


export default function Edit() {

    const { id } = useParams()
    console.log(id)
    const navigate = useNavigate()

    // const [hike, setHike] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [editForm, setEditForm] = useState({
        mountain: "",
        comments: "",
        date: "",
        summit: false,
        hiker: ""
    })

    async function handleRequest() {
        try {
            const hikeToEdit = await getHike(id)
            console.log(hikeToEdit)
            // setHike(hikeToEdit)
            const { mountain, comments, date, summit, hiker } = hikeToEdit
            setEditForm({ mountain, comments, date, summit, hiker })
            setIsLoading(false)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleRequest()
        // eslint-disable-next-line
    }, [isLoading])

    async function handleHikeDelete() {
        try {
            // call the delete utitlity
            const delResponse = await deleteHike(id)
            console.log(delResponse)

            if (delResponse._id) {
                navigate('/nh-48')
            } else {
                throw new Error("Something went wrong")
            }
            // check response -> if okay -> redirect to success location 
            // if not ok -> throw error
        } catch (err) {
            console.log(err)
            navigate(`/hike/${id}/edit`)
            // error -> redirect back to current page 
        }
    }

    const handleChange = (evt) => {
        setEditForm({ ...editForm, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            console.log(editForm)
            const updatedHike = await updateHike(id, editForm)

            if (updatedHike._id) {
                console.log(updatedHike)
                navigate(`/nh-48`)
            } else {
                throw Error('Something went wrong')
            }
        } catch (err) {
            navigate(`/hike/${id}/edit`)
        }
    }

    const loaded = () => (<>
        <div >
            <h1>Edit Your Hike</h1>

            <button onClick={handleHikeDelete}> Delete Hike</button>
        </div>

        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={editForm.comments}
                name="comments"
                placeholder="Keep your favorite details about your hike here - weather, hiking companions"
                onChange={handleChange}
            />
            <input
                type="text"
                value={editForm.date}
                name="date"
                placeholder="date hiked"
                onChange={handleChange}
            />
            <input
                type="text"
                value={editForm.summit}
                name="summit"
                onChange={handleChange}
            />
            <input type="submit" value="Update Hike" />
        </form>


    </>)


    const loading = () => {
        return (
            <div >
                <h1>
                    Loading...
                    <span>
                        <img alt=""
                            className="spinner"
                            src="https://freesvg.org/img/1544764567.png"
                        /> {" "}
                    </span>
                </h1>
            </div>
        )
    }

    return (
        <section>
            {isLoading ? loading() : loaded()}
        </section>
    )
}
