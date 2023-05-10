import { Routes, Route } from 'react-router';
import Hikes from '../../pages/Hikes/hikes'
import Show from '../../pages/Show/show'

export default function Main(props) {
    return (
        <main>
            <Routes>
                <Route path='/' element={<Hikes />} />
                <Route path='/hikes/:id' element={<Show />} />
            </Routes>
        </main>)
}