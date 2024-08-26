import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store/store.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "#0A2FB6",
                colorPrimaryHover: "#0A2FB6",
              },
            },
            token: {
              borderRadius: "4px",
              colorPrimary: "#0A2FB6",
            },
          }}  
        >
          <App />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
