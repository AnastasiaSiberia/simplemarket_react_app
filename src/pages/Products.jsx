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
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedProducts = useProducts(products, filter.sort, filter.query)

    const [fetchAllProducts, isProductLoading, productError] = useFetching(async() => {
        const response = await ProductService.getAllProductInfo()
        setTotalPages(getPageCount(response.data.length, limit))
        setAllProducts(response.data)
        updatePageContent(response.data)
    })

    const updatePageContent = (allProducts) => {
        let newProductList = []
        for(let i = limit * (page - 1); i < limit * page && i < allProducts.length; i++) {
            newProductList = [...newProductList, allProducts[i]]
        }
        setProducts(newProductList)
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])

    const changePage = (page) => {
        setPage(page)
        updatePageContent(allProducts)
    }

    const addProduct = async (newProduct, formData) => {
        const response = await ProductService.addProduct(newProduct)
        const productId = response.data
        await ProductService.loadFile(productId, formData)
        setModal(false)
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
