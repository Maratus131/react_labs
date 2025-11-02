import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/app'
import { Setting } from './const' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App rentalOffersCount={Setting.rentOffersCount}/>
    {/* <App/> */}
  </StrictMode>,
)
