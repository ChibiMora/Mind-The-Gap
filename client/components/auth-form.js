import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, createUser} from '../store'
import Button from '@material-ui/core/Button'

/**
 * COMPONENT
 */
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props


  return (
    <div>
      <form onSubmit={handleSubmit} name={name} color='primary'>
        {name === 'signup' && (
          <div>
            <div color='primary'>
              <label htmlFor="firstName" color='primary'>
                <small >First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small color='#0d47a1'>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="email">
            <small color='#0d47a1'>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small color='#0d47a1'>Password</small>
          </label>
          <input name="password" type="password" color='#0d47a1'/>
        </div>
        <div>
          <Button variant="contained" color="primary" >{displayName}</Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      // if (evt.target.firstName.value !== undefined) {
      if (evt.target.name === 'signup') {
        const firstName = evt.target.firstName.value
        const lastName = evt.target.lastName.value
        const formName = evt.target.name
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(createUser(email, password, formName, firstName, lastName))
        ownProps.history.push('/home')
      } else {
        const formName = evt.target.name
        const email = evt.target.email.value
        const password = evt.target.password.value
        dispatch(auth(email, password, formName))
        ownProps.history.push('/home')
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
