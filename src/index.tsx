import { createRoot } from 'react-dom/client'
import './init'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

const root = createRoot(document.getElementById('app')!);

import "../src/tailwind.css"

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);