import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import UserList from "../../components/UserList";
import CreateNewUser from "../../components/NewUser";
import * as actions from "../../actions";
import axios from "axios";

const WithRouterUserList = withRouter(UserList);
const WithRouterCreateNewUser = withRouter(CreateNewUser);

class App extends Component {
    componentDidMount() {
        axios({method: "get", url: "https://user-list-happitt.c9users.io:8081/api/users"})
            .then(res => {
                console.log(res.data);
                res.data.forEach(user => {
                    this.props.addUser(user);
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
  render() {
    // console.log(this.props.users);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" 
            render={() => (<WithRouterUserList 
              users={this.props.users}
            />)}
          />
          <Route path="/new"
            render={() => (<WithRouterCreateNewUser 
              addUser={this.props.addUser}
            />)}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: user => {
      // dispatch({ type: "ADD_USER", user: user });
      dispatch(actions.addUser(user));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

