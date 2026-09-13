import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext()

export const PRODUCTS = {
  'guia-impostos': {
    id: 'guia-impostos',
    title: 'Guia Completo de Impostos para Imigrantes nos EUA',
    shortTitle: 'Guia de Impostos',
    author: 'Kelly Moraes',
    authorRole: 'Express Solution Tax & Accounting, Inc.',
    price: 24.99,
    originalPrice: null,
    image: '/image/tax-guide-3d.svg',
    route: '/',
    description: 'Material digital em português • PDF • Acesso após confirmação',
    available: true,
    orderBumpIds: ['abertura-empresa'],
    crossSellIds: ['abertura-empresa'],
  },
  'abertura-empresa': {
    id: 'abertura-empresa',
    title: 'Abertura de Empresa nos EUA',
    shortTitle: 'Abertura de Empresa nos EUA',
    author: 'Kelly Moraes',
    authorRole: 'Express Solution Tax & Accounting, Inc.',
    price: null,
    originalPrice: null,
    image: '/image/book-cover-business.svg',
    route: '/abertura-de-empresa-nos-eua',
    description: 'Guia profissional sobre estruturas, abertura e responsabilidades fiscais',
    available: false,
    orderBumpIds: ['guia-impostos'],
    crossSellIds: ['guia-impostos'],
  },
}

export const BOOK = PRODUCTS['guia-impostos']

export function CartProvider({ children }) {
  const [catalog, setCatalog] = useState(PRODUCTS)
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  useEffect(() => {
    let active = true
    fetch('/api/catalog', { headers: { Accept: 'application/json' } })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('catalog unavailable')))
      .then((payload) => {
        if (!active || !payload?.products) return
        setCatalog((current) => {
          const next = { ...current }
          for (const remote of payload.products) {
            const base = current[remote.id]
            if (!base) continue
            next[remote.id] = {
              ...base,
              ...remote,
              price: typeof remote.price === 'number' ? remote.price : base.price,
              available: remote.configured ? Boolean(remote.available) : base.available,
            }
          }
          return next
        })
      })
      .catch(() => {})
    return () => { active = false }
  }, [])

  const addToCart = useCallback((requestedProductId = BOOK.id) => {
    const productId = typeof requestedProductId === 'string' ? requestedProductId : BOOK.id
    const product = catalog[productId]
    if (!product || product.available === false) return
    setItems((previous) => previous.some((item) => item.id === productId) ? previous : [...previous, { ...product, qty: 1 }])
    setIsOpen(true)
  }, [catalog])

  const buyNow = useCallback((requestedProductId = BOOK.id) => {
    const productId = typeof requestedProductId === 'string' ? requestedProductId : BOOK.id
    const product = catalog[productId]
    if (!product || product.available === false || typeof product.price !== 'number') return
    setItems([{ ...product, qty: 1 }])
    setIsOpen(false)
    setIsCheckoutOpen(true)
  }, [catalog])

  const removeFromCart = useCallback((productId) => {
    setItems((previous) => productId ? previous.filter((item) => item.id !== productId) : [])
  }, [])
  const clearCart = useCallback(() => setItems([]), [])
  const toggleCart = useCallback(() => setIsOpen((previous) => !previous), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const openCheckout = useCallback(() => { setIsOpen(false); setIsCheckoutOpen(true) }, [])
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), [])

  const total = useMemo(() => items.reduce((sum, item) => sum + (Number(item.price) || 0) * item.qty, 0), [items])

  const value = useMemo(() => ({
    catalog, items, isOpen, isCheckoutOpen, total,
    addToCart, buyNow, removeFromCart, clearCart, toggleCart, closeCart, openCheckout, closeCheckout,
  }), [catalog, items, isOpen, isCheckoutOpen, total, addToCart, buyNow, removeFromCart, clearCart, toggleCart, closeCart, openCheckout, closeCheckout])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be inside CartProvider')
  return context
}
