import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Grid, Button } from 'semantic-ui-react';

import Messages from '../Message/messagesListView.jsx';
import Search from '../Search/searchListView.jsx';
import Fridge from '../Fridge/fridgeView.jsx';
import * as fridgeActions from '../../actions/fridgeActions.js';

class Home extends Component {
  constructor (props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.getFridge(localStorage.getItem('name'));
  };

  render() {
    let { actions, fetched, posted } = this.props;

    if (fetched || posted) {
      return (
      <Grid divided="vertically">
        <Grid.Row columns={2} centered>
          <Grid.Column width={11}> 
            <Grid.Row>
              <Fridge />
            </Grid.Row>
            <br/>
            <Grid.Row textAlign={'center'}>
              <Search />
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={5}>
            <Messages />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      )
    } else {
      let username = localStorage.getItem('name');

      return (
        <div>
        <Grid centered columns={2}>
          <Grid.Column width={4}>
            <Button content={'Create a Fridge'} color={'blue'}
              onClick={(e) => {
                e.preventDefault();
                
                const userArray = [];
                userArray.push(username);
                
                const fridgeObj = {
                  users: userArray,
                  name: username,
                }
                actions.addFridge(fridgeObj);
              }}
            />
          </Grid.Column>
          <Grid.Column width={6}>
            <Form>
              <Form.Group>
                <Form.Input id="joinFridgeInput" placeholder="Enter Fridge Owner's Name" />
                <Form.Button content={'Join a Fridge'} color={'blue'}
                  onClick={(e) => {
                    e.preventDefault();
                    actions.getFridge(document.getElementById('joinFridgeInput').value);
                  }}
                />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid>
        </div>
      )
    }
  }
};

const homeState = (store) => {
  return {
    fetched: store.fridge.fetched,
    posted: store.fridge.posted,
  }
};

const homeDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(fridgeActions, dispatch),
  }
};

export default connect(homeState, homeDispatch)(Home);
