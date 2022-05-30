import {useMemo} from "react";

export const useSortedProducts = (products, sort) => {
    return useMemo(() => {
        console.log(products)
            if (sort === 'популярность') {
                return [...products].sort((a, b) => a['product_rating'] < b['product_rating'] ? 1 : -1);
            } else if (sort === 'рейтинг') {
                return [...products].sort((a, b) =>
                    a['product_rating'] * b['product_nreviews'] < b['product_rating'] * a['product_nreviews'] ? 1 : -1);
            } else if (sort === 'возрастающая цена') {
                return [...products].sort((a, b) => a['product_price'] > b['product_price'] ? 1 : -1);
            } else if (sort === 'убывающая цена') {
                return [...products].sort((a, b) => a['product_price'] < b['product_price'] ? 1 : -1);
            } else {
                return products
            }
        },
        [sort, products]
    )
}

export const useProducts = (products, sort, query) => {
    const sortedProducts = useSortedProducts(products, sort)
    return useMemo(() => {
            return sortedProducts.filter((product) => product.product_name.toLowerCase().includes(query))
        },
        [sort, query, products]
    )
}