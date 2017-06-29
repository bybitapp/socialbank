import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'
import { addOrganization, getOrganization } from '../actions'
import Input from './Input'
import {POSTCODE} from '../constants/Validation'
import { SubmissionError } from 'redux-form'

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
  const { organizations } = state
  return {
    organizations
  }
}

const enhance = compose(
  connect(mapStateToProps),
  reduxForm({
    form: 'organizationForm',
    validate,
    onSubmit: (values, dispatch, ownProps) => {
      return new Promise((resolve, reject) => {
        dispatch(addOrganization(values, (_error) => {
          if(!_error) {
            resolve()
          } else {
            reject(new SubmissionError({_error}))
          }
        }))
      })
    }
  })
)

const updateData = (organization, dispatch) => {
  if (organization && organization.location) {
    const {name, number} = organization
    const {address, city, postcode} = organization.location
    dispatch(change('organizationForm', 'name', name));
    dispatch(change('organizationForm', 'number', number));
    dispatch(change('organizationForm', 'address', address));
    dispatch(change('organizationForm', 'city', city));
    dispatch(change('organizationForm', 'postcode', postcode));
  }
}

class OrganizationForm extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getOrganization())
  }

  componentDidUpdate(prevProps) {
    const { organizations, dispatch } = this.props
    updateData(organizations, dispatch)
  }

  render() {
      const { handleSubmit, organizations, error } = this.props
      const button =  (organizations) ? 'Update Organization' : 'Add Organization'
      return (
        <div>
          {error && <span className="sb-error">{error}</span>}
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

export default enhance(OrganizationForm)
