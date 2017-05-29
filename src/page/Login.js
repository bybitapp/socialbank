import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field } from 'redux-form'
import axios from 'axios'
import Input from '../components/Input'
import Header from '../components/Header'
import Footer from '../components/Footer'

const enhance = compose(
  reduxForm({
    form: 'login',
    onSubmit: (values, dispatch, ownProps) => {
    //     axios.post('/api/login', values)
    //     .then(() => alert('success'))
    //     .catch((e) => {
    //         console.log(e)
    //     })
        ownProps.history.push('/details') // temporary redirect
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
