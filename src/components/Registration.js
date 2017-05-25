import React from 'react'
import { compose } from 'recompose'
import { reduxForm, Field } from 'redux-form'
import axios from 'axios'
import Input from './Input'
import TextField from './TextField'
import Header from './Header'
import Footer from './Footer'

const enhance = compose(
  reduxForm({
    form: 'register',
    onSubmit: (values, dispatch, ownProps) => {
        axios.post('/api/account', values)
        .then(() => alert('success'))
        .catch((e) => {
            console.log(e)
        })
    }
  })
)

class Registration extends React.Component {

    render () {
        const { handleSubmit } = this.props
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <Header />
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <div className="sb-form-content">
                            <form onSubmit={handleSubmit}>
                            <div className="mdl-grid">
                                <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                                    <Field name="firstName" label="First name" component={Input} />
                                    <Field name="LastName" label="Last name" component={Input} />
                                    <Field name="email" label="Email" component={Input} />
                                    <Field name="password" label="Password" component={Input} type="password" />
                                    <Field name="charityName" label="Charity Name" component={Input} />
                                    <Field name="address" label="Address" component={Input} />
                                    <Field name="postcode" label="Postcode" component={Input} />
                                    <Field name="city" label="City" component={Input} />
                                </div>
                                <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                                    <Field name="accountOwner" label="Account Owner" component={Input} />
                                    <Field name="accountNumber" label="Account Number" component={Input} />
                                    <Field name="sortCode" label="Sort Code" component={Input} />
                                    <Field name="bankName" label="Bank Name" component={Input} />
                                    <Field name="ibanCode" label="Iban Code" component={Input} />
                                    <Field name="swiftCode" label="Swift Code" component={Input} />
                                    <Field name="country" label="Country" component={Input} />
                                </div>
                            </div>
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">Create Account</button>
                            </form>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

}

export default enhance(Registration)
