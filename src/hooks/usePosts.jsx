import {useMemo} from "react";

export const useSortedProducts = (products, sort) => {
    return useMemo(() => {
            if (sort) {
                return [...products].sort((a, b) => a[sort].localeCompare(b[sort]));
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