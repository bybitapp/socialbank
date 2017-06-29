import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'
import Input from './Input'
import {POSTCODE} from '../constants/Validation'
import Auth from '../modules/Auth'

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length > 255) {
    errors.name = 'Must be 255 characters or less'
  }
  if (!values.number) {
    errors.number = 'Required'
  } else if (isNaN(Number(values.number))) {
    errors.number = 'Must be a number'
  }
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
  const { account, organization } = state
  return {
    account,
    organization
  }
}

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'updateOrganization',
    validate,
    onSubmit: (values, dispatch, ownProps) => {

      alert('organization updated');
    }
  })
)

const updateData = (account, dispatch) => {
  const { organization } = account
  if (account && organization) {
    const {address, city, postcode} = organization.location
    dispatch(change('updateOrganization', 'name', account.organization.name));
    dispatch(change('updateOrganization', 'number', account.organization.number));
    dispatch(change('updateOrganization', 'address', address));
    dispatch(change('updateOrganization', 'city', city));
    dispatch(change('updateOrganization', 'postcode', postcode));
  }
}

class UpdateOrganization extends React.Component {

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
      const { handleSubmit, organization } = this.props
      const button =  (organization) ? 'Update Organization' : 'Add Organization'
      return (
        <div>
            <h5>Organization</h5>
            <form onSubmit={handleSubmit}>
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                  <Field name="name" label="Name" component={Input} />
                  <Field name="number" label="Number" component={Input} />
                  <Field name="address" label="Address" component={Input} />
                </div>
                <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                  <Field name="city" label="City" component={Input} />
                  <Field name="postcode" label="Postcode" component={Input} />
                  <div className="sb-details-button">
                    <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">{button}</button>
                  </div>
                </div>
            </div>
            </form>
        </div>);
  }

}

export default enhance(UpdateOrganization)
