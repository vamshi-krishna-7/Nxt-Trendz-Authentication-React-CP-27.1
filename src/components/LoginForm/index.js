// Write your JS code here

import './index.css'

import {Component} from 'react'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onchangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessSubmit = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const error = data.error_msg

    if (response.ok === true) {
      this.onSuccessSubmit()
    } else {
      this.setState({
        showError: true,
        errorMsg: error,
      })
    }
  }

  render() {
    const {username, password, showError, errorMsg} = this.state

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          alt="website logo"
          className="login-website-logo-mobile-img"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
          className="login-img"
        />
        <form className="form-container" onSubmit={this.onSubmitLoginForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="login-website-logo-desktop-img"
          />
          <div className="input-container">
            <label htmlFor="user" className="input-label">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              className="username-input-field"
              id="user"
              value={username}
              onChange={this.onchangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <input
              type="password"
              className="password-input-field"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.onchangePassword}
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
