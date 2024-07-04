import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState =[]

const blogSlice = createSlice({
	name: 'blogs',
	initialState,
	reducers: {
		createNewBlog(state,action){
			state.push(action.payload)
		},
		appendBlog(state, action) {
			state.push(action.payload)
		},
		setBlogs(state,action){
			return action.payload
		},
		likeBlog(state,action){
			const id = action.payload
			const blogToChange = state.find(n => n.id === id )

			const changedBlog = {
				...blogToChange,
				likes: blogToChange.likes + 1
			}

			return state.map(blog => blog.id !== id ? blog : changedBlog)
		},
		deleteTheBlog(state,action){
			const id = action.payload
			const deletedBlog = state.find(n => n.id === id)

			console.log(state.filter(blog => blog.id !== id))
			return state.filter(blog => blog.id !== id)
		}
	}
})

export const {createNewBlog, appendBlog, setBlogs, likeBlog, deleteTheBlog} = blogSlice.actions

export const initializeBlogs = () =>{
	return async dispatch =>{
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createABlog = (newBlogObject) => {
	return async dispatch => {
		const newBlog = await blogService.create(newBlogObject)
		dispatch(createNewBlog(newBlog))
	}
}

export const likeABlog = (likedBlog) => {
	return async dispatch => {
		const updatedBlog = await blogService.update(likedBlog.id,{
			...likedBlog,likes: likedBlog.likes + 1 
		})
		dispatch(likeBlog(updatedBlog.id))
	}
}

export default blogSlice.reducer