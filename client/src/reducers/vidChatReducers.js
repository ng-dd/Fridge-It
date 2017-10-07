import Peer from 'peerjs';

const initialState = {
  peer: new Peer({key: '6tanpmdb95c7syvi'}),
  connection: null,
  call: null,
  vidCodeUpdated: false,
  usersList: [],
}

const videoReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'RECIEVE_ID': {
      console.log('recieving ID')
      // return Object.assign({}, state, {peer: new Peer({key: '6tanpmdb95c7syvi'})})
    }

    case 'MAKE_CONNECTION': {
      console.log('checking peer in make connection: ', state.peer)
      state.connection = state.peer.connect(action.payload);
      state.connection.on('open', ()=>{
        // console.log('Hello, my Peer id is: ' + secondaryId)
        state.connection.send('messages from '+ state.peer.id)
      })
    }

    case 'GET_LIST_OF_USERS': {
        state.usersList = action.payload    
    }

    case 'UPDATE_VIDCODE': {
      state.vidCodeUpdated = true;
      console.log('vidcode updated: ' + state.vidCodeUpdated);
    }
  }
  return state;
}

export default videoReducer;