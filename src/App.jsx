import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import TaxGuide from './pages/TaxGuide'
import ThankYou from './pages/ThankYou'
import BusinessOpening from './pages/BusinessOpening'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/obrigado" element={<ThankYou />} />
          <Route path="/abertura-de-empresa-nos-eua" element={<BusinessOpening />} />
          <Route path="*" element={<TaxGuide />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
