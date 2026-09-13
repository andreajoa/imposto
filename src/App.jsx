import Seo from './seo/Seo'
import { BostonResources, About, NotFound } from './pages/Resources'
import { BrowserRouter, StaticRouter, Routes, Route } from 'react-router-dom'
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

export default function App({ url }) {
  const Router = url ? StaticRouter : BrowserRouter
  return (
    <Router location={url}>
      <CartProvider>
        <Seo />
        <Routes>
          <Route path="/obrigado" element={<ThankYou />} />
          <Route path="/abertura-de-empresa-nos-eua" element={<BusinessOpeningRoute />} />
          <Route path="/" element={<TaxGuide />} />
          <Route path="/impostos-brasileiros-boston" element={<BostonResources />} />
          <Route path="/en/boston-tax-guide" element={<BostonResources />} />
          <Route path="/sobre" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </CartProvider>
    </Router>
  )
}
