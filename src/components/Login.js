import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field } from 'redux-form'
import axios from 'axios'
import Input from './Input'
import Header from './Header'
import Footer from './Footer'

const enhance = compose(
  reduxForm({
    form: 'login',
    onSubmit: (values, dispatch, ownProps) => {
    //     axios.post('/api/account', values)
    //     .then(() => alert('success'))
    //     .catch((e) => {
    //         console.log(e)
    //     })
        alert('onLogin')
    }
  })
)

class Login extends React.Component {

  render () {
    const { handleSubmit } = this.props
    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <Header />
            <main className="mdl-layout__content">
                <div className="page-content">
                    <div className="sb-form-content sb-login">
                        <form onSubmit={handleSubmit}>
                            <Field name="email" label="Email" component={Input} />
                            <Field name="password" label="Password" component={Input} type="password"/>
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
  }

}

export default enhance(Login)
