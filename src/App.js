import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import CustomersList from './Component/CustomersList';
import CustomerRewards from './Component/CustomerRewards';
import { connect } from 'react-redux';
import { fetchData } from './store/action';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchData());
  }

  render() {
    if(!this.props.data) {
      return null;
    }

    return (
      <Switch>
        <Route exact path="/:Id" component={CustomerRewards} />
        <Route exact path="/" component={CustomersList} />
        <Redirect to="/" />
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return ({
    data: state
  })
}

export default connect(mapStateToProps)(App);
