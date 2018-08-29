
import React, {Component} from "react";
import axios from "axios";
import ListRow from "../ListRow";
import {withRouter} from "react-router-dom";
import Pagination from "../Pagination";

const WithRouterListRow = withRouter(ListRow);

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            search: "",
            descWithFN: false,
            descWithLN: false,
            descWithSex: false,
            descWithAge: false,
            curPage: 1,
            usersPerPage: 5,
        };
    }
    
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
    handleSearch = (e) => {
        this.setState({ search: e.target.value });
    }
    matchSearch = (user) => {
        return (
            user.first_name.search(new RegExp(this.state.search)) !== -1 ||
            user.last_name.search(new RegExp(this.state.search)) !== -1 ||
            user.sex.search(new RegExp(this.state.search)) !== -1 ||
            user.age.search(new RegExp(this.state.search)) !== -1
        );
    }
    sortWithFN = () => {
        console.log("get all first_names for sorting");
        if (!this.state.descWithFN) {
            this.props.users.sort((a, b) => a.first_name.localeCompare(b.first_name));
        } else {
            this.props.users.sort((a, b) => b.first_name.localeCompare(a.first_name));
        }
        console.log(this.props.users);
        let sortedUsers = this.props.users;
        // console.log(sortedUsers);
        this.setState({ users: sortedUsers, descWithFN: !this.state.descWithFN });
    }
    sortWithLN = () => {
        console.log("get all last_names for sorting");
        if (!this.state.descWithLN) {
            this.props.users.sort((a, b) => a.last_name.localeCompare(b.last_name));
        } else {
            this.props.users.sort((a, b) => b.last_name.localeCompare(a.last_name));
        }
        this.setState({ users: this.props.users, descWithLN: !this.state.descWithLN });
    }
    sortWithSex = () => {
        console.log("get all sex for sorting");
        if (!this.state.descWithSex) {
            this.props.users.sort((a, b) => a.sex.localeCompare(b.sex));
        } else {
            this.props.users.sort((a, b) => b.sex.localeCompare(a.sex));
        }
        this.setState({ users: this.props.users, descWithSex: !this.state.descWithSex });
    }
    sortWithAge = () => {
        console.log("get all ages for sorting");
        if (!this.state.descWithAge) {
            this.props.users.sort((a, b) => parseInt(a.age, 10) - parseInt(b.age, 10));
        } else {
            this.props.users.sort((a, b) => parseInt(b.age, 10) - parseInt(a.age, 10));
        }
        this.setState({ users: this.props.users, descWithAge: !this.state.descWithAge });
    }
    handleUsersPerPage = (e) => {
        this.setState({ usersPerPage: e.target.value });
    }
    handlePageChange = (page) => {
        this.setState({ curPage: page });
    }
    render() {
        return (
            <div style={{lineHeight: "1", margin: "15px 25px"}}>
                <h3>Users</h3>
                <hr />
                <div>
                    <label htmlFor="search">Search:</label>
                    <input type="text" value={this.state.search} 
                        onChange={this.handleSearch}
                        id="search"
                    />
                </div>
                <hr />
                <div>
                    <label htmlFor="upp">Users / Page: 5</label>
                    
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                                <th scope="col" onClick={this.sortWithFN} style={{color: "#00BFFF"}}>First Name</th>
                                <th scope="col" onClick={this.sortWithLN} style={{color: "#00BFFF"}}>Last Name</th>
                                <th scope="col" onClick={this.sortWithSex} style={{color: "#00BFFF"}}>Sex</th>
                                <th scope="col" onClick={this.sortWithAge} style={{color: "#00BFFF"}}>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.users.map((user, index) => {
                                if (this.state.search === "") {
                                    const {curPage, usersPerPage} = this.state;
                                    if (index >= (curPage - 1) * usersPerPage && index < (curPage) * usersPerPage) {
                                        return <WithRouterListRow key={index} data={user} 
                                            deleteUser={() => this.deleteUser(user.id)}
                                        />;
                                    } else {
                                        return null;
                                    }
                                } else {
                                    return (this.matchSearch(user)) ? 
                                    <WithRouterListRow key={index} data={user} 
                                        deleteUser={() => this.deleteUser(user.id)}
                                    /> : null;
                                }
                            })}
                        </tbody>
                    </table>
                    <Pagination
                        changePage={this.handlePageChange}
                        data={{
                            numOfUsers: this.props.users.length,
                            curPage: this.state.curPage,
                            usersPerPage: this.state.usersPerPage,
                        }}
                    />
                </div>
                <div>
                    <button className="btn btn-success" onClick={this.onCreateClick}
                        // style={{backgroundColor: "green"}}
                    >
                        <i className="fas fa-user-plus"></i>{" Create New User"}
                    </button>
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













