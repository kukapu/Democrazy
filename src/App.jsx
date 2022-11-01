import { Provider } from 'react-redux'
import { AppRouter } from './router/AppRouter'
import { store } from './store'

export const App = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}

