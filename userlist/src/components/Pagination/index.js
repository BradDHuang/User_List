
import React, {Component} from "react";

const GoPrev = (props) => {
    return props.page === 1 ? 
        (<li><a>Prev</a></li>) : 
        (<li onClick={() => props.changePage(props.page - 1)}><a>Prev</a></li>);
};
const GoNext = (props) => {
    return props.page === props.lastPageNum ? 
        (<li><a>Next</a></li>) : 
        (<li onClick={() => props.changePage(props.page + 1)}><a>Next</a></li>);
};
const CurPage = (props) => {
    return (
        props.cur ?
        (<li onClick={() => props.changePage(props.pageNum)}>
            <a>{props.pageNum}</a>
        </li>) :
        (<li onClick={() => props.changePage(props.pageNum)}>
            <a>{props.pageNum}</a>
        </li>)
    );
};

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = { numOfPages: 0, allPages: [] };
    }
    componentWillReceiveProps(props) {
        // console.log(props.data.numOfUsers, props.data.usersPerPage);
        let nums = Math.ceil(props.data.numOfUsers / props.data.usersPerPage);
        // console.log(nums);
        let pages = [];
        for (let p = 1; p <= nums; p++) { pages.push(p); }
        this.setState({ numOfPages: nums, allPages: pages });
    }
    render() {
        return (
            <div>
                {this.props.data.nums}
                <GoPrev 
                    page={this.props.data.curPage}
                    changePage={this.props.changePage}
                />
                {this.state.allPages.map((p, index) => {
                    return (index === this.props.data.curPage) ?
                    (<CurPage 
                        key={index} pageNum={p} cur={true} changePage={this.props.changePage}
                    />) :
                    (<CurPage 
                        key={index} pageNum={p} cur={false} changePage={this.props.changePage}
                    />);
                })}
                <GoNext 
                    page={this.props.data.curPage}
                    lastPageNum={this.state.numOfPages}
                    changePage={this.props.changePage}
                />
            </div>
            
        );
    }
}

export default Pagination;









