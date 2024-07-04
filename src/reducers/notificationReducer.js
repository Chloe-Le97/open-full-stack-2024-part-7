const notificationReducer = (state = '', action) =>{
	switch(action.type){
		case 'ADD_NOTI':{
			return action.payload
		}
		case 'REMOVE_NOTI':{
			return ''
		}
	default: return state
	}
}

export const setNoti = (content) => {
	return {
		type: 'ADD_NOTI',
		payload: content
	}
}

export const removeNoti = () =>{
	return {
		type: 'REMOVE_NOTI',
	}
}

export default notificationReducer