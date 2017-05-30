import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Input from './Input'

const enhance = compose(
    connect((state, props) => ({ project: state.projects.find((v) => v.id == props.match.params.id ) }) ),
    reduxForm({
          form: 'updateAddress',
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
            alert('update address')
          }
    })
)

class UpdateAddress extends React.Component {
  render() {
      const { handleSubmit } = this.props;
      return (
          <div>
              <h5>Address</h5>
              <form onSubmit={handleSubmit}>
              <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                      <Field name="address" label="Address" component={Input} />
                      <Field name="city" label="City" component={Input} />
                  </div>
                  <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                      <Field name="postcode" label="Postcode" component={Input} />
                      <div className="sb-details-button">
                          <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="submit">Update Address</button>
                      </div>
                  </div>
              </div>
              </form>
          </div>);
  }

}

export default enhance(UpdateAddress)
