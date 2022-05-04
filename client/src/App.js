import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './redux/store'

import home from './pages/home'

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
            </Switch>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App