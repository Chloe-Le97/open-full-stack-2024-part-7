import { useState } from 'react'
import commentService from '../services/comments'
import { initializeBlogs } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const CommentForm = ({blogID}) =>{
	const [comment, setComment] = useState('')
	const dispatch = useDispatch()

	const addComment = async (event) =>{
		event.preventDefault()
		const commentObject = {
			comment : comment
		}

		await commentService.create(commentObject,blogID)
		dispatch(initializeBlogs())
		setComment('')
	}

	return (
		<form onSubmit={addComment}>
			<div>
				<input
				type="text"
				value={comment}
				name="title"
				onChange={({ target }) => setComment(target.value)}
			/>
			</div>
			<button type="submit">add comment</button>
		</form>
	)
}

export default CommentForm