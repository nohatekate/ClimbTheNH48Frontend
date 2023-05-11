import { Routes, Route } from 'react-router';
import Hikes from '../../pages/Hikes/hikes'
import Show from '../../pages/Show/show'
import Mountains from '../../pages/Mountains/mountains.js';
import Home from '../../pages/Home/home.js'

export default function Main(props) {
    return (
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/nh_48' element={<Mountains />} />
                <Route path='/my-hikes' element={<Hikes />} />
                <Route path='/hikes/:id' element={<Show />} />

            </Routes>
        </main>)
}