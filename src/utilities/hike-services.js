import * as hikeAPI from './hike-api'

export async function getHikes(){
    try {
        const data = await hikeAPI.index()
        return data 
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function createHike(data){
    try {
        const hikeData = await hikeAPI.create(data)
        return hikeData 
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function getHike(id){
    try {
        const hikeData = await hikeAPI.detail(id)
        return hikeData 
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function deleteHike(id){
    try {
        const deletedHike = await hikeAPI.destroy(id)
        return deletedHike 
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}

export async function updateHike(id, data){
    try {
        
        const updatedHike = await hikeAPI.update(id, data)
        return updatedHike 
    } catch (err) {
        console.log(err)
        throw new Error(err)
    }
}
