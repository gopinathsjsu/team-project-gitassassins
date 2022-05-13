import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './redux/store'

import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import hotel from './pages/hotel'

import NavigationBar from './components/NavigationBar'

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <Router>
          <div>
            <NavigationBar/>
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/signup" component={signup} />
              <Route exact path="/login" component={login} />
              <Route exact path="/hotel/get/:hotelId" component={hotel} />
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App