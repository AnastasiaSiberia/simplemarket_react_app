export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount/limit)
}

export const getPagesArray = (totalPages) => {
    let result = []
    for(let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
    return result
}

export const computeRating = (product) => {
    if(product.product_nreviews === 0) return 0
    return product.product_rating/product.product_nreviews
}
