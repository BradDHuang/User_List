
import React, {Component} from "react";
import axios from "axios";
import ListRow from "../ListRow";
import {withRouter} from "react-router-dom";

const WithRouterListRow = withRouter(ListRow);

class UserList extends Component {
    // constructor(props) {
        // super(props);
        // this.state = { data: [] };
    // }
    
    onCreateClick = () => {
        this.props.history.push("/new");
    }
    deleteUser = (id) => {
        this.props.deleteUser(id);
        console.log(id);
        axios({ method: "delete", 
                url: `https://user-list-happitt.c9users.io:8081/api/users/${id}`,})
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                <h3>Users:</h3>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>First-Name</th>
                                <th>Last-Name</th>
                                <th>Sex</th>
                                <th>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {this.props.users.map((user, index) => {
                                return <WithRouterListRow key={index} data={user} 
                                    deleteUser={() => this.deleteUser(user.id)}
                                />;
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <button onClick={this.onCreateClick}>Create New User</button>
                </div>
            </div>
        );
    }
}
/*
{this.state.data.map((user, index) => {
                                return <ListRow key={index} {...user} />;
                            })}
*/
export default UserList;













