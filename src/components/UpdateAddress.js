import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'
import Input from './Input'
import {POSTCODE} from '../constants/Validation'
import Auth from '../modules/Auth'

const validate = values => {
    const errors = {}
    if (!values.address) {
        errors.address = 'Required'
    }
    if (!values.postcode) {
        errors.postcode = 'Required'
    } else if (!POSTCODE.test(values.postcode)) {
        errors.postcode = 'Invalid postcode eg. EC1A 2BP'
    }
    if (!values.city) {
        errors.city = 'Required'
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
          form: 'updateAddress',
          validate,
          onSubmit: (values, dispatch, ownProps) => {
          }
    })
)

const updateData = (account, dispatch) => {
  const { organization } = account
  if (account && organization) {
    const {address, city, postcode} = organization.location
    dispatch(change('updateAddress', 'address', address));
    dispatch(change('updateAddress', 'city', city));
    dispatch(change('updateAddress', 'postcode', postcode));
  }
}

class UpdateAddress extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    const user = Auth.getUser()
    if (user) {
      updateData(user.account, dispatch)
    }
  }

  componentDidUpdate(prevProps) {
    const { account, dispatch } = this.props
    if (account !== prevProps.account) {
      updateData(account, dispatch)
    }
  }

  render() {
      const { handleSubmit } = this.props
      return (
          <div>
              <h5>Address</h5>
              <form onSubmit={handleSubmit}>
              <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                      <Field name="address" label="Address" component={Input} disabled={true} />
                      <Field name="city" label="City" component={Input} disabled={true} />
                  </div>
                  <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                      <Field name="postcode" label="Postcode" component={Input} disabled={true} />
                  </div>
              </div>
              </form>
          </div>);
  }

}

export default enhance(UpdateAddress)
