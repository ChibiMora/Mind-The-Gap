import axios from 'axios'

const GET_CURRENT_POINTS = 'GET_CURRENT_POINTS'
const GET_ALL_POINTS = 'GET_ALL_POINTS'
const ADD_POINTS = 'ADD_POINTS'

const getCurrentPoints = points => ({type: GET_CURRENT_POINTS, points})

const getAllPoints = allPoints => ({type: GET_ALL_POINTS, allPoints})

const initialState = {
  currentPoints: {},
  allPoints: [],
  isFetching: true
}

const addPoints = currentPoints => ({type: ADD_POINTS, currentPoints})

export const fetchCurrentPoints = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/points/currentPoints')
    dispatch(getCurrentPoints(data))
  }
}

export const fetchAllPoints = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/points/allPoints')
    dispatch(getAllPoints(data))
  }
}

export const updatePoints = input => {
  return async dispatch => {
    const {data} = await axios.put('/api/points/addPoints', input)
    dispatch(addPoints(data))
  }
}

export default function pointReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_POINTS:
      return {...state, currentPoints: action.points, isFetching: false}
    case GET_ALL_POINTS:
      return {...state, allPoints: action.allPoints}
    case ADD_POINTS:
      const newAllPoints = state.allPoints.filter(pointRow => {
        return pointRow.id !== action.currentPoints.id
      })
      return {
        ...state,
        allPoints: [...newAllPoints, action.currentPoints],
        currentPoints: action.currentPoints
      }
    default:
      return state
  }
}
