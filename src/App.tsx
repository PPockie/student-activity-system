import { ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import AuthProvider from './hook/auth-provider'
import { antdTheme } from './styles/antd-theme'
import router from './route'

function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ConfigProvider>
  )
}

export default App
