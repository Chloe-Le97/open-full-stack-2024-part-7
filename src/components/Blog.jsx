import { useState } from "react"
import { useParams } from 'react-router-dom'
import CommentForm from "./CommentForm"

const Blog = ({ blogs, handleLikeBlog, deleteBlog, currentUsername }) => {
	const id = useParams().id
	const blog = blogs.find(n => n.id === id)
	if (!blog) {
		return null
	}

	return(
	<div>
		<h1> 
			{blog.title}
		</h1>
		<div>
			<div>Url : {blog.url}</div>
			<div>
				Likes: {blog.likes}
				<button onClick={() => handleLikeBlog(blog)}>like</button>
			</div>
			<div>Author : {blog.author}</div>
			<div>Added by {blog.user?.username}</div>
			{blog.user?.username === currentUsername ? (<button onClick={() => deleteBlog(blog)}>remove</button>):(<div></div>) }
			<h2>Comments</h2>
			<CommentForm blogID={blog.id} />
			{blog.comments?.map((comment,index) => (
				<li key={index}>{comment}</li>
			))}
		</div>
	</div>  
	)
}
export default Blog