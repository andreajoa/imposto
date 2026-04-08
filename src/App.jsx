import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProofBar from './components/ProofBar'
import Problems from './components/Problems'
import Learn from './components/Learn'
import Tools from './components/Tools'
import Author from './components/Author'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartSlideOut from './components/CartSlideOut'
import ThankYou from './pages/ThankYou'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="obrigado" element={<ThankYou />} />
          <Route path="*" element={
            <>
              <Navbar />
              <Hero />
              <ProofBar />
              <Problems />
              <Learn />
              <Tools />
              <Author />
              <CTA />
              <Contact />
              <Footer />
              <CartSlideOut />
            </>
          } />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
