import Peer from 'peerjs';

const initialState = {
  peer: new Peer({key: '6tanpmdb95c7syvi'}),
  connection: null,
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
  }
  return state
}

export default videoReducer;