import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { compose } from 'recompose'
import thunk from 'redux-thunk'
import ReduxToastr from 'react-redux-toastr'

import reducer from './reducers'

// pages
import Home from './page/Home'
import Terms from './page/Terms'
import Privacy from './page/Privacy'
import Contact from './page/Contact'
import Help from './page/Help'
import Login from './page/Login'
import Logout from './page/Logout'
import Register from './page/Register'
import Public from './page/Public'
import NotFound from './page/NotFound'

// admin
import Me from './page/admin/Me'
import History from './page/admin/History'
import Projects from './page/admin/Projects'
import Cards from './page/admin/Cards'
import Organization from './page/admin/Organization'
import Banks from './page/admin/Banks'
import Users from './page/admin/Users'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

const App = () => (
  <Provider store={store}>
    <div>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/register' component={Register} />
          <Route path='/terms' component={Terms} />
          <Route path='/privacy' component={Privacy} />
          <Route path='/help' component={Help} />
          <Route path='/contact' component={Contact} />
          <Route path='/me' component={Me} />
          <Route path='/history' component={History} />
          <Route path='/projects' component={Projects} />
          <Route path='/cards' component={Cards} />
          <Route path='/organization' component={Organization} />
          <Route path='/banks' component={Banks} />
          <Route path='/users' component={Users} />
          <Route path='/public/o/:id' component={Public} />
          <Route path='/' component={Home} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Router>
      <ReduxToastr
        timeOut={1000}
        newestOnTop={false}
        preventDuplicates
        position='top-left'
        transitionIn='fadeIn'
        transitionOut='fadeOut' />
    </div>
  </Provider>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

/* eslint-disable */
$(document).ready(function () {
  loadUI()
})
/* eslint-enable */
