import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { compose } from 'recompose'
import thunk from 'redux-thunk'
import ReduxToastr from 'react-redux-toastr'
import ErrorLogger from './components/ErrorLogger'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import AdminRoute from './components/AdminRoute'
import Security from './modules/Security'

import reducer from './reducers'
import ScrollToTop from './components/ScrollToTop'

// pages
import Home from './page/Home'
import Terms from './page/Terms'
import Privacy from './page/Privacy'
import Contact from './page/Contact'
import Faq from './page/Faq'
import Pricing from './page/Pricing'
import About from './page/About'
import Login from './page/Login'
import Logout from './page/Logout'
import Demo from './page/Demo'
import Forgot from './page/Forgot'
import Reset from './page/Reset'
import Public from './page/Public'
import NotFound from './page/NotFound'
import Complaints from './page/Complaints'

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
  applyMiddleware(thunk, loadingBarMiddleware({promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE']}))
))

const App = () => (
  <Provider store={store}>
    <div>
      <Router>
        <ScrollToTop>
          <Switch>
            { /* Admin pages */ }
            <AdminRoute path='/me' component={Me} />
            <AdminRoute path='/history' component={History} />
            <AdminRoute path='/projects' component={Projects} />
            <AdminRoute path='/cards' component={Cards} />
            <AdminRoute path='/organization' component={Organization} />
            <AdminRoute path='/banks' component={Banks} />
            <AdminRoute path='/users' component={Users} />
            { /* Public pages */ }
            <Route path='/public/o/:id' component={Public} />
            <Route path='/login' component={Login} />
            <Route path='/logout' component={Logout} />
            <Route path='/demo' component={Demo} />
            <Route path='/forgot' component={Forgot} />
            <Route path='/reset/:token' component={Reset} />
            <Route path='/contact' component={Contact} />
            <Route path='/terms' component={Terms} />
            <Route path='/privacy' component={Privacy} />
            <Route path='/complaints' component={Complaints} />
            <Route path='/faq' component={Faq} />
            <Route path='/pricing' component={Pricing} />
            <Route path='/about' component={About} />
            <Route path='/' exact component={Home} />
            <Route path='*' component={NotFound} />
          </Switch>
        </ScrollToTop>
      </Router>
      <ReduxToastr
        timeOut={2500}
        newestOnTop={false}
        preventDuplicates
        position='bottom-right'
        transitionIn='fadeIn'
        transitionOut='fadeOut' />
      <ErrorLogger />
    </div>
  </Provider>
)

/* eslint-disable */
Security.init(API_KEY, {
  fonts: [{
    cssSrc: 'https://fonts.googleapis.com/css?family=Roboto:400,300,500'
  }]
})
/* eslint-enable */

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

/* eslint-disable */
$(document).ready(function () {
  loadUI()
})
/* eslint-enable */
