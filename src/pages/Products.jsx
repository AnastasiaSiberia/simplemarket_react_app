import React, {useContext, useEffect, useState} from 'react';
import ProductList from "../components/lists/ProductList";
import ProductForm from "../components/forms/ProductForm";
import ProductFilter from "../components/filters/ProductFilter";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {useProducts} from "../hooks/useProducts";
import ProductService from "../API/ProductService";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../utils/utils";
import Pagination from "../components/UI/pagination/Pagination";
import {AuthContext} from "../context/context";

function Products() {
    const {role, setRole} = useContext(AuthContext)
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState({sort: 'популярность', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const sortedAndSearchedProducts = useProducts(allProducts, filter.sort, filter.query)

    const [fetchAllProducts, isProductLoading, productError] = useFetching(async() => {
        const response = await ProductService.getAllProductInfo()
        setTotalPages(getPageCount(response.data.length, limit))
        setAllProducts(response.data)
    })

    const updatePageContent = (page) => {
        let newProductList = []
        for(let i = limit * (page - 1); i < limit * page && i < sortedAndSearchedProducts.length; i++) {
            newProductList = [...newProductList, sortedAndSearchedProducts[i]]
        }
        setProducts(newProductList)
    }

    useEffect(() => {
        fetchAllProducts()
    }, [])

    useEffect(() => {
        updatePageContent(page)
        setTotalPages(getPageCount(sortedAndSearchedProducts.length, limit))
    }, [sortedAndSearchedProducts])

    const changePage = (page) => {
        setPage(page)
        updatePageContent(page)
    }


    const checkCanAdd = () => {
        return localStorage.getItem('role') === 'VENDOR' || localStorage.getItem('role') === 'USER'
    }

    return (
        <div className="App">
            {role === 'VENDOR' &&
                <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                    Добавить продукт
                </MyButton>
            }
            <MyModal visible={modal} setVisible={setModal}>
                <ProductForm setModal={setModal} updateProducts={fetchAllProducts}/>
            </MyModal>

            <div>
                <ProductFilter
                    filter={filter}
                    setFilter={setFilter}
                />
            </div>
            { productError &&
                <h1>Произошла ошибка: ${productError}</h1>
            }
            <ProductList products={products} title='Каталог' canAdd={checkCanAdd()}/>
            <Pagination page={page} totalPages={totalPages} changePage={changePage}/>
        </div>
    );
}

export default Products;
