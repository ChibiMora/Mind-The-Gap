import axios from 'axios'
import history from '../history'
import {fetchActivities} from './reducers/activityReducer'
import {fetchCurrentPoints, fetchAllPoints} from './reducers/pointsReducer'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const PUT_POINTS = 'PUT_POINTS'
const CREATE_USER = 'CREATE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const putPoints = user => ({type: PUT_POINTS, user})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    dispatch(fetchActivities())
    dispatch(fetchCurrentPoints())
    dispatch(fetchAllPoints())
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    dispatch(fetchActivities())
    dispatch(fetchCurrentPoints())
    dispatch(fetchAllPoints())
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const createUser = (
  email,
  password,
  method,
  firstName,
  lastName
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName
    })
    console.log('res data inside create user thunk', res.data)
    dispatch(getUser(res.data))
    dispatch(fetchActivities())
    dispatch(fetchCurrentPoints())
    dispatch(fetchAllPoints())
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const updatePoints = points => {
  return async dispatch => {
    const {data} = await axios.put(`/api/users`, {points: points})
    dispatch(putPoints(data))
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case PUT_POINTS:
      return action.user
    default:
      return state
  }
}
