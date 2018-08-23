import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, withRouter} from "react-router-dom";

import UserList from "../../components/UserList";
import CreateNewUser from "../../components/NewUser";

const WithRouterUserList = withRouter(UserList);
const WithRouterCreateNewUser = withRouter(CreateNewUser);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" 
            render={() => (<WithRouterUserList />)}
          />
          <Route path="/new"
            render={() => (<WithRouterCreateNewUser />)}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
