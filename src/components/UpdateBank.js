import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Input from './Input'

const enhance = compose(
    connect((state, props) => ({ project: state.projects.find((v) => v.id == props.match.params.id ) }) ),
    reduxForm({
          form: 'updateBank',
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
      const { handleSubmit } = this.props;
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
