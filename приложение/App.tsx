import { ThemeProvider } from '@rneui/themed'
import Navigation from './src/navigation'
import theme from './src/theme'
import { store } from './src/store'
import { Provider } from 'react-redux'

const firebaseConfig = {
  apiKey: "AIzaSyAU9KDb4s9uAwc2Qgv_H6KAWNRIW8vXzGI",
  authDomain: "diary-c87a3.firebaseapp.com",
  projectId: "diary-c87a3",
  storageBucket: "diary-c87a3.appspot.com",
  messagingSenderId: "628186703305",
  appId: "1:628186703305:web:0aede03a87db34f2983418",
  measurementId: "G-YRHKLY1GRZ"
};

console.log('firebaseConfig: ', firebaseConfig);

const App = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Navigation />
            </ThemeProvider>
        </Provider>
    )
}

export default App
