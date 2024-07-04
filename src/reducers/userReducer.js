import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { initializeBlogs } from './blogReducer'

const initialState = null 

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state,action){
			return action.payload
		},
	}
})

export const {setUser} = userSlice.actions


export const logInUser = (username,password) =>{
	return async dispatch =>{
		const user = await loginService.login({
			username,password
		})
		dispatch(setUser(user))
		window.localStorage.setItem(
			'loggedBlogappUser', JSON.stringify(user)
		)
		blogService.setToken(user.token)
		dispatch(initializeBlogs()) 
	}
}

export default userSlice.reducer