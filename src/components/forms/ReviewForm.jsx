import React, {useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";

const ReviewForm = ({addReview}) => {
    const [review, setReview] = useState({reviewValue:'', reviewText:''});

    const addNewReview = (e) => {
        e.preventDefault()
        addReview(review.reviewValue, review.reviewText)
        setReview({reviewValue: '', reviewText: ''})
    }

    return (
        <form>
            <MyInput type="text" placeholder={"reviewValue"}
                     value={review.reviewValue}
                     onChange={event => setReview({...review, reviewValue: event.target.value})}
            />
            <MyInput type="text" placeholder={"reviewText"}
                     value={review.reviewText}
                     onChange={event => setReview({...review, reviewText: event.target.value})}
            />
            <MyButton onClick={addNewReview}>add</MyButton>
        </form>
    );
};

export default ReviewForm;