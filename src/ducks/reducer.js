const initialState = {
  username: '',
  profile_pic: '',
  id: 0,
  post: {
    title: '',
    img: '',
    content: '',
    userId: '',
    profile_pic: ''
  }
}

const SET_USER = 'SET_USER'
const UPDATE_POST = 'UPDATE_POST'

export function setUser(userObj) {
  return {
    type: SET_USER,
    payload: userObj
  }
}

export function updatePost(trg) {
  const { name, value } = trg
  return {
    type: UPDATE_POST,
    payload: { name, value }
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...action.payload }
    case UPDATE_POST:
      return {
        ...state,
        post: { ...state.post, [action.payload.name]: action.payload.value }
      }
    default:
      return state
  }
}
