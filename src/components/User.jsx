import {useParams} from 'react-router-dom'

const User = ({users}) =>{
	const id = useParams().id
	const user = users.find(n => n.id === id)

	if (!user) {
		return null
	}

	return (
		<div>
			<h1>{user.name?(user.name):(user.username)}</h1>
			<h2>Added blogs</h2>
			{user.blogs.map(blog => (
				<li key={blog.id}>{blog.title}</li>
			))}
		</div>
	)
}

export default User