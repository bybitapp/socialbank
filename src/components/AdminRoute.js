import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Auth from '../modules/Auth'

export default ({ component: Component, ...rest }) => {
  console.log(Auth.isUserAuthenticated())
  return (
    <Route {...rest} render={props => (
      Auth.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
    )} />
  )
}
