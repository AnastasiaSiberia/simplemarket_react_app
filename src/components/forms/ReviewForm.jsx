import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import {getPagesArray} from "../../utils/utils";
import star from "../../icons/Star.png"
import emptyStar from "../../icons/EmptyStar.png"
import classes from "../../styles/img.module.css"
import TransparentButton from "../UI/button/TransparentButton";
import ProductService from "../../API/ProductService";
import {useFetching} from "../../hooks/useFetching";
const ReviewForm = ({productId, setModal}) => {
    const [review, setReview] = useState({reviewValue:'', reviewText:''});
    const [addReview, isLoadingAddingReview, reviewError] = useFetching(async(reviewValue, reviewText) => {
        await ProductService.addReview(productId, reviewValue, reviewText)
        setModal(false)
    })

    const addNewReview = (e) => {
        e.preventDefault()
        addReview(review.reviewValue, review.reviewText)
        setReview({reviewValue: '', reviewText: ''})
    }

    const changeReviewValue = (e, i) => {
        e.preventDefault()
        setReview({...review, reviewValue: i})
    }

    return (
        <form>
            {
                getPagesArray(5).map((i) =>
                    <TransparentButton key={i} onClick={(e) => changeReviewValue(e, i)}>
                        <img className={classes.ratingStar} alt="" title={i} src={i <= review.reviewValue ? star : emptyStar}/>
                    </TransparentButton>
                )
            }
            <MyInput type="text" placeholder={"reviewText"}
                     value={review.reviewText}
                     onChange={event => setReview({...review, reviewText: event.target.value})}
            />
            <MyButton onClick={addNewReview}>Оставить отзыв</MyButton>
        </form>
    );
};

export default ReviewForm;