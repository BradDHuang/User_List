
import React, {Component} from "react";

class CreateNewUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            first_name: "",
            last_name: "",
            sex: "",
            // age: "",
            age: 0,
            password: "",
            confirmPW: "",
        };
    }
    onAddClick = () => {
        this.props.history.push("/");
    }
    handleFirstName = (e) => {
        // console.log(e.target);
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
    }
    handleSubmit = (e) => {
        e.preventDefault();
    }
    render() {
        return (
            <div>
                <h3>Create New User:</h3>
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
                        <input type="text" value={this.state.sex} 
                            onChange={this.handleSex}
                            placeholder={"Sex"}
                        />
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
                    </div>
                    <br />                
                    <div style={{ lineHeight: "1.2" }}>
                    <label>Confirm Password: 
                        <input type="text" value={this.state.confirmPW} 
                            onChange={this.handleConfirmPW}
                            placeholder={"Confirm Password"}
                        />
                    </label>
                    </div>
                </form>
                <br />
                <hr />
                <br />
                <button onClick={this.onAddClick}>+ Add User</button>
            </div>
        );
    }
}

export default CreateNewUser;




