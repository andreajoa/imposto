import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import TaxGuide from './pages/TaxGuide'
import ThankYou from './pages/ThankYou'
import BusinessOpening from './pages/BusinessOpening'
import BusinessOpeningCommerce from './components/BusinessOpeningCommerce'

function BusinessOpeningRoute() {
  return (
    <>
      <BusinessOpening />
      <BusinessOpeningCommerce />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/obrigado" element={<ThankYou />} />
          <Route path="/abertura-de-empresa-nos-eua" element={<BusinessOpeningRoute />} />
          <Route path="*" element={<TaxGuide />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
