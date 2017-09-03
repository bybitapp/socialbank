import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import { addOrganization, getOrganization } from '../actions'
import { POSTCODE } from '../constants/Validation'
import Input from './Input'
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

function mapStateToProps (state) {
  const { userOrg } = state
  return {
    userOrg
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
          if (!_error) {
            toastr.success('Success!', 'Organization Added.' + (values.id) ? 'Updated.' : 'Added.')
            resolve()
          } else {
            toastr.error('An unexpected error. If the error persists please report to contact@sotec.io')
            reject(_error)
          }
        }))
      })
    }
  })
)

const updateData = (organization, dispatch) => {
  if (organization && organization.location) {
    const {name, number, id} = organization
    const {address, city, postcode} = organization.location
    dispatch(change('organizationForm', 'id', id))
    dispatch(change('organizationForm', 'name', name))
    dispatch(change('organizationForm', 'number', number))
    dispatch(change('organizationForm', 'address', address))
    dispatch(change('organizationForm', 'city', city))
    dispatch(change('organizationForm', 'postcode', postcode))
  }
}

class OrganizationForm extends React.Component {
  componentDidMount () {
    const { userOrg, dispatch } = this.props
    if (!userOrg) {
      dispatch(getOrganization())
    } else {
      updateData(userOrg, dispatch)
    }
  }

  componentDidUpdate (prevProps) {
    const { userOrg, dispatch } = this.props
    if (userOrg !== prevProps.userOrg) {
      updateData(userOrg, dispatch)
    }
  }

  render () {
    const { handleSubmit, userOrg } = this.props
    let disabled = (Auth.getUser().access !== 'owner')
    let button = 'Add Organization'
    if (userOrg) {
      button = 'Update Organization'
      disabled = userOrg.isValid || disabled
    }
    return (
      <div>
        <h5>Organization</h5>
        <form onSubmit={handleSubmit}>
          <div className='mdl-grid'>
            <div className='mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet'>
              <Field name='id' type='hidden' component='input' />
              <Field name='name' label='Name' component={Input} disabled={disabled} />
              <Field name='number' label='Number' component={Input} disabled={disabled} />
              <Field name='address' label='Address' component={Input} disabled={disabled} />
            </div>
            <div className='mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet'>
              <Field name='city' label='City' component={Input} disabled={disabled} />
              <Field name='postcode' label='Postcode' component={Input} disabled={disabled} />
              { disabled
                ? <div className='sb-details-button' />
                : (
                  <div className='sb-details-button'>
                    <button className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored' type='submit'>{button}</button>
                  </div>
                )
              }
            </div>
          </div>
        </form>
      </div>)
  }
}

export default enhance(OrganizationForm)
