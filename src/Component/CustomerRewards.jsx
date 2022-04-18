import React, {Component} from 'react';
import { connect } from 'react-redux';
import {amountPoints} from '../utils/utils';
import '../App.css';

class CustomerRewards extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.history.push('/');
  }

  componentDidMount() {
    this.getCustomerInformation(this.props.match.params.Id);
  }

  tableHeader = () => (
    Object.keys(this.state.data[0]).map((key, index) => (<th key={index}>{key.toUpperCase()}</th>))
  )

  getCustomerInformation = (Id) => {
    const data = this.props.data.list.filter(trans => trans.id === parseInt(Id));
    const customerData = Array.from([
      ...new Set(data.map((trans) => {
          const date = new Date(trans.date);
          return date.toLocaleString("default", { month: "long" })
        })
      ),
    ]).map( month => {
      const transData = data.filter((trans) => {
        const date = new Date(trans.date)
        return (date.toLocaleString("default", {month: "long"}) === month);
      });

      return {
        month: month,
        spent: transData.reduce((sum, cur) => (sum + cur.amount), 0),
        'Total Points': transData.reduce((sum, cur) => (sum + amountPoints(cur.amount)), 0),
      };
    });

    this.setState({ data: customerData });
  };

  tableData = () => {
    return this.state.data.map(item => {
      const { month, spent, 'Total Points': points } = item;
      return (
        <tr key={month}>
          <td>{month}</td>
          <td>${spent}</td>
          <td>{points} points</td>
          <td></td>
        </tr>
      );
    });
  };

  render() {
    if(!this.state.data) {
      return null;
    }

    return (
      <div>
        <h1>Reward Points of {this.props.location.search.slice(1)}</h1>
        <table>
          <tbody>
            <tr>
              {this.tableHeader()}
            </tr>
            {this.tableData()}
          </tbody>
        </table>
        <button onClick={this.onClick}>
          Back to Main Page
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return ({
    data: state
  })
}

export default connect(mapStateToProps)(CustomerRewards);