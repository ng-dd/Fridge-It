import Peer from 'peerjs';
import axios from 'axios';

//fridges/names
export const getUsers = () => {
  return function(dispatch) {
    axios.get('/api/users/')
      .then((response) => {
        console.log('looking at a response',response.data)
        dispatch({type: 'GET_LIST_OF_USERS', payload: response.data});
      })
      .catch((err) => {
        dispatch({type: 'GET_LIST_OF_USERS_REJECTED', payload: err});
      });
  };
};

export const updateVidCode = (vidCode, name) => {
  return function(dispatch) {
    axios.put('/api/users/', {
      vidCode: vidCode,
      name: name
    })
      .then((response) => {
        dispatch({type: 'UPDATE_VIDCODE'});
      })
      .catch((err) => {
        dispatch({type: 'UPDATE_VIDCODE_REJECTED', payload: err});
      });
  };
};
 

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