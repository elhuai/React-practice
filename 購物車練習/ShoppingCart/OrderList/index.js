import ProductItem from './ProductItem'

function OrderList({ products, setProducts }) {
  const updateCount = (id, valueObject) => {
    const newProducts = products.map((v2, i2) => {
      return id === v2.id ? { ...v2, ...valueObject } : { ...v2 }
    })

    setProducts(newProducts)
  }

 
  const deleteProduct = (id) => {
    setProducts(products.filter((v2, i2) => id !== v2.id))
  }

  return (
    <>
      <div className="col-md-8 cart">
        <div className="title">
          <div className="row">
            <div className="col">
              <h4>
                <b>訂購單</b>
              </h4>
            </div>
            <div className="col align-self-center text-right text-muted">
              3 items
            </div>
          </div>
        </div>
        {products.map((v, i) => {
          const { id, name, price, img, count } = v

          return (
            <ProductItem
              key={id}
              name={name}
              price={price}
              img={img}
              count={count}
              updateCount={updateCount}
              id={id} 
              deleteProduct={deleteProduct}
            />
          )
        })}

        <div className="back-to-shop">
          <span className="text-muted">Back to shop</span>
        </div>
      </div>
    </>
  )
}

export default OrderList
