
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
            <div>
                <h3>Edit User:</h3>
                <form onSubmit={this.handleSubmit}>
                    <div style={{ lineHeight: "1.2" }}>
                    <label>First-Name: 
                        <input type="text" value={this.state.first_name} 
                            onChange={this.handleFirstName}
                            placeholder={"First Name"}
                        />
                    </label>
                    </div>
                    <br />
                    <div style={{ lineHeight: "1.2" }}>
                    <label>Last-Name: 
                        <input type="text" value={this.state.last_name} 
                            onChange={this.handleLastName}
                            placeholder={"Last Name"}
                        />
                    </label>
                    </div>
                    <br />                
                    <div style={{ lineHeight: "1.2" }}>
                    <label>Sex: 
                        <select
                            value={this.state.sex} 
                            onChange={this.handleSex}
                        >
                            <option value=""></option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                    </div>
                    <br />                
                    <div style={{ lineHeight: "1.2" }}>
                    <label>Age: 
                        <input type="text" value={this.state.age} 
                            onChange={this.handleAge}
                            placeholder={"Age"}
                        />
                    </label>
                    </div>
                    <br />                
                    <div style={{ lineHeight: "1.2" }}>
                    <label>Password: 
                        <input type="text" value={this.state.password} 
                            onChange={this.handlePassword}
                            placeholder={"Password"}
                        />
                    </label>
                    <PWMatch match={this.state.pwMatch} />
                    </div>
                    <br />                
                    <div style={{ lineHeight: "1.2" }}>
                    <label>Confirm Password: 
                        <input type="text" value={this.state.confirmPW} 
                            onChange={this.handleConfirmPW}
                            placeholder={"Confirm Password"}
                        />
                    </label>
                    <PWMatch match={this.state.pwMatch} />
                    </div>
                    <br />
                    <hr />
                    <br />
                    <button type="submit" onClick={this.onAddClick}>Save Changes</button>
                </form>
            </div>
        );
    }
}

export default EditUser;













