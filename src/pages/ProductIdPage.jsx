import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import ProductService from "../API/ProductService";
import Loader from "../components/UI/Loader/Loader";
import classes from "../styles/img.module.css"
import MyButton from "../components/UI/button/MyButton";
import ProductForm from "../components/forms/ProductForm";
import MyModal from "../components/UI/modal/MyModal";
import ReviewForm from "../components/forms/ReviewForm";

const ProductIdPage = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [reviews, setReviews] = useState([])
    const [image, setImage] = useState({})
    const [modal, setModal] = useState(false)

    const addReview = async (reviewValue, reviewText) => {
        await ProductService.addReview(product.product_id, reviewValue, reviewText)
        setModal(false)
    }

    const [fetchReviews, isReviewsLoading, reviewError] = useFetching(async(id) => {
        const response = await ProductService.getReviewsByProductId(id)
        setReviews(response.data)
    })
    const [fetchImage, imgLoading, imgError] = useFetching(async(id, vendorName) => {
        const response = await ProductService.getFileURL(vendorName, id)
        response !== false && setImage(response)
    })
    const [fetchProductById, isLoading, error] = useFetching(async(id) => {
        const response = await ProductService.getById(id)
        setProduct(response.data)
    })

    useEffect(() => {
        fetchProductById(params.id)
        fetchReviews(params.id)
    }, [])

    useEffect(() => {
        if(product !== {}) {
            fetchImage(params.id, product.vendor_name)
        }
    }, [product])

    return (
        <div>
            {imgLoading
                ? <Loader/>
                : (
                    <div>
                        <img className={classes.imgL} src={image} alt={""}/>
                    </div>
                )
            }
            {isLoading
                ? <Loader/>
                : (
                    <div>
                        <h1>{'Название: ' + product.product_name}</h1>
                        <h2>{'Продавец: ' + product.vendor_name}</h2>
                        <h2>{'Описание: ' + product.product_description}</h2>
                    </div>
                )
            }
            <MyButton onClick={() => setModal(true)}>Оценить продукт</MyButton>
            <h4>
                Reviews
            </h4>
            <MyModal visible={modal} setVisible={setModal}>
                <ReviewForm addReview={addReview} />
            </MyModal>
            { isReviewsLoading
                ? <Loader/>
                : <div>
                    {
                        reviews.map(review =>
                            <div style={{marginTop: 15}}>
                                <h5>{'Отзыв написал ' + review.username}</h5>
                                <div>{review.review_text}</div>
                                <h5>{'Оценка ' + review.review_value}</h5>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default ProductIdPage;