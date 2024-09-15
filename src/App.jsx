import { Provider } from 'react-redux'
import './App.css'
import { AppRouter } from './routes/routes'
import store from './redux/store/store'


function App() {

  return (
    <>
    <Provider store={store}>
      <AppRouter/>
    </Provider>
    </>
  )
}

export default App
