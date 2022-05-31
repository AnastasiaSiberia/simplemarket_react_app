import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import {computeRating} from "../utils/utils.js";
import ProductService from "../API/ProductService";
import Loader from "../components/UI/Loader/Loader";
import classes from "../styles/img.module.css"
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import ReviewForm from "../components/forms/ReviewForm";
import rating0 from "../icons/rating0.png"
import rating1 from "../icons/rating1.png"
import rating2 from "../icons/rating2.png"
import rating3 from "../icons/rating3.png"
import rating4 from "../icons/rating4.png"
import rating5 from "../icons/rating5.png"

const ProductIdPage = () => {
    const params = useParams()
    const [product, setProduct] = useState({})
    const [reviews, setReviews] = useState([])
    const [image, setImage] = useState({})
    const [modal, setModal] = useState(false)
    const ratingIconList = [rating0, rating1, rating2, rating3, rating4, rating5]

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
        <div className={"App"}>
            {imgLoading
                ? <Loader/>
                : (
                    <div style={{marginTop: '30px', marginBottom: '15px', display: 'flex'}}>
                        <img className={classes.imgL} src={image} alt=""/>
                        {isLoading
                            ? <Loader/>
                            : (
                                <div style={{marginLeft: '30px', marginTop: '15px'}}>
                                    <div><strong>{product.product_name}</strong>
                                        <img className={classes.ratingImage} src={ratingIconList[computeRating(product)]} alt="" title={computeRating(product)}/>
                                    </div>
                                    <div>{'Продавец: ' + product.vendor_name}</div>
                                    <div>{'Описание: ' + product.product_description}</div>
                                </div>
                            )
                        }
                    </div>

                )
            }

            <MyButton style={{marginTop: '50px', marginBottom: '20px', width: '100%'}} onClick={() => setModal(true)}>Оценить продукт</MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <ReviewForm addReview={addReview} />
            </MyModal>
            { isReviewsLoading
                ? <Loader/>
                : <div>
                    {
                        reviews.map(review =>
                            <div style={{marginTop: 15, border: '2px solid red', borderRadius: '10px', alignContent: 'center'}}>
                                <div style={{marginLeft: '20px'}}><strong>{'Отзыв написал ' + review.username}</strong>
                                    <img className={classes.ratingImage} src={ratingIconList[review.review_value]} alt="" title={review.review_value}/>
                                </div>
                                <div style={{marginLeft: '20px'}}>{review.review_text}</div>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
};

export default ProductIdPage;