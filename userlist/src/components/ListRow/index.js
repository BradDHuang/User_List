
import React, {Component} from "react";

class ListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <tr>
                <td>{this.props.edit}</td>
                <td>{this.props.delete}</td>
                <td>{this.props.first_name}</td>
                <td>{this.props.last_name}</td>
                <td>{this.props.sex}</td>
                <td>{this.props.age}</td>
            </tr>
        );
    }
}

export default ListRow;




