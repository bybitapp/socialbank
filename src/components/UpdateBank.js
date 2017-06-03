import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'
import Input from './Input'
import {IBAN_CODE, SWIFT_CODE} from '../constants/Validation'

const validate = values => {
    const errors = {}
    if (!values.accountOwner) {
        errors.accountOwner = 'Required'
    }
    if (!values.bankName) {
        errors.bankName = 'Required'
    }
    if (!values.ibanCode) {
        errors.ibanCode = 'Required'
    } else if (!IBAN_CODE.test(values.ibanCode)) {
        errors.ibanCode = 'Invalid iban code eg. GB15MIDL40051512345678'
    }
    if (!values.swiftCode) {
        errors.swiftCode = 'Required'
    } else if (!SWIFT_CODE.test(values.swiftCode)) {
        errors.swiftCode = 'Invalid swift code eg. MIDLGB22'
    }
    return errors
}

function mapStateToProps(state) {
  const { account } = state
  return {
    account
  }
}

const enhance = compose(
    connect(mapStateToProps),
    reduxForm({
          form: 'updateBank',
          validate,
          onSubmit: (values, dispatch, ownProps) => {
            //   return new Promise((resolve, reject) => {
            //       axios.post('/api/account', values)
            //           .then(() => {
            //               alert('success')
            //               resolve()
            //           }).catch((e) => {
            //               console.log(e)
            //               reject(new SubmissionError({
            //                   _error: 'You account can not be created, please contact with us!'
            //               }))
            //           })
            //   })
            alert('update bank')
          }
    })
)

class UpdateBank extends React.Component {
  render() {
      const { handleSubmit, account, dispatch } = this.props;

      if (account.organization) {
        dispatch(change('updateBank', 'accountOwner', account.organization.owner));
        dispatch(change('updateBank', 'bankName', account.organization.bankName));
        dispatch(change('updateBank', 'ibanCode', account.organization.ibanCode));
        dispatch(change('updateBank', 'swiftCode', account.organization.swiftCode));
      }

      return (
          <div>
              <h5>External Account</h5>
              <form onSubmit={handleSubmit}>
              <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                      <Field name="accountOwner" label="Account Owner" component={Input} />
                      <Field name="bankName" label="Bank Name" component={Input} />
                  </div>
                  <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                      <Field name="ibanCode" label="Iban Code" component={Input} />
                      <Field name="swiftCode" label="Swift Code" component={Input} />
                  </div>
              </div>
              <div className="sb-details-button-bottom">
                  <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">Update Bank</button>
              </div>
              </form>
          </div>);
  }

}

export default enhance(UpdateBank)
