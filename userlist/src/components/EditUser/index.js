
import React, {Component} from "react";
import axios from "axios";
import qs from "qs";

const PWMatch = (props) => {
    return (
        (props.match === "") ?
        null : (props.match === true) ?
        (<i style={{ color: "green" }} className="fas fa-check"></i>) :
        (<i style={{ color: "red" }} className="fas fa-times"></i>)
    );
};

class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            sex: "",
            age: "",
            password: "",
            confirmPW: "",
            pwMatch: "",
        };
    }
    componentDidMount() {
        // console.log(typeof(this.props.match.params.userId));
        // console.log(this.props.users);
        this.props.users.forEach(user => {
            if (user.id === this.props.match.params.userId) {
                // console.log({...user});
                this.setState({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    sex: user.sex,
                    age: user.age,
                });
            }
        });
    }
    handleFirstName = (e) => {
        this.setState({ first_name: e.target.value });
    }
    handleLastName = (e) => {
        this.setState({ last_name: e.target.value });
    }
    handleSex = (e) => {
        this.setState({ sex: e.target.value });
    }
    handleAge = (e) => {
        this.setState({ age: e.target.value });
    }
    handlePassword = (e) => {
        this.setState({ password: e.target.value });
    }
    handleConfirmPW = (e) => {
        this.setState({ confirmPW: e.target.value });
        // check if PWs match:
        if (this.state.password !== e.target.value) {
            this.setState({ pwMatch: false });
        } else {
            this.setState({ pwMatch: true });
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // submit only when PWs match:
        if (this.state.password === this.state.confirmPW) {
        let newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            sex: this.state.sex,
            age: this.state.age,
            password: this.state.password,
            // confirmPW: this.state.confirmPW,
        };
        // console.log(newUser);
        this.props.editUser(this.props.match.params.userId, newUser);
        let first_name = this.state.first_name;
        let last_name = this.state.last_name;
        let sex = this.state.sex;
        let age = this.state.age;
        let password = this.state.password;
        const params = {
            first_name: `${first_name}`,
            last_name: `${last_name}`,
            sex: `${sex}`,
            age: `${age}`,
            password: `${password}`,
        };
        axios({ method: "put", 
                url: "https://user-list-happitt.c9users.io:8081/api/users/" + this.props.match.params.userId,
                data: qs.stringify(params),
        })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        this.setState({
            first_name: "",
            last_name: "",
            sex: "",
            age: "",
            password: "",
            confirmPW: "",
            pwMatch: "",
        });        
        this.props.history.push("/");
        }
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Edit User:</h3>
                <div className="form-group">
                    <label htmlFor="fn">First Name</label>
                        <input type="text" value={this.state.first_name} 
                            onChange={this.handleFirstName}
                            placeholder="First Name"
                            className="form-control" id="fn"
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="ln">Last Name</label>
                        <input type="text" value={this.state.last_name} 
                            onChange={this.handleLastName}
                            placeholder={"Last Name"}
                            className="form-control" id="ln"
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="sex">Sex</label>
                        <select
                            value={this.state.sex} 
                            onChange={this.handleSex}
                            className="form-control" id="sex"
                        >
                            <option value=""></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                        <input type="text" value={this.state.age} 
                            onChange={this.handleAge}
                            placeholder={"Age"}
                            className="form-control" id="age"
                        />
                </div>
                <div className="form-group">
                    <label htmlFor="pw">Password</label>
                        <input type="text" value={this.state.password} 
                            onChange={this.handlePassword}
                            placeholder={"Password"}
                            className="form-control" id="pw"
                        />
                    <PWMatch match={this.state.pwMatch} />
                </div>
                <div className="form-group">
                    <label htmlFor="cp">Confirm Password</label>
                        <input type="text" value={this.state.confirmPW} 
                            onChange={this.handleConfirmPW}
                            placeholder={"Confirm Password"}
                            className="form-control" id="cp"
                        />
                    <PWMatch match={this.state.pwMatch} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.onAddClick}><i className="fas fa-download"></i>{" Save Changes"}</button>
            </form>
        );
    }
}

export default EditUser;













