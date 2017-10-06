import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vidChatActions from '../../actions/vidChatActions'

class VideoChat extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.idGen();

  }
  render() {
    let { userId, peer, getUserMedia } = this.props;
    console.log('this is getusermedia in the fcomponet ', getUserMedia)
    let secondaryId = "";
    const handleClick = () => {
      this.props.actions.connectUsers(secondaryId);
    }

    const handleVideoClick = () => {
      this.props.actions.connectVideo(secondaryId);
    }

    peer.on('connection', function (conn) {
      conn.on('data', function(data) {
        console.log('connection made');
        console.log(data)
      })
    })

    peer.on('call', function(call) {
      getUserMedia({video: true, audio: true}, function(stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', function(remoteStream) {
          // Show stream in some video/canvas element.
        });
      }, function(err) {
        console.log('Failed to get local stream' ,err);
      });
    });

    return(
      
      <div>   
        <h2>{userId}</h2>
        <input onChange={(e)=>{
          secondaryId = e.target.value;
        }} placeholder="enter id" id="idInput"/> 
        <button onClick= {()=> {
          handleClick();
        }}>submit</button>
        <button onClick={() => {
          handleVideoClick();
        }}>Video Connect</button>
      </div>
    )
  }
}

const idStore = (store) => {
  return {
    userId: store.video.peer.hasOwnProperty('id') ? store.video.peer.id : "",
    peer: store.video.peer,
    getUserMedia: store.video.getUserMedia,
  }
}

const idDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(vidChatActions, dispatch)
  }
}

export default connect(idStore, idDispatch)(VideoChat);