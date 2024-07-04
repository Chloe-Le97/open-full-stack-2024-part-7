import {
	BrowserRouter as Router,
	Routes, Route, Link
  } from 'react-router-dom'

const Users = ({users}) => {

	return (
		<div>
			<h2>Users list</h2>
			<table>
				<thead>
					<tr>
						<th>Username</th>
						<th>Blogs created</th>
					</tr>
				</thead>
				{users.map(user => (
					<tbody key={user.id}>
						<tr>
							<td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
							<td>{user.blogs.length}</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>

	)
}

export default Users