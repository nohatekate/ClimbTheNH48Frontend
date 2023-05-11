import { useLocation } from 'react-router-dom'



export default function MountainDetail(props) {
    // const {name} = useParams()

    // let state = useParams()
    let { state } = useLocation()
    let { mountain } = state
    console.log(state)
    return (
        <div>
            <h2>Mountain Detail Page</h2>
            <p>{mountain.name}</p>
            <p>{mountain.elevation}</p>
        </div>


    )
}


