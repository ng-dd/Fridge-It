import Peer from 'peerjs';

const initialState = {
  peer: new Peer({key: '6tanpmdb95c7syvi'}),
  connection: null,
  call: null,
  getUserMedia : navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
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

    case 'VIDEO_CONNECTION': {
      const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
      console.log('this is get usermedia ', getUserMedia)
      getUserMedia({video: true, audio: true})
      // getUserMedia({video: true, audio: true}, function(stream) {
      //   state.call = state.peer.call(action.payload, stream);
      //   state.call.on('stream', function(remoteStream) {
      //     // Show stream in some video/canvas element.
      //   });
      // }, function(err) {
      //   console.log('Failed to get local stream' , err);
      // });
    }
  }
  return state;
}

export default videoReducer;