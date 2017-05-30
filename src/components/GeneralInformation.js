import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Input from './Input'

const enhance = compose(
    connect((state, props) => ({ project: state.projects.find((v) => v.id === props.match.params.id ) }) ),
    reduxForm({
        form: 'generalInformation'
    })
)

class GeneralInformation extends React.Component {
  render() {
      return (
          <div>
              <h5>General Information</h5>
              <div className="mdl-grid">
                  <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                      <Field name="charityName" label="Charity Name" component={Input} disabled={true} />
                      <Field name="charityNumber" label="Charity No" component={Input} disabled={true} />
                  </div>
                  <div className="mdl-cell mdl-cell--6-col mdl-cell--6-col-tablet">
                      <Field name="email" label="Email" component={Input} disabled={true} />
                  </div>
              </div>
          </div>);
  }

}

export default enhance(GeneralInformation)
