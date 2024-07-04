import axios from 'axios'
const baseUrl = '/api/blogs'

const create = async (newObject, blogID) =>{
	const response = await axios.post(`${baseUrl}/${blogID}/comments`, newObject)
	return response.data
}


export default { create }