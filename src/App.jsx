import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import blogService from './services/blogs'
import userService from './services/users'
import { useSelector, useDispatch } from 'react-redux'
import { setNoti, removeNoti } from './reducers/notificationReducer'
import blogReducer, {setBlogs, createNewBlog, initializeBlogs, likeBlog, deleteTheBlog, createABlog, likeABlog} from './reducers/blogReducer'
import {logInUser, setUser} from './reducers/userReducer'
import {
	BrowserRouter as Router,
	Routes, Route, Link
  } from 'react-router-dom'

const App = () => {
	const dispatch = useDispatch()
	const notification = useSelector(state => state.notification)
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [message, setMessage] = useState(null)
	const [blogTitle, setBlogTitle] = useState('')
	const [blogAuthor, setBlogAuthor] = useState('')
	const [blogUrl, setBlogUrl] = useState('')
	const [users, setUsers] = useState([])


  useEffect(()=>{
	const fetchUsers = async () =>{
		const users = await userService.getAllUser()
		setUsers(users)
	}

	const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

	if(loggedUserJSON){
		const user = JSON.parse(loggedUserJSON)
		dispatch(setUser(user))
		blogService.setToken(user.token)
		dispatch(initializeBlogs())
		fetchUsers()
	}

  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
	dispatch(logInUser(username,password))

	setMessage('Welcome')
	setTimeout(()=>{
		setMessage(null)
	},5000)
  }

  const createBlog = async(blogObject) =>{
		console.log(blogObject)
		dispatch(createABlog(blogObject))
		// setBlogs(blogs.concat(newBlog))
		blogFormRef.current.toggleVisibility()
		setBlogAuthor('')
		setBlogTitle('')
		setBlogUrl('')
		dispatch(setNoti(`A new blog '${blogObject.title}' by ${blogObject.author} is added`))
		setTimeout(()=>{
			dispatch(removeNoti())
		},5000)
		// setMessage(`A new blog '${newBlog.title}' by ${newBlog.author} is added`)
		// setTimeout(()=>{
		// 	setMessage(null)
		// },5000)
  }
  
  const deleteBlog = async(blog) =>{
	const blogId = blog.id;
	const blogName = blog.title;
	const blogAuthor = blog.author;
	if(window.confirm(`Remove blog '${blogName}' by ${blogAuthor} ?`)){
		try{
			await blogService.remove(blogId)
			dispatch(setNoti(`Blog '${blogName}' is deleted`))
			setTimeout(()=>{
				dispatch(removeNoti())
			},5000)			
			dispatch(deleteTheBlog(blog.id))
			
		}catch(exception){
			console.error(exception)
			setMessage("You do not have permission to delete this blog")
			setTimeout(()=>{
				setMessage(null)
			},5000)
		}
	}
	
  }

  const handleLogout = () =>{
	window.localStorage.removeItem('loggedBlogappUser')
	setUser(null)
	setBlogs([])
  }

  const handleLike = async (blog) =>{
	try{
	dispatch(likeABlog(blog))
	dispatch(setNoti(`You like '${blog.title}'`))
	setTimeout(()=>{
		dispatch(removeNoti())
	},5000)		
	}catch(exception){
		console.error(exception)
		setMessage("There's error in creating new blog")
		setTimeout(()=>{
			setMessage(null)
		},5000)
	}

  }

  const loginForm = () =>(
	<form onSubmit={handleLogin}>
		<h2>Log in to application</h2>
		<div>
		username
			<input
			type="text"
			value={username}
			name="Username"
			onChange={({ target }) => setUsername(target.value)}
		/>
		</div>
		<div>
		password
			<input
			type="password"
			value={password}
			name="Password"
			onChange={({ target }) => setPassword(target.value)}
		/>
		</div>
		<button type="submit">login</button>
	</form>
	)

	const sortedBlogs = blogs;

	const blogFormRef = useRef()

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const blogsList = () =>(
		
		<div>
			
			<Togglable buttonLabel="new note" ref={blogFormRef}>
				<CreateBlogForm createBlog={createBlog}/>
			</Togglable>
			{sortedBlogs.map(blog =>
				<div key={blog.id} style={blogStyle}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></div>
				// <Blog key={blog.id} blog={blog} currentUsername={user.username} handleLikeBlog={handleLike} deleteBlog={deleteBlog} />
			)}
		</div>
	)

	const padding = {
		padding: 5
	  }

  return (
	<Router>
		 <div>
			<Link style={padding} to="/">home</Link>
			<Link style={padding} to="/users">users</Link>
		</div>
		<div>
			<Notification message={notification} />
			<div>{user === null ? (<div></div>):(
				<div>
					<h2>blogs</h2>
					<h3>{user.name} logged in <button onClick={handleLogout}>logout</button></h3>
				</div>
			)}</div>
			<Routes>
				<Route path="/blogs/:id" element={<Blog blogs={blogs} currentUsername={user?.username} handleLikeBlog={handleLike} deleteBlog={deleteBlog} />}/>
				<Route path="/users/:id" element={<User users={users} />} />
				<Route path="/users" element={<Users users={users} />} />
				<Route path="/" element=
					{user === null ? 
						loginForm():
						blogsList()
					}/>
			</Routes>
		</div>
	</Router>
    
  )
}

export default App