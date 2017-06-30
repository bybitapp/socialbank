import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { compose } from 'recompose'
import thunk from 'redux-thunk'
import ReduxToastr from 'react-redux-toastr'

import reducer from './reducers'

// components
import Home from './page/Home'
import Terms from './page/Terms'
import Contact from './page/Contact'
import Help from './page/Help'
import Login from './page/Login'
import Logout from './page/Logout'
import Registration from './page/Registration'
import Me from './page/Me'
import History from './page/History'
import Public from './page/Public'
import Projects from './page/Projects'
import Cards from './page/Cards'
import Organization from './page/Organization'
import Banks from './page/Banks'

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
          <Route path='/registration' component={Registration} />
          <Route path='/terms' component={Terms} />
          <Route path='/help' component={Help} />
          <Route path='/contact' component={Contact} />
          <Route path='/me' component={Me} />
          <Route path='/history' component={History} />
          <Route path='/projects' component={Projects} />
          <Route path='/cards' component={Cards} />
          <Route path='/organization' component={Organization} />
          <Route path='/banks' component={Banks} />
          <Route path='/public/o/:id' component={Public} />
          <Route path='/' component={Home} />
        </Switch>
      </Router>
      <ReduxToastr
        timeOut={4000}
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
