import React, {Component} from 'react';
import '../styles/App.css';
import Home from '../components/Home.js';
import Explore from '../components/Explore.js';
import Header from '../components/Header.js';
import Photo from '../components/Photo.js';
import Tag from '../components/Tag.js';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { BrowserRouter, Switch} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {store} from '../store/store.js';

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <BrowserRouter>
          <div className="App">
            <Header></Header>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/explore" component={Explore}/>
              <Route exact path="/photos/tags/:id" component={Tag}/>
              <Route path="/photos/:id" component={Photo}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
