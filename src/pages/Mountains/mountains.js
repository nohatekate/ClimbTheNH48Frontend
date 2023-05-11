import data from '../../mountain-data/nh48mountains.json'

export default function Mountains(props) {
    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}