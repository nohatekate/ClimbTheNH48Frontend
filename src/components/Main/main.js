import { Routes, Route } from 'react-router';
import Hikes from '../../pages/Hikes/hikes'
import MountainDetail from '../../pages/Mountains/mountain-detail'
import Mountains from '../../pages/Mountains/mountains.js';
import Home from '../../pages/Home/home.js'
import Profile from '../Profile.js'

export default function Main(props) {
    return (
        <main>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/nh-48' element={<Mountains />} />
                <Route path='/nh-48/:name' element={<MountainDetail />} />
                <Route path='/my-hikes' element={<Hikes />} />
                <Route path='/profile'element={<Profile/>}/>
                

            </Routes>
        </main>)
}