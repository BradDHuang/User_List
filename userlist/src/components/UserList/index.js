
import React, {Component} from "react";
import axios from "axios";
import ListRow from "../ListRow";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {
        console.log("componentDidMount() is called.");
        axios({method: "get", url: "https://user-list-happitt.c9users.io:8081/api/users"})
            .then(res => {
                console.log(res.data);
                // console.log(typeof(res.data));
                this.setState({ data: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }
    onCreateClick = () => {
        this.props.history.push("/new");
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
                            
                            {this.props.users.map((user) => {
                                return <ListRow key={user.id} {...user} />;
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













