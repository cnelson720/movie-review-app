import {useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Spinner, Button, Form} from 'react-bootstrap';
import axios from 'axios';
import {FaStar} from 'react-icons/fa';
import swal from 'sweetalert2';


import '../CSS/CreateReview.css';

const config = require('../config');

const CreateReview = () => {

    const [movieData, setMovieData] = useState(null);
    const [rating, setRating] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const nav = useNavigate();

    const [reviewData, setReviewData] = useState({
        username: localStorage.getItem('user'),
        thoughts: '',
        rating: 0
    })

    const {id} = useParams();

    useEffect(()=>{
        getMovieData();
    }, [])

    const onChange = (e) => {setReviewData({...reviewData, [e.target.name]: e.target.value})};

    const getMovieData = async () => {
        await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${config.KEY}`)
            .then((res)=>{
                setMovieData(res.data);
                setReviewData({...reviewData, movie: res.data.id});
            })
            .catch(err => console.log(err))
    };

    const submit = (e) => {
        e.preventDefault();

        if(reviewData.thoughts.length < 10){
            swal.fire({
                icon: 'error',
                text: 'Please include at least 10 characters in your review',
                timer: 2500,
                showConfirmButton: false
            });
        } else {
            axios.post('/submit-review', reviewData)
            .then((res)=>{
                swal.fire({
                    icon: 'success',
                    title: 'Review Submitted!',
                    text: res.data.message,
                    showConfirmButton: false,
                    timer: 2500
                }).then(()=>{nav(`/movies/${id}`)})
            })
            .catch((err)=>{
                swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.response.data.message
                })
            })
        }
    }

    const handleHover = (index) => {
        setHoveredIndex(index);
      };

    const handleRatingClick = (index) => {
        setRating(index + 1);
        setHoveredIndex(-1);
        setReviewData(prevState => ({
            ...prevState,
            rating: index + 1
        }))
    }

    console.log(movieData);

    const reviewDisplay = () => {
        return(
            <div className='review-container' style={{color: 'white'}}>
            
                <img className='poster'
                src={`http://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt={movieData.title} />

                <h2 className='title'>{movieData.original_title}</h2>
                <h6 className='genres'>{movieData.genres.map((genre)=>(
                    <span key={genre.id}>{genre.name} </span>
                ))}</h6>

                
                <div className='rating'>
                    <div>
                        {[...Array(10)].map((star, index) => {
                            const isFilled = index < rating;
                            const isHovered = index <= hoveredIndex;
                            return(
                                <FaStar
                                key={index}
                                className={isFilled ? 'selectedStar' : isHovered ? 'hoveredStar' : 'unselectedStar'}
                                onClick={()=>{handleRatingClick(index)}}
                                onMouseEnter={()=>{handleHover(index)}}
                                onMouseLeave={()=>{setHoveredIndex(-1)}}
                                />
                            )
                        })}
                    </div>
                    <span>{rating}/10</span>
                </div>

                <Form className='review-form' onSubmit={submit}>
                    <Form.Group className='mb-3' controlId='thoughts'>
                        <Form.Control className='description-form' name='thoughts' as='textarea' maxLength={250} onChange={onChange} placeholder='What did you think of the movie?' required></Form.Control>
                    </Form.Group>

                    <Button className='main-button reviewSubmit' type='submit'>Submit</Button>
                </Form>
                
            </div>
        )
    }

    useEffect(()=>{

    }, [])

    return (
        <div className='create-review-container'>
            {!movieData ? <div id='spinner'><Spinner variant='light'/></div> :
            reviewDisplay()}
        </div>
    )
}

export default CreateReview;