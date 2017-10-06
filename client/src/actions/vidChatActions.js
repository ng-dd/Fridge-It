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