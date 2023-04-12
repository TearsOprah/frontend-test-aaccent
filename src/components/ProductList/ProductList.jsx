import products from '../../assets/products.json'
import ProductCard from "../ProductCard/ProductCard";


export default function ProductList() {

  return (
    <>
      <h2>ProductList</h2>
      <ul>
        {products.map(product => (
          <ProductCard key={product.id}
                       title={product.title}
                       regular_price={product.regular_price}
                       image={require(`../../assets${product.image}`)}
                       brand={product.brand}/>
        ))}
      </ul>
    </>
  )
}