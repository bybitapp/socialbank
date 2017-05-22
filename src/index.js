import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { compose } from 'recompose'
import thunk from 'redux-thunk'

import reducer from './reducers'
import { getAllProjects } from './actions'

// components
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Help from './components/Help'
import Login from './components/Login'
import Project from './components/Project'
import ProjectMap from './components/ProjectMap'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));

store.dispatch(getAllProjects())

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/help" component={Help} />
        <Route path="/contact" component={Contact} />
        <Route path="/p/:id" component={Project} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>)


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
