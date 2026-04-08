import { createContext, useContext, useState, useCallback } from 'react'

const CartContext = createContext()

const BOOK = {
  id: 'guia-impostos',
  title: 'Guia Completo de Impostos para Imigrantes nos EUA',
  author: 'Kelly Marques',
  price: 47.00,
  image: '/image/book-cover-cart.svg',
  description: 'Material digital completo • PDF + Entrega imediata • Sempre atualizado'
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const addToCart = useCallback(() => {
    setItems(prev => {
      if (prev.find(i => i.id === BOOK.id)) return prev
      return [...prev, { ...BOOK, qty: 1 }]
    })
    setIsOpen(true)
  }, [])

  const removeFromCart = useCallback(() => {
    setItems([])
  }, [])

  const toggleCart = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const closeCart = useCallback(() => {
    setIsOpen(false)
  }, [])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, isOpen, total,
      addToCart, removeFromCart, toggleCart, closeCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}

export { BOOK }
