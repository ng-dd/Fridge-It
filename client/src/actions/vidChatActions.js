import Peer from 'peerjs';


export const connectUsers = (secondaryId) => {
  return function(dispatch){
    dispatch({type: 'MAKE_CONNECTION', payload: secondaryId})
  }
}

export const idGen = () => {
  return function(dispatch){
    dispatch({type: 'RECIEVE_ID'})
  }
}

export const connectVideo = (secondaryId) => {
  return function(dispatch){
    dispatch({type: 'VIDEO_CONNECTION', payload: secondaryId})
  }
}