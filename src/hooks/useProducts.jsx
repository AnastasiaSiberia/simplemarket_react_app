import {useMemo} from "react";

export const useSortedProducts = (products, sort) => {
    return useMemo(() => {
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
    const lowerQuery = query.toLowerCase()
    return useMemo(() => {
            return sortedProducts.filter((product) => product.product_name.toLowerCase().includes(lowerQuery)
                || product.product_description.toLowerCase().includes(lowerQuery)
                || product.vendor_name.toLowerCase().includes(lowerQuery)
            )
        },
        [sort, query, products]
    )
}