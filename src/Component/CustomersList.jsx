import React, {Component} from 'react';
import {amountPoints} from '../utils/utils';
import { connect } from 'react-redux';
import '../App.css';

class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const data = Array.from([...new Set(this.props.data.list.map((trans) => trans.id))]).map(Id => {
      const trans = this.props.data.list.filter(trans => trans.id === Id);
      return {
        id: Id,
        name: this.props.data.list.find(trans => trans.id === Id).name,
        rewards:  trans.reduce((sum, current) => {return sum + amountPoints(current.amount);}, 0),
      };
    });
    this.setState({ data });
  }

  rewardsDetails = (id, name) => {
    this.props.history.push({
      pathname: "/" + id,
      search: name,
    });
  };

  tableData = () => this.state.data.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.rewards} points</td>
        <td>
          <button onClick = {() => this.rewardsDetails(item.id, item.name)}>
            Go to Details
          </button>
        </td>
      </tr>
    );
  });

  tableHeader = () => (
    Object.keys(this.state.data[0]).map((key, index) => (<th key={index}>{key.toUpperCase()}</th>))
  )

  render() {
    if (!this.state.data) {
      return null;
    }

    return (
      <div>
        <h1>Reward Points of Each Customer</h1>
        <table>
          <tbody>
            <tr>
              {this.tableHeader()}
            </tr>
            {this.tableData()}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    data: state
  })
}

export default connect(mapStateToProps)(CustomersList);
