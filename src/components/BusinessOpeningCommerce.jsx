import { useCart } from '../context/CartContext'
import CartSlideOut from './CartSlideOut'

export default function BusinessOpeningCommerce() {
  const { catalog, catalogStatus, buyNow } = useCart()
  const product = catalog['abertura-empresa']
  const related = catalog['guia-impostos']
  const canBuy = product?.available && typeof product.price === 'number'

  return (
    <>
      <aside className="bo-commerce-bar" aria-label="Comprar Abertura de Empresa nos EUA">
        <div className="bo-commerce-product">
          <img src={product?.image || '/image/business-opening-cover.png'} alt="" />
          <span>
            <small>Apostila digital</small>
            <strong>Abertura de Empresa nos EUA</strong>
          </span>
        </div>

        {related?.available && (
          <a className="bo-commerce-crosssell" href="/">
            Veja também: {related.shortTitle}
          </a>
        )}

        <div className="bo-commerce-action">
          {canBuy ? (
            <>
              <b>${product.price.toFixed(2)}</b>
              <button onClick={() => buyNow(product.id)}>Comprar agora</button>
            </>
          ) : (
            <span className="bo-commerce-loading" role="status">
              {catalogStatus === 'loading' ? 'Carregando checkout…' : <>
                Compra temporariamente indisponível. <a href="mailto:support@express-solution.com">Falar com o suporte</a>
              </>}
            </span>
          )}
        </div>
      </aside>
      <CartSlideOut />
    </>
  )
}
