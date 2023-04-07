import {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../CSS/Landing.css';
import {Form, Container, Button, Spinner} from 'react-bootstrap';
import {FaSearch} from 'react-icons/fa';

import '../CSS/Popular.css';
import MovieCard from './MovieCard';

const config = require('../config');


const Popular = () => {

    const [popularReleases, setPopularReleases] = useState(null);

    const [input, setInput] = useState('');

    const onChange = (e) => {setInput(e.target.value.toLowerCase())};

    const nav = useNavigate();

    const passAlongSearch = (e) => {
        e.preventDefault();
        if (input === ''){return};

        nav('/search-results', {state: {input}})
    }

    const fetchMoviesByRelease = async () => {
        const today = new Date().toISOString().slice(0, 10); // Get today's date in yyyy-mm-dd format
        await axios.get(`https://api.themoviedb.org/3/discover/movie`,{
            params: {
                api_key: config.KEY,
                sort_by: 'popularity.desc',
                region: 'US'
            }
        })
            .then((res)=>{
                console.log(res);
                setPopularReleases(res.data.results);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchMoviesByRelease()
    }, [])

    return(
        <div className='main-container'>

            <Form onSubmit={(e)=>{passAlongSearch(e)}}>
                <Container className="d-flex align-items-center search">
                <Button variant="primary" className="mr-2 searchBtn" type='submit'><FaSearch /></Button>
                <Form.Control type="text" placeholder="Search for a movie" name='search' id='search-input' onChange={onChange}/>
                </Container>
            </Form>

            <div className='latest-releases-container'>
                <h1>Popular Releases</h1>

                
                <div className='card-container'>
                    {!popularReleases ? <div id='spinner'><Spinner variant='light'/></div> :
                    
                        <div className='movie-cards'>
                            {popularReleases.map((movie)=> (
                                <MovieCard movie={movie} key={movie.id}/>
                            ))}
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Popular;