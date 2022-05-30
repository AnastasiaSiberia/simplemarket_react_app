import React, {useContext, useEffect, useState} from 'react';
import ProductList from "../components/lists/ProductList";
import ProductForm from "../components/forms/ProductForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {useProducts} from "../hooks/useProducts";
import ProductService from "../API/ProductService";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {AuthContext} from "../context/context";
import jpeg from "../tmp/file"

function Products() {
    const {role, setRole} = useContext(AuthContext)
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedProducts = useProducts(products, filter.sort, filter.query)

    const [fetchProducts, isProductLoading, productError] = useFetching(async() => {
        const response = await ProductService.getAllProductInfo()
        console.log(response)
        setTotalPages(getPageCount(response.data.length, limit))
        setProducts([...products, ...response.data])
    })

    useEffect(() => {
        fetchProducts(limit, page)
    }, [page, limit])

    const addProduct = async (newProduct, formData) => {
        const response = await ProductService.addProduct(newProduct)
        const productId = response.data
        await ProductService.loadFile(productId, formData)
        setModal(false)
    }

    const changePage = (page) => {
        setPage(page)
        fetchProducts(limit, page)
    }

    return (
        <div className="App">
            {role === 'VENDOR' &&
                <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                    Add product
                </MyButton>
            }
            <MyModal visible={modal} setVisible={setModal}>
                <ProductForm create={addProduct} />
            </MyModal>

            <div>
                <hr style={{margin: '15px 0'}}/>
                <PostFilter
                    filter={filter}
                    setFilter={setFilter}
                />
            </div>
            { productError &&
                <h1>Error! ${productError}</h1>
            }
            <ProductList products={sortedAndSearchedProducts} title='Catalogue'/>
            <Pagination page={page} totalPages={totalPages} changePage={changePage}/>
        </div>
    );
}

export default Products;
