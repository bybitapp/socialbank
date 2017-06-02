import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'
import Input from './Input'

function mapStateToProps(state) {
  const { account } = state
  return {
    account
  }
}

const enhance = compose(
    connect(mapStateToProps),
    reduxForm({
        form: 'generalInformation'
    })
)

class GeneralInformation extends React.Component {
  render() {
    const { account, dispatch } = this.props

    dispatch(change('generalInformation', 'email', account.email));

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
