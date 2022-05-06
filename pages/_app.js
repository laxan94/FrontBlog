import { AppContextProvider } from "../components/AppContext"
import "../styles/globals.css"

const App = ({ Component, pageProps, ...otherProps }) => {
  return (
    <div>
      <AppContextProvider>
        <Component {...pageProps} {...otherProps} />
      </AppContextProvider>
    </div>
  )
}

export default App
