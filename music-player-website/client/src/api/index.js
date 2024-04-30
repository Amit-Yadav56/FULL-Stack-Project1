

//for fetching all the necessary information from the server



//axios links the frontend and the backend
import axios from 'axios'
//base url of the express sever
const baseUrl = 'http://localhost:4000/'


//We are validating if the user exists
export const validateUser = async (token) => {
    try {
        //api url to get result from backend if userexists
        const res = await axios.get(`${baseUrl}api/users/login`, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getAllUsers = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/users/getAllUsers`)
        return res.data
    } catch (error) {
        return null
    }
}
export const getAllSongs = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/songs/getAll`)
        return res.data
    } catch (error) {
        return null
    }
}
export const getAllAlbums = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/albums/getAll`)
        return res.data
    } catch (error) {
        return null
    }
}
export const getAllArtists = async () => {
    try {
        const res = await axios.get(`${baseUrl}api/artists/getAll`,)
        return res.data
    } catch (error) {
        return null
    }
}

export const changingUserRole = async (userId, role) => {
    try {
        const res = axios.put(`${baseUrl}api/users/updateRole/${userId}`, {
            data: { role: role },
        });
        return res;
    } catch (error) {
        return null;
    }
};


export const deleteUser = async (user_id) => {
    try {
        const res = await axios.delete(`${baseUrl}api/users/deleteUser/${user_id}`)
        return res.data
    } catch (error) {
        return null
    }
}


export const deleteSongById = async (user_id) => {
    try {
        const res = await axios.delete(`${baseUrl}api/songs/deleteSong/${user_id}`)
        return res.data
    } catch (error) {
        return null
    }
}


