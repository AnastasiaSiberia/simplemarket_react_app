import React, {useContext, useEffect, useRef, useState} from 'react';
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/modal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {useProducts} from "../hooks/usePosts";
import ProductService from "../API/ProductService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount, getPagesArray} from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import {AuthContext} from "../context/context";

function Products() {
    const {role, setRole} = useContext(AuthContext)
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(25)
    const [page, setPage] = useState(1)
    const sortedAndSearchedProducts = useProducts(products, filter.sort, filter.query)
    const lastElement = useRef()

    const [fetchProducts, isProductLoading, productError] = useFetching(async() => {
        const response = await ProductService.getAllProductInfo()
        setTotalPages(getPageCount(response.data.length, limit))
        setProducts([...products, ...response.data])
    })

    useEffect(() => {
        fetchProducts(limit, page)
    }, [page, limit])

    useObserver(lastElement, page < totalPages, isProductLoading, () => {
        setPage(page + 1)
    })

    const addProduct = async (newProduct) => {
        await ProductService.addProduct(newProduct)
        //const response = await ProductService.onlyVendor('out');
        //console.log(response.data)
        setModal(false)
    }

    const removePost = (product) => {
        setProducts(product.filter(p => p.id !== product.product_id))
    }

    const changePage = (page) => {
        setPage(page)
        fetchProducts(limit, page)
    }
    return (
        <div className="App">
            {role === 'VENDOR' && <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Add product
            </MyButton>
            }
            <MyModal visible={modal} setVisible={setModal}>
                <ProductForm create={addProduct}/>
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
            <ProductList remove={removePost} products={sortedAndSearchedProducts} title='Catalogue'/>
            <div ref={lastElement} style={{height:20, background:'red'}}/>
            {
                isProductLoading &&
                <div style={{display:'flex', justifyContent:'center', marginTop:50}}>
                        <Loader/>
                </div>
            }
            <Pagination page={page} totalPages={totalPages} changePage={changePage}/>
        </div>
    );
}

export default Products;
