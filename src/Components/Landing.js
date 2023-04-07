import {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Landing.css';
import {Form, Container, Button, Spinner} from 'react-bootstrap';
import {FaSearch} from 'react-icons/fa';

import MovieCard from './MovieCard';
import SearchBar from './SearchBar';

const config = require('../config');


const Landing = () => {

    const [latestReleases, setLatestReleases] = useState(null);

    const fetchMoviesByRelease = async () => {
        const today = new Date().toISOString().slice(0, 10); // Get today's date in yyyy-mm-dd format
        await axios.get(`https://api.themoviedb.org/3/discover/movie`,{
            params: {
                api_key: config.KEY,
                sort_by: 'release_date.desc',
                region: 'US',
                'release_date.lte': today
            }
        })
            .then((res)=>{
                setLatestReleases(res.data.results);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchMoviesByRelease()
    }, [])

    return(
        <div className='main-container'>

            <SearchBar />

            <div className='latest-releases-container'>
                <h1>Latest Releases</h1>

                
                <div className='card-container'>
                    {!latestReleases ? <div id='spinner'><Spinner variant='light'/></div> :
                    
                        <div className='movie-cards'>
                            {latestReleases.map((movie)=> (
                                <MovieCard movie={movie} key={movie.id}/>
                            ))}
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Landing;