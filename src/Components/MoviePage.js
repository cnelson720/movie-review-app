import {useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Spinner, Table, Button} from 'react-bootstrap';
import axios from 'axios';
import '../CSS/MoviePage.css';
import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import DisplayReviews from './DisplayReviews';

const config = require('../config');

//http://image.tmdb.org/t/p/w500

const MoviePage = () => {

    const {id} = useParams();

    const [movieData, setMovieData] = useState(null);

    const [rating, setRating] = useState(0);

    const nav = useNavigate();

    const getMovieData = async () => {
        await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${config.KEY}`)
            .then((res)=>{
                setMovieData(res.data)
            })
            .catch(err => console.log(err));
    };

    const getRatingData = async () => {
        await axios.get(`/get-ratings/${id}`)
            .then(res => setRating(res.data.average))
            .catch(err => console.log(err))
    }

    const tableStyle = {
        backgroundColor: '#0A1626',
        color: '#CEDAF2',
        maxWidth: '400px'
    }
    
    const reviewButtonClick = () => {
        nav(`/new-review/${movieData.id}`)
    }

    const displayButton = () => {
        if(!localStorage.getItem('user')){
            return(
                <OverlayTrigger placement='top' delay={{show: 250, hide: 400}} overlay={buttonOverlayMessage} trigger={['hover', 'focus']}>
                    <span><Button className='main-button reviewButton' disabled={true}>Write a review</Button></span>
                </OverlayTrigger>
            )
        } else {
            return(
                <Button className='main-button reviewButton' onClick={reviewButtonClick}>Write a review</Button>
            )
        }
    }

    const starRating = (rating) => {
        return(
            <div>
                {[...Array(10)].map((star, index)=>{
                    let starClass = 'star';
                    
                    if (index < rating) {
                        starClass += ' filled';
                    }
                    return(
                        <FaStar key={index} className={starClass}/>
                    )
                })}
            </div>
        )
    }

    const starToolTip = (props) => {
        return(
            <Tooltip id='rating-tooltip' {...props}>
                {!rating ? "Be the first to review!" : `Average user rating ${rating}/10`}
            </Tooltip>
        )
    }

    const buttonOverlayMessage = (props) => {
        return(
            <Tooltip id='button-tooltip' {...props}>
                Create an account or log in to write a review!
            </Tooltip>
        )
    }

    useEffect(() => {
        getMovieData()
        getRatingData()

    }, [])

    const movieDisplay = () => {

        return(
            <div className='movie-page'>
                <h1>{movieData.original_title}</h1>
                <h2>{movieData.genres.map((genre)=>(
                    <span key={genre.id}>{genre.name} </span>
                ))}</h2>

                <h3>{movieData.tagline ? `"${movieData.tagline}"` : ''}</h3>
                
                <div className='ratings'>
                    
                    <OverlayTrigger placement='top'delay={{show: 250, hide: 400}} overlay={starToolTip}>
                        {starRating(rating)}
                    </OverlayTrigger>

                    {displayButton()}
                    
                    
                    
                </div>

                <img className='poster'
                src={`http://image.tmdb.org/t/p/w500${movieData.poster_path}`}
                alt={movieData.title} />


                <div className='movie-details'>
                    {movieData.overview}
                </div>
                
                <Table borderless style={tableStyle}>
                    <tbody>
                        <tr>
                            <td>Release Date</td>
                            <td>{movieData.release_date}</td>
                        </tr>
                        <tr>
                            <td>Budget</td>
                            <td>{movieData.budget.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                        </tr>
                        <tr>
                            <td>Revenue</td>
                            <td>{movieData.revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                        </tr>
                        <tr>
                            <td>Runtime</td>
                            <td>{movieData.runtime} minutes</td>
                        </tr>
                        <tr>
                            <td>Produced by</td>
                            <td>
                                {movieData.production_companies.map((company)=>(
                                    <div key={company.id}>{company.name}</div>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                
                <h2 style={{margin: '5px'}}>User submitted reviews</h2>
                <DisplayReviews movieID={movieData.id}/>

            </div>
        )
    }

    return(
        <div className='movie-page-container'>
            {!movieData ? <div id='spinner'><Spinner variant='light'/></div> :
            movieDisplay()}
        </div>
    )

}

export default MoviePage;