import React from 'react';
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { compose } from 'recompose'
import thunk from 'redux-thunk'

import reducer from './reducers'
//import { getProjects } from './actions'

// components
import Home from './page/Home'
import About from './page/About'
import Contact from './page/Contact'
import Help from './page/Help'
import Login from './page/Login'
import Registration from './page/Registration'
import Details from './page/Details'
import History from './page/History'
import Public from './page/Public'
import Projects from './page/Projects'
import Cards from './page/Cards'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));

//store.dispatch(getAllProjects())

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/about" component={About} />
        <Route path="/help" component={Help} />
        <Route path="/contact" component={Contact} />
        <Route path="/details" component={Details} />
        <Route path="/history" component={History} />
        <Route path="/projects" component={Projects} />
        <Route path="/cards" component={Cards} />
        <Route path="/public/o/:id" component={Public} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </Provider>)


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
