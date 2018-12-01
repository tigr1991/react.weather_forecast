import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from 'containers/App'
import './styles/index.styl'

ReactDOM.render(
  <AppContainer>
    <App/>
  </AppContainer>,
  document.getElementById('root'),
)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept()
}
