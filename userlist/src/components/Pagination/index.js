
import React, {Component} from "react";

const GoPrev = (props) => {
    return props.page === 1 ? 
        (<li className="page-item disabled">
            <a className="page-link"><i className="fas fa-chevron-left"></i>{" Prev"}</a>
        </li>) : 
        (<li className="page-item" onClick={() => props.changePage(props.page - 1)}>
            <a className="page-link"><i className="fas fa-chevron-left"></i>{" Prev"}</a>
        </li>);
};
const GoNext = (props) => {
    return props.page === props.lastPageNum ? 
        (<li className="page-item disabled">
            <a className="page-link">{"Next "}<i className="fas fa-chevron-right"></i></a>
        </li>) : 
        (<li className="page-item" onClick={() => props.changePage(props.page + 1)}>
            <a className="page-link">{"Next "}<i className="fas fa-chevron-right"></i></a>
        </li>);
};
const CurPage = (props) => {
    return (
        props.cur ?
        (<li className="page-item active" onClick={() => props.changePage(props.pageNum)}>
            <a className="page-link">{props.pageNum}</a>
        </li>) :
        (<li className="page-item" onClick={() => props.changePage(props.pageNum)}>
            <a className="page-link">{props.pageNum}</a>
        </li>)
    );
};

class Pagination extends Component {
    // constructor(props) {
        // super(props);
        // this.state = { numOfPages: 0, allPages: [] };
        // this.state = { numOfPages: 0 };
    // }
    // componentWillReceiveProps(props) {
        // console.log(props.data.numOfUsers, props.data.usersPerPage);
        // let nums = Math.ceil(props.data.numOfUsers / props.data.usersPerPage);
        // console.log(nums);
        // let pages = [];
        // for (let p = 1; p <= nums; p++) { pages.push(p); }
        // this.setState({ numOfPages: nums, allPages: pages });
    // }
    render() {
        let nums = Math.ceil(this.props.data.numOfUsers / this.props.data.usersPerPage);
        let pages = [];
        for (let p = 1; p <= nums; p++) { pages.push(p); }
        return (
            <nav aria-label="...">
                <ul className="pagination">
                <GoPrev 
                    page={this.props.data.curPage}
                    changePage={this.props.changePage}
                />
                {pages.map((p, index) => {
                    return ((index + 1) === this.props.data.curPage) ?
                    (<CurPage 
                        key={index} pageNum={p} cur={true} changePage={this.props.changePage}
                    />) :
                    (<CurPage 
                        key={index} pageNum={p} cur={false} changePage={this.props.changePage}
                    />);
                })}
                <GoNext 
                    page={this.props.data.curPage}
                    // lastPageNum={this.state.numOfPages}
                    lastPageNum={nums}
                    changePage={this.props.changePage}
                />
                </ul>
            </nav>
            
        );
    }
}

export default Pagination;









