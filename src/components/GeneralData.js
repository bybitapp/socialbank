import React from 'react'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'
import Input from './Input'
import Auth from '../modules/Auth'

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

const updateData = (account, dispatch) => {
  const { organization } = account
  if (account && organization) {
    dispatch(change('generalInformation', 'email', account.email));
    dispatch(change('generalInformation', 'charityName', account.organization.name));
    dispatch(change('generalInformation', 'charityNumber', account.organization.number));
  }
}

class GeneralInformation extends React.Component {

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
