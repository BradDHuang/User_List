import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import UserList from "../../components/UserList";
import CreateNewUser from "../../components/NewUser";
import EditUser from "../../components/EditUser";
import * as actions from "../../actions";
import axios from "axios";

const WithRouterUserList = withRouter(UserList);
const WithRouterCreateNewUser = withRouter(CreateNewUser);
const WithRouterEditUser = withRouter(EditUser);

class App extends Component {
    componentDidMount() {
        axios({method: "get", url: "https://user-list-happitt.c9users.io:8081/api/users"})
            .then(res => {
                console.log(res.data);
                // console.log(res.data[0]._id);
                res.data.forEach(user => {
                    this.props.addUser(user);
                });
            })
            .catch(err => {
                console.log(err);
                alert("503 (Server Service Unavailable)");
            });
    }
  render() {
    // console.log(this.props.users);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" 
            render={({match}) => (<WithRouterUserList 
              users={this.props.users}
              deleteUser={this.props.deleteUser}
              match={match}
            />)}
          />
          <Route path="/new"
            render={() => (<WithRouterCreateNewUser 
              addUser={this.props.addUser}
            />)}
          />
          <Route path="/:userId"
            render={({match}) => (<WithRouterEditUser 
              match={match}
              users={this.props.users}
              editUser={this.props.editUser}
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
    editUser: (id, user) => {
      dispatch(actions.editUser(id, user));
    },
    deleteUser: (id) => {
      dispatch(actions.deleteUser(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

