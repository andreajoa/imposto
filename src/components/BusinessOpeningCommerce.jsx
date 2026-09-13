import { useCart } from '../context/CartContext'
import CartSlideOut from './CartSlideOut'

export default function BusinessOpeningCommerce() {
  const { catalog, addToCart } = useCart()
  const product = catalog['abertura-empresa']
  const related = catalog['guia-impostos']

  return (
    <>
      {product?.available && typeof product.price === 'number' && (
        <aside className="bo-commerce-bar" aria-label="Comprar Abertura de Empresa nos EUA">
          <div className="bo-commerce-product">
            <img src={product.image} alt="" />
            <span>
              <small>Apostila digital</small>
              <strong>{product.shortTitle}</strong>
            </span>
          </div>

          {related?.available && (
            <a className="bo-commerce-crosssell" href="/">
              Veja também: {related.shortTitle}
            </a>
          )}

          <div className="bo-commerce-action">
            <b>${product.price.toFixed(2)}</b>
            <button onClick={() => addToCart(product.id)}>Comprar agora</button>
          </div>
        </aside>
      )}
      <CartSlideOut />
    </>
  )
}
