
import React, {Component} from "react";

import ListRow from "../ListRow";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {
        console.log("componentDidMount() is called.");
        let sampleData = {
            edit: "Edit",
            delete: "Delete",
            first_name: "Ben",
            last_name: "Pitt",
            sex: "Male",
            age: "24",
        };
        let sampleData2 = {
            edit: "Edit",
            delete: "Delete",
            first_name: "Chris",
            last_name: "Freeman",
            sex: "Male",
            age: "43",
        };
        this.setState({ data: [ ...this.state.data, sampleData, sampleData2 ] });
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
                            {this.state.data.map((user, index) => {
                                return <ListRow key={index} {...user} />;
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

export default UserList;













