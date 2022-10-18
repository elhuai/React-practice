import React, { useState, useEffect } from 'react'
import './App.css'
import FilterBar from './components/FilterBar/'
import ProductList from './components/ProductList/'
import SearchBar from './components/SearchBar/'
import SortBar from './components/SortBar/'

import { data } from './data/'

function App() {
  const [products, setProducts] = useState([])
  const [displayProducts, setDisplayProducts] = useState([])

  const [tags, setTags] = useState([])
  const tagTypes = ['大螢幕', '小螢幕', '一般螢幕', '蘋果', '安卓']

  const [priceRange, setPriceRange] = useState('所有')
  const priceRangeTypes = ['所有', '1萬以下', '1~2萬']

  const [searchWord, setSearchWord] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [isLoading])
  useEffect(() => {
    setIsLoading(true)
    setProducts(data)
    setDisplayProducts(data)
  }, [])
  const handleSearch = (products, searchWord) => {
    let newProducts = [...products]

    if (searchWord.length) {
      newProducts = products.filter((product) => {
        return product.name.includes(searchWord)
      })
    } 

    return newProducts
  }

  const handleSort = (products, sortBy) => {
    let newProducts = [...products]
    if (sortBy === '1') {
      newProducts = [...newProducts].sort((a, b) => a.price - b.price)
    }

    if (sortBy === '2') {
      newProducts = [...newProducts].sort((a, b) => b.price - a.price)
    }
    if (sortBy === '' && newProducts.length > 0) {
      newProducts = [...newProducts].sort((a, b) => a.id - b.id)
    }

    return newProducts
  }

  const handleTags = (products, tags) => {
    let newProducts = [...products]
    if (tags.length > 0) {
      newProducts = [...newProducts].filter((product) => {
        let isFound = false
        const productTags = product.tags.split(',')

        
        for (let i = 0; i < tags.length; i++) {
          if (productTags.includes(tags[i])) {
            isFound = true 
            break 
          }
        }

        return isFound
      })
    }

    return newProducts
  }

  const handlePriceRange = (products, priceRange) => {
    let newProducts = [...products]

    switch (priceRange) {
      case '1萬以下':
        newProducts = products.filter((p) => {
          return p.price <= 10000
        })
        break
      case '1~2萬':
        newProducts = products.filter((p) => {
          return p.price >= 10000 && p.price <= 20000
        })
        break
      default:
        break
    }

    return newProducts
  }
  useEffect(() => {
    
    
    if (searchWord.length < 3 && searchWord.length !== 0)
    return 
    
    setIsLoading(true)
    let newProducts = []
    newProducts = handleSearch(products, searchWord)
    newProducts = handleSort(newProducts, sortBy)
    newProducts = handleTags(newProducts, tags)
    newProducts = handlePriceRange(newProducts, priceRange)

    setDisplayProducts(newProducts)

  }, [searchWord, products, sortBy, tags, priceRange])

  const spinner = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="grid search">
              <div className="grid-body">
                <div className="row">
                  <div className="col-md-3">
                    <FilterBar
                      priceRangeTypes={priceRangeTypes}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                      tagTypes={tagTypes}
                      tags={tags}
                      setTags={setTags}
                    />
                  </div>

                  <div className="col-md-9">
                    <h2>
                      <i className="fa fa-file-o"></i> 商品列表
                    </h2>
                    <hr />
                    <SearchBar
                      searchWord={searchWord}
                      setSearchWord={setSearchWord}
                    />
                    <div className="padding"></div>
                    <SortBar sortBy={sortBy} setSortBy={setSortBy} />
                    {isLoading ? (
                      spinner
                    ) : (
                      <ProductList products={displayProducts} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App