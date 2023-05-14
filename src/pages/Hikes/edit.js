import { useState, useEffect } from 'react'

import { getHike, deleteHike, updateHike } from '../../utilities/hike-services'
import { useParams, useNavigate } from 'react-router-dom'


export default function Edit() {

    const { id } = useParams()
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
            // console.log( hikeToEdit)
            // setHike(hikeToEdit)
            if (hikeToEdit) {
                const { mountain, comments, date, summit, hiker } = hikeToEdit
                setEditForm({ mountain, comments, date, summit, hiker })
            }else{
                console.log("whyyyyy", editForm.mountain)
                navigate(`/nh-48/${editForm.mountain.toLowerCase()}`)
            }
            setIsLoading(false)

        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        handleRequest()
        // eslint-disable-next-line
    }, [isLoading])

    async function handleHikeDelete(evt) {
        evt.preventDefault()
        try {
            // call the delete utitlity
            const delResponse = await deleteHike(id)


            if (delResponse._id) {

                // const mountainUrl = editForm.mountain.toLowerCase()
                navigate(`/nh-48/${editForm.mountain.toLowerCase()}`)
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
                navigate(`/nh-48/${editForm.mountain.toLowerCase()}`)
            } else {
                throw Error('Something went wrong')
            }
        } catch (err) {
            navigate(`/hike/${id}/edit`)
        }
    }

    const loaded = () => (<>
        <div >
            <h1 clasname="mb-5">Edit Your Hike</h1>

        </div>

        <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
            <textarea className='mb-5'
                value={editForm.comments}
                name="comments"
                placeholder="Keep your favorite details about your hike here - weather, hiking companions"
                onChange={handleChange}></textarea>
            <div className='flex justify-between mb-5 space-x-0'>
                <input
                    type="date"
                    value={editForm.date}
                    name="date"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={editForm.summit}
                    name="summit"
                    onChange={handleChange}
                />
            </div>
            <div className='flex justify-center space-x-4 mb-5'>
                <button className="rounded-lg px-3 py-2 text-darkest-green bg-tan font-medium hover:bg-darkest-green hover:text-tan ease-in-out duration-300" type="submit" >Update Hike</button>
                <button className="rounded-lg px-3 py-2 text-darkest-green bg-tan font-medium hover:bg-red-700 hover:text-white ease-in-out duration-300 " onClick={handleHikeDelete}> Delete Hike</button>
            </div>
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
