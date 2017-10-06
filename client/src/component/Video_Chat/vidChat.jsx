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
    let { userId, peer } = this.props;
    let secondaryId = "";
    const handleClick = () => {
      this.props.actions.connectUsers(secondaryId);
    }

    peer.on('connection', function (conn) {
      conn.on('data', function(data) {
        console.log('connection made');
        console.log(data)
      })
    })

    return(
      
      <div>   
        <h2>{userId}</h2>
        <input onChange={(e)=>{
          secondaryId = e.target.value;
        }} placeholder="enter id" id="idInput"/> 
        <button onClick= {()=> {
          handleClick();
        }}>submit</button>
      </div>
    )
  }
}

const idStore = (store) => {
  return {
    userId: store.video.peer.hasOwnProperty('id') ? store.video.peer.id : "",
    peer: store.video.peer,
  }
}

const idDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(vidChatActions, dispatch)
  }
}

export default connect(idStore, idDispatch)(VideoChat);