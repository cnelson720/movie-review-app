import axios from 'axios';
import { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import MovieCard from './MovieCard';
import {Spinner} from 'react-bootstrap';
import SearchBar from './SearchBar';

import '../CSS/SearchResults.css';

const config = require('../config');

const SearchResults = () => {
    const nav = useNavigate();
    const location = useLocation();
    const results = location.state.input;

    const [searchResults, setSearchResults] = useState(null);


    const searchMovie = async (query) => {
        if(query === ''){nav('/')};
        await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${config.KEY}&query=${query}`)
            .then((res)=>{
                setSearchResults(res.data.results);
            })
            .catch(err => console.log(err));
    }

    useEffect(()=>{
        searchMovie(results)
    }, [results])

    return (
        <div className='search-container'>
          <SearchBar />
          <h1>Search results for '{results}'</h1>

          {!searchResults ? (
            <div id='spinner'><Spinner variant='light'/></div>
          ) : (
            searchResults.length > 0 ? (
                <div className='movie-cards'>
                    {searchResults.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                    ))}
                </div>
            ) : (
              <div id='no-result'>No Results :(</div>
            )
          )}
        </div>
      );

}

export default SearchResults;