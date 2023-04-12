import './ProductCard.scss'

export default function ProductCard({title, regular_price, image, brand}) {
  return (
    <li className={'card'}>
      <img className={'card__image'} src={image} alt={title} />
      <h3 className={'card__title'}>{title}</h3>
      <p className={'card__price'}>{regular_price.value}{regular_price.currency}</p>
      <p className={'card__brand'}>{brand}</p>
      <button>В корзину</button>
    </li>
  )
}