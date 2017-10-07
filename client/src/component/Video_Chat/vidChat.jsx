import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vidChatActions from '../../actions/vidChatActions'

class VideoChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: "",
      connectedTo: null
    }
  }

  componentDidMount() {
    this.video = document.getElementsByTagName('video');
    console.log('video being established as ', this.video[0]);
    this.props.actions.getUsers()
  }
  render() {
    // const vid = document.getElementById('video');
    // const canvas = videoCanvas
    let { userId, peer, usersList, user } = this.props;
    const getUserMedia = navigator.getUserMedia.bind(navigator) || navigator.webkitGetUserMedia.bind(navigator) || navigator.mozGetUserMedia.bind(navigator);
    console.log('this is getusermedia in the fcomponet ', getUserMedia)
    let secondaryId = "";
    this.props.actions.updateVidCode(userId, user);
    const handleClick = () => {
      this.props.actions.connectUsers(secondaryId);
    }


    const handleVideoClick = () => {
      // this.props.actions.connectVideo(secondaryId);
      console.log('attempting to send video call');
      getUserMedia({ video: true, audio: true }, (stream) => {
        var call = peer.call(secondaryId, stream);
        call.on('stream', (remoteStream) => {
          console.log('made it past the dragon')
          // Show stream in some video/canvas element.
          console.log('remote stream ' + remoteStream)
          this.video[0].src = URL.createObjectURL(remoteStream);
          this.video[0].play();
        });
      }, function (err) {
        console.log('Failed to get local stream', err);
      });

    }

    const connectTo = (command, userVC = this.connectedTo) => {
      // this.props.actions.connectVideo(secondaryId);
      console.log('attempting to send video call');
      getUserMedia({ video: true, audio: true }, (stream) => {
        var call = peer.call(userVC, stream);
        if (command === 'open'){
          this.connectedTo = userVC; 
          call.on('stream', (remoteStream) => {
            console.log('made it past the dragon')
            // Show stream in some video/canvas element.
            console.log('remote stream ' + remoteStream)
            this.video[0].src = URL.createObjectURL(remoteStream);
            this.video[0].play();
          });
        } else if (command === 'close'){
          this.video[0].pause();
          this.video[0].src="";
          // location.reload
        }
      }, function (err) {
        console.log('Failed to get local stream', err);
      });

    }

    peer.on('connection', function (conn) {
      conn.on('data', function (data) {
        console.log('connection made');
        console.log(data)
      })
    })

    peer.on('call', (call) => {
      navigator.getUserMedia({ video: true, audio: true }, (stream) => {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', (remoteStream) => {
          console.log('inside stream response')
          console.log('looking for this video', this.video);
          this.video[0].src = URL.createObjectURL(remoteStream);
          // console.log('this is the vid', vid);
          this.video[0].play();
          // Show stream in some video/canvas element.
        });
      }, function (err) {
        console.log('Failed to get local stream', err);
      });
    });

    const listUsers = usersList.map((user) => {
      return <li><a onClick={() => { 
        console.log('connecting to: ', user.name, ' with a vidCode of: ', user.vidCode, ', while mine is: ', userId)
        connectTo('open', user.vidCode, ) }}> {user.name} </a></li>
    })

    return (

      <div>
        <video id='videoStream' src=""> </video>
        <h2>{userId}</h2>
        <input onChange={(e) => {
          secondaryId = e.target.value;
        }} placeholder="enter id" id="idInput" />
        <button onClick={() => {
          handleClick();
        }}>submit</button>
        <button onClick={() => {
          handleVideoClick();
        }}>Video Connect</button>
        <button onClick={()=>{
          connectTo('close');
          
        }}>End call</button>
        <li> {listUsers}
        </li>
      </div>
    )
  }
}

const idStore = (store) => {
  return {
    userId: store.video.peer.hasOwnProperty('id') ? store.video.peer.id : "",
    peer: store.video.peer,
    usersList: store.video.usersList,
    user: store.fridge.fridge.name
  }
}

const idDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(vidChatActions, dispatch)
  }
}

export default connect(idStore, idDispatch)(VideoChat);