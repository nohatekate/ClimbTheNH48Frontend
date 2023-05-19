import { useState, useEffect } from 'react'
import { getHike, deleteHike, updateHike } from '../../utilities/hike-services'
import { useParams, useNavigate } from 'react-router-dom'


export default function Edit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [editForm, setEditForm] = useState({
        mountain: "",
        comments: "",
        date: "",
        summit: false,
        hiker: "",
        urlName: ""
    })

    async function handleRequest() {
        try {
            const hikeToEdit = await getHike(id)
            // setHike(hikeToEdit)
            if (hikeToEdit) {
                const { mountain, comments, date, summit, hiker, urlName } = hikeToEdit
                setEditForm({ mountain, comments, date, summit, hiker, urlName })
            } else {
                navigate(`/nh-48/${editForm.urlName}`)
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

                const mountainUrl = editForm.urlName
                navigate(`/nh-48/${mountainUrl}`)
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
        if (evt.target.name === 'summit') {
            setEditForm({ ...editForm, summit: !editForm.summit })
        } else {
            setEditForm({ ...editForm, [evt.target.name]: evt.target.value });
        }
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const updatedHike = await updateHike(id, editForm)

            if (updatedHike._id) {
                navigate(`/nh-48/${editForm.urlName}`)
            } else {
                throw Error('Something went wrong')
            }
        } catch (err) {
            navigate(`/hike/${id}/edit`)
        }
    }

    const loaded = () => (<>
        <div >
            <h1 className="flex justify-center mb-5 w-full max-w-xl">Edit Your Hike on Mount {editForm.mountain}</h1>

        </div>
        <form className="flex flex-col items-center w-full " onSubmit={handleSubmit}>
            <textarea className='w-full shadow-sm   max-w-2xl rounded-lg'
                value={editForm.comments}
                name="comments"
                placeholder="Keep your favorite details about your hike here - weather, hiking companions, etc."
                onChange={handleChange}></textarea>
            <div className='flex justify-between items-center mb-5'>
                <input className='w-full shadow-sm  max-w-2xl rounded-sm mr-5 p-1'
                    type="date"
                    value={editForm.date}
                    name="date"
                    placeholder="date hiked"
                    required
                    onChange={handleChange}
                />
                <label className="mr-2 " htmlFor="summit">Summit!?</label>
                <input
                    type="checkbox"
                    name="summit"
                    value={editForm.summit}
                    onChange={handleChange}
                    title="If you reached the top click me!"
                />

            </div>
            <div className='flex justify-center space-x-4 mb-5'>
                <button className="rounded-lg px-3 py-2 text-light-tan bg-darkest-green font-medium hover:bg-tan hover:text-darkest-green ease-in-out duration-300" type="submit" >Update Hike</button>
                <button className="rounded-lg px-3 py-2 text-white bg-red-800 font-medium hover:bg-red-700 hover:text-white ease-in-out duration-300 " onClick={handleHikeDelete}> Delete Hike</button>
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
