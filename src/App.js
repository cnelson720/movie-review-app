import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Landing from './Components/Landing';
import Navigation from './Components/Navbar';
import SearchResults from './Components/SearchResults';
import MoviePage from './Components/MoviePage';
import Popular from './Components/Popular';
import Register from './Auth/Register';
import Login from './Auth/Login';
import VerifyEmail from './Auth/VerifyEmail';
import CreateReview from './Components/CreateReview';

import './CSS/App.css';

// http://image.tmdb.org/t/p/w500

const App = () => {

    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(()=>{
        if (localStorage.getItem('user')){
            setLoggedInUser(localStorage.getItem('user'));
        }
    }, []);

    return(
        <BrowserRouter>
            <Navigation loggedInUser={loggedInUser}/>
            <Routes>
                <Route exact path='/' element={<Landing/>}/>

                <Route exact path='/search-results' element={<SearchResults />} />
                <Route exact path='/movies/:id' element={<MoviePage />} />
                <Route exact path='/popular' element={<Popular />} />

                <Route exact path='/new-review/:id' element={<CreateReview />} />

                {/*Auth routes*/}
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/verify-email' element={<VerifyEmail />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;