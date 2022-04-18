
import Home from './Home';
import {CookiesProvider} from 'react-cookie';
export default function App() {

  return (
    <>
    <CookiesProvider>
    <Home/>
    </CookiesProvider>
    </>
  )
}
