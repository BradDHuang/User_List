
import React, {Component} from "react";
import {Link} from "react-router-dom";

class ListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <tr>
                <td>
                    <Link to={{pathname: `/${this.props.data.id}`}}>
                        <button type="button">
                        <i className="fas fa-pencil-alt"></i>
                        {" Edit"}
                        </button>
                    </Link>
                </td>
                <td>
                    <button type="button" 
                        onClick={() => this.props.deleteUser(this.props.data.id)}
                    >
                    <i className="far fa-times-circle"></i>
                    {" Delete"}
                    </button>
                </td>
                <td>{this.props.data.first_name}</td>
                <td>{this.props.data.last_name}</td>
                <td>{this.props.data.sex}</td>
                <td>{this.props.data.age}</td>
            </tr>
        );
    }
}

export default ListRow;




