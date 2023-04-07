import { useEffect, useState } from "react";
import axios from 'axios';
import {Spinner} from 'react-bootstrap';
import Review from './Review';
import '../CSS/DisplayReviews.css';

const DisplayReviews = ({movieID}) => {


    const [reviews, setReviews] = useState(null);

    useEffect(()=>{
        getReviews();
    },[]);

    const getReviews = () => {
        axios.post('/get-reviews', {movie: movieID})
            .then((res)=>{
                setReviews(res.data);
            })
            .catch(err => console.log(err))
    }

    return(
        <div className="reviews">
            {!reviews ? <div id='spinner'><Spinner variant='light'/></div> :
            reviews.length === 0 ? <div className="no-reviews">Be the first to write a review!</div> :
            reviews.map((review) => (
                <Review key={review._id} reviewData={review}/>
            ))
            }
        </div>
    )

}

export default DisplayReviews;